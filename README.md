<h1 align="center">💪 Fitcode – AI Fitness Assistant 🤖</h1>

<p align="center">
  A smart fitness planner powered by AI, where users get personalized workout and diet plans through an interactive voice assistant.
</p>

---

## 🚀 Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS, Shadcn UI
- **Authentication**: Clerk
- **Database**: Convex (Real-time)
- **Voice AI**: Vapi
- **LLM Integration**: Gemini AI

---

## ✨ Features

- 🎙️ **Voice Assistant (Vapi)** – Talk to an AI about your fitness goals
- 🧠 **Gemini AI** – Generate real-time workout and diet plans
- 🏋️ **Workout Programs** – Custom routines with sets & reps based on your schedule
- 🥗 **Diet Planner** – Meal suggestions tailored to calorie goals and preferences
- 🔒 **Authentication** – Secure login with Clerk (Google, GitHub, Email)
- 📋 **Program Management** – Only one active plan at a time, with full history
- 📱 **Responsive UI** – Beautiful and mobile-friendly design
- 🔁 **Realtime Data** – Auto-updated UI powered by Convex

---

## 🔧 Environment Setup

`.env` file me ye values add karo:

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Vapi Voice AI
NEXT_PUBLIC_VAPI_WORKFLOW_ID=
NEXT_PUBLIC_VAPI_API_KEY=

# Convex
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=

# Gemini AI
NEXT_PUBLIC_GEMINI_API_KEY=
```

🛠 Getting Started

1.  Clone the Repository
    git clone https://github.com/your-username/fitcode-ai-fitness.git
    cd fitcode-ai-fitness

2.  Install Dependencies
        npm install

3.  Run the App
        npm run dev

📦 Deployment (Vercel)
        npm run build
        npm start
