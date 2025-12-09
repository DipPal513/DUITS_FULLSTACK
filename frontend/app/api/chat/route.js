import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { faqData } from '@/lib/faw'; // Ensure this path matches your file structure

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req) {
  try {
    const { message } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ reply: "Error: API Key missing in server." });
    }

    // --- 1. OPTIONAL RETRIEVAL ---
    // We still try to find relevant info, but it's okay if we find nothing.
    const lowerMessage = message.toLowerCase();
    
    const relevantDocs = faqData.filter(item => {
      const keywords = item.question.toLowerCase().split(" ");
      return keywords.some(keyword => lowerMessage.includes(keyword) && keyword.length > 3);
    });

    const contextText = relevantDocs.map(doc => 
      `Q: ${doc.question}\nA: ${doc.answer}`
    ).join("\n\n");

    // --- 2. RELAXED PROMPT ---
    // We tell Gemini: "Here is some info about us, but feel free to use your own brain too."
    
    const systemInstruction = `
      You are a helpful assistant for the Dhaka University IT Society (DUITS).
      
      Below is some specific context about our club that might help answer the question:
      --- CONTEXT START ---
      ${contextText ? contextText : "No specific context available."}
      --- CONTEXT END ---
      
      INSTRUCTIONS:
      1. If the user's question is answered by the context above, use that information.
      2. If the context doesn't mention it, answer the question using your own general knowledge as a helpful AI assistant.
      3. Be polite and concise.
    `;

    // --- 3. GENERATION ---
    // FIXED: Use 'gemini-1.5-flash' (2.5 does not exist yet)
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    const finalPrompt = `${systemInstruction}\n\nUser Question: ${message}`;
    
    const result = await model.generateContent(finalPrompt);
    const response = await result.response;
    const reply = response.text();

    return NextResponse.json({ reply });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { reply: "Sorry, I am having trouble connecting to the brain right now." }, 
      { status: 500 }
    );
  }
}