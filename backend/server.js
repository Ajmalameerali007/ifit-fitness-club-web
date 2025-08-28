// Load environment variables from .env file
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const helmet = require('helmet');
const { GoogleGenAI } = require('@google/genai');

// --- Server Validation ---
const requiredEnvVars = ['MAMO_PAY_SECRET_KEY', 'FRONTEND_URL', 'GEMINI_API_KEY'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
    console.error(`FATAL ERROR: Missing required environment variables: ${missingEnvVars.join(', ')}`);
    process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 4000;

// --- Middleware ---
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

// --- Gemini API Initialization ---
let ai;
try {
    ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
} catch(e) {
    console.error("FATAL ERROR: Could not initialize GoogleGenAI. Is GEMINI_API_KEY valid?");
    process.exit(1);
}


// --- Mamo Pay API Endpoint ---
app.post('/api/create-payment-link', async (req, res) => {
    const { name, price } = req.body;
    const secretKey = process.env.MAMO_PAY_SECRET_KEY;
    const frontendUrl = process.env.FRONTEND_URL;
    
    if (!name || !price) {
        return res.status(400).json({ error: 'Plan name and price are required.' });
    }

    const amountInFils = Math.round(parseFloat(price.replace(/,/g, '')) * 100);

    try {
        const mamoPayResponse = await axios.post(
            'https://api.mamopay.com/v2/links',
            {
                title: `IFIT Fitness Club - ${name}`,
                amount: amountInFils,
                currency: 'AED',
                return_url: `${frontendUrl}/payment-success`,
                failure_url: `${frontendUrl}/payment-failure`,
                first_name_required: true,
                last_name_required: true,
                email_required: true
            },
            {
                headers: {
                    'Authorization': `Bearer ${secretKey}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const paymentLinkId = mamoPayResponse.data.id;
        const paymentLinkUrl = `https://checkout.mamopay.com/payment-link/${paymentLinkId}`;
        res.status(200).json({ paymentLinkUrl });

    } catch (error) {
        console.error('Mamo Pay API Error:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to create a payment link.' });
    }
});

// --- Gemini API Endpoint for AI Coach ---
app.post('/api/generate-plan-stream-text', async (req, res) => {
    const { goal, experience, frequency, duration, notes } = req.body;

    if (!goal || !experience || !frequency || !duration) {
        return res.status(400).json({ error: 'Missing required fitness plan parameters.' });
    }

    const prompt = `
You are an expert fitness coach for IFIT Fitness Club. Create a personalized weekly workout plan for a user with the following details:
- Fitness Goal: ${goal}
- Experience Level: ${experience}
- Workouts per week: ${frequency}
- Workout duration: ${duration}
- Additional Notes/Limitations: ${notes || 'None'}

The plan should be detailed, safe, and motivating. Structure the response clearly with sections for each workout day. Use simple text formatting like headings in all caps, and use "-" for bullet points. Do not use any markdown syntax like '#', '**', or '*'.

Start with a friendly and motivational greeting.
For each workout day, provide a list of exercises with sets, reps, and rest periods. Include warm-up and cool-down instructions.
End with a word of encouragement and a reminder to listen to their body.
`;

    try {
        const responseStream = await ai.models.generateContentStream({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.flushHeaders(); // flush the headers to establish the connection

        for await (const chunk of responseStream) {
            const chunkText = chunk.text;
            if (chunkText) {
                // SSE format: data: <payload>\n\n
                res.write(`data: ${JSON.stringify(chunkText)}\n\n`);
            }
        }
        res.end();
    } catch (error) {
        console.error('Gemini API Error:', error);
        res.end();
    }
});

// --- Contact Form Endpoint ---
app.post('/api/send-message', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Please provide a valid email address.' });
    }

    try {
        // In a real app, integrate an email service here (e.g., Nodemailer, SendGrid).
        // For this demo, we'll log it to the server console.
        console.log('--- New Contact Message ---');
        console.log(`Name: ${name}`);
        console.log(`Email: ${email}`);
        console.log(`Message: ${message}`);
        console.log('---------------------------');

        // Simulate network delay for better UX
        await new Promise(resolve => setTimeout(resolve, 1000));

        res.status(200).json({ success: 'Your message has been sent successfully! We will get back to you soon.' });
    } catch (error) {
        console.error('Contact Form Error:', error);
        res.status(500).json({ error: 'An unexpected error occurred. Please try again later.' });
    }
});


app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
    console.log(`Frontend is expected to be running on: ${process.env.FRONTEND_URL}`);
});