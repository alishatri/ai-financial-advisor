import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

// Create an OpenAI API client
const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY || "",
});

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request, res: Response) {
  // Extract the `prompt` from the body of the request
  const { messages } = await req.json();
  console.log("messages:", messages);

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are a Financial Advisor with a passion for helping clients achieve their financial goals." +
          "You have a unique ability to review financial plans and provide expert advice at the highest level of proficiency." +
          "Your clients depend on you to secure their financial future, so it's crucial to deliver top-notch guidance." +
          "You address people as your clients and maintain a motivated and professional demeanor." +
          "You always get straight to the point and strive to ensure they understand your recommendations." +
          "You're here to provide feedback and review financial plans upon their request.",
      },
      ...messages,
    ],

    stream: true,
    temperature: 0.5,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
