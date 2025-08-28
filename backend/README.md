# Backend Server for IFIT Fitness Club

This directory contains the Node.js and Express server responsible for securely integrating with third-party APIs like Mamo Pay and Google Gemini.

## Functionality

The server acts as a secure intermediary between the frontend application and external services.

-   `POST /api/create-payment-link`: Securely generates Mamo Pay payment links.
-   `POST /api/generate-plan-stream-text`: Securely communicates with the Google Gemini API to generate personalized fitness plans via a real-time text stream.

This architecture ensures that all **secret API keys are never exposed** in the client-side code.

## Setup and Running

### 1. Install Dependencies

Navigate into this directory and run:

```bash
npm install
```

### 2. Configure Environment Variables

The server requires API keys to function. A `.env` file has been provided in this (`/backend`) directory.

**CRITICAL:** The server includes startup validation. It will **not start** if any of the required variables below are missing from your `.env` file.

Your `.env` file must contain the following variables:

-   `MAMO_PAY_SECRET_KEY`: Your secret key from the Mamo Pay dashboard.
-   `GEMINI_API_KEY`: Your API key from Google AI Studio.
-   `FRONTEND_URL`: Your frontend application's full URL (e.g., `http://localhost:3000`) for CORS and payment redirects.

### 3. Start the Server

Run the following command to start the Express server:

```bash
npm start
```

The server will start on `http://localhost:4000` by default. If successful, it will log the running port and the expected frontend URL.