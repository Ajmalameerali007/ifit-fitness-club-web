# IFIT Fitness Club - Full-Stack Application

This project is a complete full-stack web application for the IFIT Fitness Club, featuring a React frontend and a Node.js/Express backend to handle secure payments and AI-powered features.

## Project Structure

- **`/` (root)**: Contains the frontend React application files.
- **`/backend`**: Contains the backend Node.js server files.

---

## Getting Started

To run the full application, you will need to run both the frontend and the backend servers simultaneously.

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later recommended)
- Your Mamo Pay secret API key.
- Your Google Gemini API key.

### 1. Running the Backend Server

First, set up and start the backend.

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    -   A `.env` file has been provided in the `/backend` directory with your Gemini API key and placeholders for other keys.
    -   Ensure the `MAMO_PAY_SECRET_KEY` is replaced with your actual key.
    -   Ensure `FRONTEND_URL` matches the URL where your frontend is running (e.g., `http://localhost:3000`).

4.  **Start the server:**
    ```bash
    npm start
    ```

The backend server will now be running on `http://localhost:4000`.

### 2. Running the Frontend Application

Open a **new terminal window** and follow these steps.

1.  **Navigate to the root project directory (if you're in `/backend`, go back one level):**
    ```bash
    cd .. 
    ```

2.  **The frontend is set up to run in a web-based development environment.** Simply open the application in your environment of choice, and it will automatically install dependencies and start the development server.

The frontend will automatically connect to the backend server running on port `4000` to process payments and generate AI fitness plans.