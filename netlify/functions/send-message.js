export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { name, email, message } = JSON.parse(event.body || "{}");
    if (!name || !email || !message) {
      return { statusCode: 400, body: JSON.stringify({ error: "All fields are required." }) };
    }

    // Here you can integrate with email service (Nodemailer, SendGrid, etc.)
    // For now we simulate success after a small delay
    await new Promise(r => setTimeout(r, 1000));

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: "Your message has been sent successfully! We will get back to you soon."
      })
    };
  } catch (err) {
    console.error("send-message", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "An unexpected error occurred. Please try again later." })
    };
  }
}
