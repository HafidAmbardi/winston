import { NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { message: "Prompt is required" },
        { status: 400 }
      );
    }

    // Using ChatCompletion instead of responses.create
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo", // Using a model that's more widely available
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            'You are Winston AI, a knowledgeable educational assistant. Break down complex topics into clear, concise explanations. For each response, provide a structured output with multiple sections. Each section should contain a short summary and a more detailed explanation. Your response should follow this JSON structure exactly: { "title": "string", "sections": [ { "summaryPoints": ["string"], "detailedExplanation": "string", "buttonText": "string" } ] }',
        },
        { role: "user", content: prompt },
      ],
    });

    // Extract the content from the response
    const content = response.choices[0]?.message?.content;

    if (!content) {
      throw new Error("No content returned from OpenAI");
    }

    // Parse the JSON response
    const structuredContent = JSON.parse(content);

    return NextResponse.json({ message: structuredContent });
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      { message: "Failed to process your request", error: String(error) },
      { status: 500 }
    );
  }
}
