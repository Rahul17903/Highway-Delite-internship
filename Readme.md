📒 Full-Stack Note-Taking Application

A full-stack note-taking application built with React (TypeScript), Node.js (TypeScript), and MongoDB.
Users can sign up/login with email + OTP or Google Authentication, then create, view, and delete notes securely.

✨ Features

✅ User signup with Email + OTP
✅ Login with OTP or Google (if used for signup)
✅ JWT Authentication for secured APIs
✅ Create and delete notes (per user)
✅ Responsive UI with Tailwind CSS
✅ Clean dashboard with user info + recent notes
✅ Error handling for invalid inputs, OTP failures, and API errors
✅ Mobile-friendly design (matches provided Figma / assets)

🛠️ Tech Stack
Frontend

React (TypeScript)

Tailwind CSS (for styling)

React Router (for navigation)

Axios (for API calls)

Lucide Icons (for icons)

Backend

Node.js + Express (TypeScript)

JWT (for authentication)

Mongoose / Prisma (depending on DB choice)

Database

MongoDB (recommended)
(You may use MySQL/PostgreSQL if preferred)

📂 Project Structure
📦 note-app
 ┣ 📂 backend
 ┃ ┣ 📂 src
 ┃ ┃ ┣ 📜 index.ts        # Entry point (Express server)
 ┃ ┃ ┣ 📜 routes.ts       # Auth + Notes routes
 ┃ ┃ ┣ 📜 models.ts       # User + Notes schema
 ┃ ┃ ┣ 📜 middleware.ts   # JWT middleware
 ┃ ┃ ┗ 📜 controllers.ts  # Business logic
 ┃ ┣ 📜 package.json
 ┃ ┣ 📜 tsconfig.json
 ┃ ┗ 📜 .env
 ┣ 📂 frontend
 ┃ ┣ 📂 src
 ┃ ┃ ┣ 📂 components      # React components
 ┃ ┃ ┣ 📂 pages           # Signup, Login, Welcome, Notes
 ┃ ┃ ┣ 📜 api.ts          # Axios instance
 ┃ ┃ ┣ 📜 App.tsx         # Router setup
 ┃ ┃ ┗ 📜 index.tsx
 ┃ ┣ 📜 package.json
 ┃ ┣ 📜 tailwind.config.js
 ┃ ┗ 📜 tsconfig.json
 ┣ 📜 README.md
 ┗ 📜 .gitignore

⚙️ Setup Instructions
1️⃣ Clone the Repository
git clone <your-repo-url>
cd note-app

2️⃣ Backend Setup
cd backend
npm install


Create a .env file (copy from .env.example):

PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/notes
JWT_SECRET=your_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
CLIENT_URL=http://localhost:5173


Run the backend:

npm run dev

3️⃣ Frontend Setup
cd frontend
npm install


Update src/api.ts with your backend URL:

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // change to deployed URL
  withCredentials: true,
});

export default api;


Run the frontend:

npm run dev

🌐 Deployment
Backend

Deploy on Render, Railway, or Vercel Functions

Use MongoDB Atlas for DB

Frontend

Deploy React app on Vercel or Netlify

🔑 API Endpoints
Auth

POST /auth/signup → send OTP to email

POST /auth/verify-otp → verify OTP + return JWT

POST /auth/google → login/signup with Google

Notes

GET /notes → fetch user notes (JWT required)

POST /notes → create a new note

DELETE /notes/:id → delete a note

📸 Screens / Pages

Signup Page – Signup with Email/Google → OTP Verification

Login Page – Login with OTP/Google

Welcome Page – Show user info, create note button, preview recent notes

Notes Page – Full CRUD (create + delete notes)

🧩 Example .env.example
# --------------------------
# Backend Configuration
# --------------------------

# Port where backend will run
PORT=5000

# MongoDB connection string (use MongoDB Atlas or local Mongo)
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/notes

# JWT secret key (any strong random string)
JWT_SECRET=your_jwt_secret_here

# Google OAuth credentials
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# CORS Allowed Origin
CLIENT_URL=http://localhost:5173

✅ Assignment Notes

All inputs are validated

JWT is used for protecting routes

UI matches the design provided in the assignment (hwdlte.com link)

Commits are made per feature

Deployment links will be provided after deploy

👩‍💻 Author

Your Name
📧 your.email@example.com

🔗 GitHub: your-username