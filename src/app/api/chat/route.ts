import { NextResponse } from "next/server";

// Define system prompts for different modes
const SYSTEM_PROMPTS = {
  text: 'You are Winston AI, a knowledgeable educational assistant. Break down complex topics into clear, concise explanations. For each response, provide a structured output with between 3 and 10 sections (never less than 3, never more than 10). Each section should contain 2-3 summary points and a more detailed explanation. Your response should follow this JSON structure exactly: { "title": "string", "sections": [ { "summaryPoints": ["string"], "detailedExplanation": "string", "buttonText": "string" } ] }. Ensure that you provide enough depth with at least 3 sections, but limit to a maximum of 10 sections to keep responses manageable for learning purposes.',

  study:
    'You are Winston AI, an educational learning planner. Create a structured study plan based on the topic provided. The plan should be divided into 3-10 logical learning sessions (never less than 3, never more than 10). Each session should include specific learning objectives, activities, and estimated time duration. Follow this JSON structure exactly: { "title": "Study Plan: [Topic]", "sections": [ { "summaryPoints": ["Learning objective 1", "Learning objective 2", "Estimated time: X minutes/hours"], "detailedExplanation": "Detailed instructions for this study session, including specific activities, resources to use, and learning methods.", "buttonText": "Session Details" } ] }. Make the plan practical, achievable, and tailored to the specified topic. Include varied learning activities like reading, practice exercises, self-tests, and reflection.',
};

// Helper function to clean JSON string
function cleanJsonString(jsonString: string): string {
  // Remove markdown code block indicators
  let cleaned = jsonString.replace(/```json\s*|\s*```/g, '');
  
  // Remove any leading/trailing whitespace
  cleaned = cleaned.trim();
  
  // If the string starts with a newline, remove it
  cleaned = cleaned.replace(/^\n+/, '');
  
  return cleaned;
}

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

    // Using Gemini API with gemini-2.0-flash-lite model
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `${systemPrompt}\n\nUser Query: ${prompt}\n\nPlease provide your response in the exact JSON format specified in the instructions. Do not include any markdown formatting or code block indicators.`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API Error:', errorData);
      throw new Error(`Gemini API error: ${response.statusText} - ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    const content = data.candidates[0]?.content?.parts[0]?.text;

    if (!content) {
      throw new Error("No content returned from Gemini");
    }

    // Clean the JSON string before parsing
    const cleanedContent = cleanJsonString(content);
    console.log('Cleaned content:', cleanedContent);

    // Parse the JSON response
    const structuredContent = JSON.parse(cleanedContent);

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
