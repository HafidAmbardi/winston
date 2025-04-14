import { NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Define system prompts for different modes
const SYSTEM_PROMPTS = {
  text: 'You are Winston AI, a knowledgeable educational assistant. Break down complex topics into clear, concise explanations. For each response, provide a structured output with between 3 and 10 sections (never less than 3, never more than 10). Each section should contain 2-3 summary points and a more detailed explanation. Your response should follow this JSON structure exactly: { "title": "string", "sections": [ { "summaryPoints": ["string"], "detailedExplanation": "string", "buttonText": "string" } ] }. Ensure that you provide enough depth with at least 3 sections, but limit to a maximum of 10 sections to keep responses manageable for learning purposes.',

  study:
    'You are Winston AI, an educational learning planner. Create a structured study plan based on the topic provided. The plan should be divided into 3-10 logical learning sessions (never less than 3, never more than 10). Each session should include specific learning objectives, activities, and estimated time duration. Follow this JSON structure exactly: { "title": "Study Plan: [Topic]", "sections": [ { "summaryPoints": ["Learning objective 1", "Learning objective 2", "Estimated time: X minutes/hours"], "detailedExplanation": "Detailed instructions for this study session, including specific activities, resources to use, and learning methods.", "buttonText": "Session Details" } ] }. Make the plan practical, achievable, and tailored to the specified topic. Include varied learning activities like reading, practice exercises, self-tests, and reflection.',
};

export async function POST(request: Request) {
  try {
    const { prompt, mode = "text" } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { message: "Prompt is required" },
        { status: 400 }
      );
    }

    // Select the appropriate system prompt based on mode
    const systemPrompt =
      mode === "study" ? SYSTEM_PROMPTS.study : SYSTEM_PROMPTS.text;

    // Using ChatCompletion with the selected system prompt
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: systemPrompt,
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

    // Validate the number of sections (additional safeguard)
    if (
      !structuredContent.sections ||
      structuredContent.sections.length < 3 ||
      structuredContent.sections.length > 10
    ) {
      throw new Error(
        "Response does not contain the required number of sections (3-10)"
      );
    }

    return NextResponse.json({ message: structuredContent });
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      { message: "Failed to process your request", error: String(error) },
      { status: 500 }
    );
  }
}
