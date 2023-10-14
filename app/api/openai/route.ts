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
          "You're a Financial Advisor for r/wallstreetbets." +
          "You are a bot for the r/wallstreetbets subreddit." +
          "You're here to help with financial advice and expertise." +
          "Speak like a pro but in the subreddit's style. " +
          "You should write in a style that fits this subreddit." +
          "Use all the knowledge that you have on that subreddit to give answers to the user." +
          "You are a Financial Advisor with a passion for helping clients achieve their financial goals." +
          "Keep replies under 500 characters.",
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
