# 🚀 Full Stack Note-Taking Application (MERN + TypeScript)

This is a complete **Full Stack Note-Taking Web Application** built using the **MERN stack** (MongoDB, Express.js, React, Node.js) with **TypeScript**. It provides a secure authentication system using **Email + OTP** and **Google OAuth**, allowing users to create, view, and delete notes with a clean and responsive interface.  

Whether you’re learning authentication with JWTs or building production-ready MERN apps, this project provides a strong foundation.  

---

## 🎯 Project Objectives

- **🔐 Implement secure authentication** with **Email + OTP** and **Google OAuth**.  
- **📝 Provide a personal notes system** with create, view, and delete operations.  
- **⚡ Ensure JWT-based route protection** for secure API endpoints.  
- **🎨 Build a responsive and mobile-friendly UI** with Tailwind CSS.  
- **🛠 Maintain modular and reusable code** with TypeScript in both frontend & backend.  
- **☁️ Enable cloud deployment** via MongoDB Atlas, Render/Vercel, and Netlify.  

---

## 🚀 Core Features

- **User Signup & Login** (Email OTP or Google Auth)  
- **JWT Authentication & Authorization**  
- **Create, View & Delete Notes** (per user)  
- **Dashboard with recent notes**  
- **Error handling** for invalid inputs & API failures  
- **Responsive UI** with Tailwind CSS  
- **Clean folder structure** for scalability  

---

## 🖥️ Tech Stack

- **Frontend:** React (TypeScript), React Router, Axios, Tailwind CSS, Lucide Icons  
- **Backend:** Node.js, Express.js, TypeScript  
- **Database:** MongoDB (Mongoose)  
- **Authentication:** JSON Web Tokens (JWT), Google OAuth 2.0  
- **Deployment Ready:** Environment variables (`.env`), modular folder structure  

---

## ⚙️ Local Installation & Setup Guide

### ✅ Prerequisites
| Tool        | Purpose                   | Download Link |
|-------------|---------------------------|---------------|
| Node.js     | Runtime for frontend+backend | [https://nodejs.org/](https://nodejs.org/) |
| Git         | Clone repository          | [https://git-scm.com/](https://git-scm.com/) |
| MongoDB Atlas | Cloud database          | [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) |
| Code Editor | VS Code recommended       | [https://code.visualstudio.com/](https://code.visualstudio.com/) |

---

### 📥 Step 1: Clone the Project
```bash
git clone https://github.com/Rahul17903/Highway-Delite-internship.git
```

---

### 📦 Step 2: Setup Backend
```bash
cd server
npm install
```

Create a `.env` file in `/backend`:
```env
PORT = 5000
MONGO_URI = your database url
JWT_SECRET= jayshreeram
GOOGLE_CLIENT_ID = your google client id 
GOOGLE_CLIENT_SECRET = your client secret
EMAIL_USER = user email
EMAIL_PASS = email user password 
```

Run backend:
```bash
npm run dev
```

---

### 💻 Step 3: Setup Frontend
```bash
cd frontend
npm install
```

Update `/frontend/src/api.ts`:
```ts
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});
```

Run frontend:
```bash
npm run dev
```

---

### ☁️ Step 4: MongoDB Atlas Setup
1. Create a free cluster in **MongoDB Atlas**  
2. Add DB user with username & password  
3. Whitelist IP → `0.0.0.0/0` (Allow all)  
4. Copy connection string → paste into `.env` as `MONGO_URI`  

---

## 🧱 Project Structure
```bash
note-app/
│
├── backend/                  # Express backend + MongoDB
│   ├── src/
│   │   ├── index.ts          # Entry point (Express server)
│   │   ├── routes.ts         # Auth & Notes routes
│   │   ├── models.ts         # User & Notes schemas
│   │   ├── middleware.ts     # JWT authentication middleware
│   │   └── controllers.ts    # Business logic
│   └── .env                  # Backend config
│
├── frontend/                 # React frontend + Tailwind
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Signup, Login, Dashboard, Notes
│   │   ├── api.ts            # Axios instance
│   │   └── App.tsx           # Router setup
│   └── .env                  # Frontend config
│
└── README.md                 # Project guide
```

---

## 🔗 Live Link
[Click Here](https://your-deployed-url.vercel.app)  

---

## 📄 License
This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.  

---

## ☎︎ Contact
If you have any questions or need further clarification, feel free to reach out:  

- **💌 Email:** rahulghosh17903@gmail.com  
- **🕵️‍♂️ LinkedIn:** [Your LinkedIn](https://www.linkedin.com/in/rahul-ghosh-b377b228a/)  
- **🌐 GitHub:** [your-username](https://github.com/Rahul17903)  

---

⭐ If you found this project helpful, don’t forget to give it a star!  
