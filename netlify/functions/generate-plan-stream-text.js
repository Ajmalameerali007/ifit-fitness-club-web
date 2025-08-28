import { GoogleGenAI } from "@google/genai";

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { GEMINI_API_KEY } = process.env;
  if (!GEMINI_API_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: "Missing GEMINI_API_KEY" }) };
  }

  try {
    const { goal, experience, frequency, duration, notes } = JSON.parse(event.body || "{}");
    if (!goal || !experience || !frequency || !duration) {
      return { statusCode: 400, body: JSON.stringify({ error: "Missing required fitness plan parameters." }) };
    }

    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

    const prompt = `
You are an expert fitness coach. Create a detailed ${duration}-week plan.
Goal: ${goal}
Experience: ${experience}
Sessions per week: ${frequency}
Notes: ${notes || "none"}
Return clear plain text with days, sets/reps, warm-up, cool-down, and weekly progression.
`;

    const resp = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }]
    });

    const text = resp?.response?.candidates?.[0]?.content?.parts?.[0]?.text || "No plan generated";
    return { statusCode: 200, body: JSON.stringify({ plan: text }) };
  } catch (err) {
    console.error("generate-plan-stream-text", err);
    return { statusCode: 500, body: JSON.stringify({ error: "Failed to generate plan" }) };
  }
}
