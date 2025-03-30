import { NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { message: "Prompt is required and must be a string" },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { message: "OpenAI API key is not configured" },
        { status: 500 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are Winston AI, a helpful assistant." },
        { role: "user", content: prompt },
      ],
      max_tokens: 1000,
    });

    const message = completion.choices[0].message.content;

    return NextResponse.json({ message });
  } catch (error) {
    console.error("Error in chat API:", error);

    return NextResponse.json(
      { message: "Failed to process your request" },
      { status: 500 }
    );
  }
}
