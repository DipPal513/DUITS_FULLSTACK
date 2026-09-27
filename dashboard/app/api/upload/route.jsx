import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/authServer";

export async function POST(request) {
  try {
    const session = await getSession();
    if (!session || !["ADMIN", "EDITOR"].includes(session.role)) {
      return NextResponse.json({ message: "Sign in with an approved dashboard account to upload images." }, { status: 401 });
    }

    const cloudinaryConfig = {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    };
    if (Object.values(cloudinaryConfig).some((value) => !value)) {
      return NextResponse.json({ message: "Image storage is not configured. Add the Cloudinary credentials to dashboard/.env.local and restart the dashboard." }, { status: 503 });
    }

    const data = await request.formData();
    const file = data.get("file");
    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json({ message: "Choose an image before uploading." }, { status: 400 });
    }
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ message: "Only image files can be uploaded." }, { status: 415 });
    }
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ message: "Images must be 10 MB or smaller." }, { status: 413 });
    }

    cloudinary.config(cloudinaryConfig);
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResponse = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "blog_covers", resource_type: "image" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(buffer);
    });

    if (!uploadResponse?.secure_url) {
      return NextResponse.json({ message: "Cloudinary did not return an image URL." }, { status: 502 });
    }
    return NextResponse.json({ url: uploadResponse.secure_url });
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    const status = error?.http_code === 401 ? 502 : 500;
    const message = error?.http_code === 401
      ? "Cloudinary rejected its credentials. Check the dashboard Cloudinary API key and secret."
      : "The image could not be uploaded. Check the dashboard server logs and try again.";
    return NextResponse.json({ message }, { status });
  }
}