"use client";

import React, { useState, useRef, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import TurndownService from "turndown";
import DashboardLayout from "@/components/DashboardLayout";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export default function CreatePost() {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const editor = useRef(null);

  // --- STATE ---
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState(""); // Can be Base64 OR URL
  const [status, setStatus] = useState("draft"); 
  const [saveStatus, setSaveStatus] = useState("Saved"); // For auto-save UI

  // --- 1. LOAD DRAFT FROM LOCAL STORAGE (On Mount) ---
  useEffect(() => {
    const savedData = localStorage.getItem("blog-draft");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setTitle(parsed.title || "");
      setContent(parsed.content || "");
      setCoverImage(parsed.coverImage || "");
    }
  }, []);

  // --- 2. AUTO-SAVE TO LOCAL STORAGE (Debounced) ---
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (title || content || coverImage) {
        setSaveStatus("Saving...");
        localStorage.setItem("blog-draft", JSON.stringify({ title, content, coverImage }));
        setTimeout(() => setSaveStatus("Saved to device"), 800);
      }
    }, 1000); // Wait 1 second after typing stops

    return () => clearTimeout(timeoutId);
  }, [title, content, coverImage]);

  // --- EDITOR CONFIG (Keep images local as Base64) ---
  const config = useMemo(() => ({
    readonly: false,
    placeholder: "Start writing...",
    height: "calc(100vh - 400px)",
    width: "100%",
    enableDragAndDropFileToEditor: true,
    uploader: { 
      insertImageAsBase64URI: true // ⚠️ CRITICAL: Keeps images local until publish
    },
    style: { border: "none", fontSize: "18px", color: "#1e293b" }
  }), []);

  // --- HANDLER: Local Cover Image Selection ---
  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Convert file to Base64 immediately for preview/storage
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result); // Save Base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  // --- 3. THE MASTER PUBLISH FUNCTION ---
  const handlePublish = async () => {
    if (!title.trim()) return alert("Title required");
    if (!content.trim()) return alert("Content required");
    
    setStatus("uploading_images"); // New status to show user what's happening

    try {
      // A. Process Cover Image
      let finalCoverUrl = coverImage;
      if (coverImage.startsWith("data:image")) {
        console.log("Uploading Cover Image...");
        finalCoverUrl = await uploadBase64ToCloudinary(coverImage);
      }

      // B. Process Content Images
      console.log("Scanning content for images...");
      const finalHtmlContent = await processContentImages(content);

      // C. Convert to Markdown
      setStatus("saving");
      const turndownService = new TurndownService();
      turndownService.addRule('codeBlock', {
        filter: ['pre'],
        replacement: (c) => '```\n' + c + '\n```'
      });
      const markdownContent = turndownService.turndown(finalHtmlContent);

      // D. Send Payload to DB
      const payload = {
        title,
        slug: title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, ""),
        content: markdownContent,
        image: finalCoverUrl,
        description: markdownContent.substring(0, 160).replace(/\n/g, " ") + "...",
        date: new Date().toISOString()
      };

      const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save post");

      // E. Cleanup
      localStorage.removeItem("blog-draft"); // Clear draft
      setStatus("published");
      alert("Published successfully!");
      router.push("/blog");

    } catch (error) {
      console.error(error);
      alert("Error: " + error.message);
      setStatus("draft");
    }
  };

  return (
    <DashboardLayout>
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans">
      
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-slate-400 hover:text-slate-900 transition-colors">← Back</Link>
          <div className="flex flex-col">
             <span className="text-xs font-bold uppercase tracking-wide text-slate-400">
               {status === "uploading_images" ? "Uploading Images..." : status}
             </span>
             <span className="text-[10px] text-slate-300">{saveStatus}</span>
          </div>
        </div>
        <button
          onClick={handlePublish}
          disabled={status !== "draft"}
          className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-6 py-2 rounded-full font-medium text-sm transition-all shadow-sm"
        >
          {status === "draft" ? "Publish" : "Processing..."}
        </button>
      </nav>

      {/* MAIN CONTENT */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-10 flex flex-col gap-8">
        
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-4xl md:text-5xl font-extrabold text-slate-900 placeholder-slate-300 border-none outline-none bg-transparent w-full"
        />

        {/* IMAGE UPLOAD AREA (Preview shows Base64) */}
        <div 
          className="group relative w-full h-48 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl hover:bg-slate-100 transition-all overflow-hidden flex flex-col items-center justify-center cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageSelect} 
            accept="image/*" 
            className="hidden" 
          />
          {coverImage ? (
            <img src={coverImage} alt="Cover" className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <div className="text-center text-slate-400">
              <span className="text-3xl block mb-2">📷</span>
              <p className="text-sm">Click to upload cover image</p>
            </div>
          )}
        </div>

        {/* EDITOR */}
        <div className="flex-1 -ml-4"> 
          <JoditEditor
            ref={editor}
            value={content}
            config={config}
            onBlur={(newContent) => setContent(newContent)}
          />
        </div>
      </main>

      <style jsx global>{`
        .jodit-container { border: none !important; }
        .jodit-toolbar__box { background: transparent !important; border-bottom: 1px solid #f1f5f9 !important; margin-bottom: 20px; }
        .jodit-status-bar { display: none !important; }
      `}</style>
    </div></DashboardLayout>
  );
}

// ==========================================
// 🛠️ HELPER FUNCTIONS (The Magic Logic)
// ==========================================

/**
 * 1. Process Content Images
 * Scans HTML string, finds Base64 images, uploads them, replaces src with URL.
 */
async function processContentImages(htmlContent) {
  // Create a fake DOM to parse HTML easily
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, "text/html");
  const images = doc.querySelectorAll('img');

  // Loop through all images in the content
  const uploadPromises = Array.from(images).map(async (img) => {
    const src = img.getAttribute('src');
    
    // Check if it's a Base64 string
    if (src && src.startsWith('data:image')) {
      try {
        // Upload and get URL
        const newUrl = await uploadBase64ToCloudinary(src);
        img.setAttribute('src', newUrl); // Replace src
      } catch (err) {
        console.error("Failed to upload an inline image", err);
      }
    }
  });

  // Wait for all images to upload
  await Promise.all(uploadPromises);

  return doc.body.innerHTML; // Return clean HTML
}

/**
 * 2. Upload Base64 to Cloudinary
 * Converts Base64 -> Blob -> FormData -> API
 */
async function uploadBase64ToCloudinary(base64String) {
  // Convert Base64 to Blob
  const blob = await (await fetch(base64String)).blob();
  const file = new File([blob], "image.png", { type: blob.type });

  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Image upload failed");
  const data = await res.json();
  return data.url;
}