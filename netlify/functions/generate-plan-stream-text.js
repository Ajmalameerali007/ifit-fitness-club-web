import axios from "axios";

const toNumber = (v, f) => {
  if (typeof v === "number" && !Number.isNaN(v)) return v;
  if (typeof v === "string") {
    const m = v.match(/\d+(\.\d+)?/g);
    if (m?.length) return Number(m[m.length - 1]);
  }
  return f;
};

export async function handler(event) {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };

  const { GEMINI_API_KEY } = process.env;
  if (!GEMINI_API_KEY) return { statusCode: 500, body: JSON.stringify({ error: "Missing GEMINI_API_KEY" }) };

  try {
    const body = JSON.parse(event.body || "{}");
    const goal         = body.goal || "General Fitness";
    const experience   = body.experience || "Beginner";
    const frequency    = toNumber(body.frequency, 3);
    const duration     = toNumber(body.duration, 8);
    const session_mins = toNumber(body.session_mins, 45);
    const notes        = body.notes || "";

    const prompt = `You are IFIT's most capable, humanized fitness coach. Create a realistic, safe, motivating plan.

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
- Structure:
  1) Greeting & Summary
  2) Weekly Schedule Overview (W1…W${duration})
  3) Sample Training Days (sets x reps x rest)
  4) Progression Plan
  5) Cardio & Conditioning
  6) Mobility & Warm-up/Cool-down
  7) Nutrition Guide (calories, protein g/day)
  8) Hydration & Recovery
  9) Weekly Checklist
  10) Cautions.`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(GEMINI_API_KEY)}`;

    const resp = await axios.post(
      url,
      { contents: [{ role: "user", parts: [{ text: prompt }] }] },
      { timeout: 30000, headers: { "Content-Type": "application/json" } }
    );

    const text = resp?.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No plan generated";
    return { statusCode: 200, body: JSON.stringify({ plan: text }) };
  } catch (err) {
    const msg = err?.response?.data?.error?.message || err?.message || "Failed to generate plan";
    return { statusCode: 500, body: JSON.stringify({ error: msg }) };
  }
}
