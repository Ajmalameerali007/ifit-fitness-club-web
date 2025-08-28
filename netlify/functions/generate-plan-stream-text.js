// Production-ready Gemini plan generator (no external deps)

const cors = () => ({
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
});

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers: cors() };
  if (event.httpMethod !== "POST") return { statusCode: 405, headers: cors(), body: "Method Not Allowed" };

  const { GEMINI_API_KEY } = process.env;
  if (!GEMINI_API_KEY) {
    return { statusCode: 500, headers: cors(), body: JSON.stringify({ error: "Missing GEMINI_API_KEY" }) };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const goal         = body.goal || "General Fitness";
    const experience   = body.experience || "Beginner";
    const frequency    = Number(body.frequency) || 3;
    const duration     = Number(body.duration) || 8;
    const session_mins = Number(body.session_mins) || 45;
    const notes        = body.notes || "";

    const prompt =
`You are IFIT's most capable, humanized fitness coach. Create a realistic, safe, motivating plan.

USER PROFILE
- Goal: ${goal}
- Experience: ${experience}
- Sessions/week: ${frequency}
- Program length: ${duration} weeks
- Typical session length: ${session_mins} minutes
- Notes: ${notes || "None"}

INSTRUCTIONS
- Friendly and direct. Avoid medical claims.
- Output PLAIN TEXT (no Markdown). Use short headings and dash lists.
- Structure:
  1) Greeting & Summary
  2) Weekly Schedule Overview (W1…W${duration})
  3) Sample Training Days (sets × reps × rest)
  4) Progression Plan
  5) Cardio & Conditioning
  6) Mobility & Warm-up/Cool-down
  7) Nutrition Guide (calories, protein g/day)
  8) Hydration & Recovery
  9) Weekly Checklist
  10) Cautions.`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(GEMINI_API_KEY)}`;

    const resp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      }),
    });

    const data = await resp.json();
    if (!resp.ok) {
      return {
        statusCode: resp.status,
        headers: cors(),
        body: JSON.stringify({ error: data?.error?.message || "Gemini error" }),
      };
    }

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No plan generated.";
    return { statusCode: 200, headers: { ...cors(), "Content-Type": "application/json" }, body: JSON.stringify({ plan: text }) };
  } catch (err) {
    return { statusCode: 500, headers: { ...cors(), "Content-Type": "application/json" }, body: JSON.stringify({ error: err.message }) };
  }
};
