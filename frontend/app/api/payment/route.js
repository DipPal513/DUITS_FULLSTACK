// app/api/payment/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();

  const formData = {
    store_id: "duitsociety", // Sandbox Store ID
    signature_key: "99b5a2a1c373f021372c39d5ab043cc2", // Sandbox Key
    tran_id: `DUITS-${Date.now()}`, // Unique ID
    amount: "100", // Your membership fee
    currency: "BDT",
    desc: `Membership for ${body.name}`,
    cus_name: body.name,
    cus_email: body.email,
    cus_phone: body.mobile,
    success_url: "https://duitsbd.org/api/payment/callback", // We'll handle this next
    fail_url: "https://duitsbd.org/payment-fail",
    cancel_url: "https://duitsbd.org/payment-cancel",
    type: "json", 
  };

  try {
    const response = await fetch("https://secure.aamarpay.com/jsonpost.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (result.result === "true") {
      return NextResponse.json({ url: result.payment_url });
    } else {
      return NextResponse.json({ error: "Initiation failed" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}