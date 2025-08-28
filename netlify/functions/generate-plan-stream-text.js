import { GoogleGenerativeAI } from "@google/generative-ai";

const toNumber = (v, fallback) => {
  if (typeof v === "number" && !Number.isNaN(v)) return v;
  if (typeof v === "string") {
    const m = v.match(/\d+/g);
    if (m && m.length) return Number(m[m.length - 1]); // last number (e.g., "3-4 days" -> 4)
  }
  return fallback;
};

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { GEMINI_API_KEY } = process.env;
  if (!GEMINI_API_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: "Missing GEMINI_API_KEY" }) };
  }

  try {
    const body = JSON.parse(event.body || "{}");

    // Normalize fields (accept strings like "3-4 days/week", "45 minutes")
    const goal         = body.goal || "General Fitness";
    const experience   = body.experience || "Beginner";
    const frequency    = toNumber(body.frequency, 3);    // sessions / week
    const duration     = toNumber(body.duration, 8);     // program length in weeks
    const session_mins = toNumber(body.session_mins, 45);
    const notes        = body.notes || "";

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are IFIT's most capable, humanized fitness coach. Create a realistic, safe, and motivating plan.

USER PROFILE
- Goal: ${goal}
- Experience: ${experience}
- Sessions/week: ${frequency}
- Program length: ${duration} weeks
- Typical session length: ${session_mins} minutes
- Notes: ${notes || "None"}

INSTRUCTIONS
- Friendly and direct. Avoid medical claims. Add brief safety reminders when relevant.
- Make the plan doable with the user's time, goal, and experience.
- Output PLAIN TEXT (no Markdown). Use clear section titles; bullet-like lines with dashes.
- Structure in this order:
  1) Greeting & Summary (1 short paragraph)
  2) Weekly Schedule Overview (W1…W${duration})
  3) Sample Training Days (exercises with sets x reps and rest)
  4) Progression Plan (how to progress weekly; deload guidance if needed)
  5) Cardio & Conditioning (type, duration, intensity)
  6) Mobility & Warm-up/Cool-down (brief protocol)
  7) Nutrition Guide (calories, protein g/day; simple plate method)
  8) Hydration & Recovery (water target, sleep habits)
  9) Weekly Checklist (simple, actionable)
  10) Cautions (when to stop; consult a professional if pain, dizziness, etc.)`;

    const result = await model.generateContent(prompt);
    const text =
      (typeof result?.response?.text === "function" && result.response.text()) ||
      result?.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No plan generated";

    return { statusCode: 200, body: JSON.stringify({ plan: text }) };
  } catch (err) {
    console.error("generate-plan-stream-text error:", err);
    const message = err?.message || "Unknown error";
    return { statusCode: 500, body: JSON.stringify({ error: message }) };
  }
}