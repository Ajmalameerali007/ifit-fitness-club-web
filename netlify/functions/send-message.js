exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };
  try {
    const { name, email, message } = JSON.parse(event.body || "{}");
    if (!name || !email || !message) {
      return { statusCode: 400, body: JSON.stringify({ error: "All fields are required." }) };
    }
    await new Promise((r) => setTimeout(r, 500));
    return { statusCode: 200, body: JSON.stringify({ success: "Message received." }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: "Unexpected error." }) };
  }
};
