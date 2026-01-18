import { NextResponse } from "next/server";

export async function POST(req) {
  const data = await req.formData();
  const status = data.get("pay_status");
  const txnId = data.get("pg_txnid");

  if (status === "Successful") {
    // Redirect user to your frontend with the transaction ID in the URL
    return NextResponse.redirect(
      new URL(`/membership/?status=success&txn=${txnId}`, req.url),
      303
    );
  }

  return NextResponse.redirect(new URL("/?status=failed", req.url), 303);
}