# 🧠 CurricAI: AI-Powered Course Generator

**CurricAI** is a **dynamic full-stack AI-powered web application** that transforms a simple topic prompt into a complete, structured learning course.  
It automatically generates course outlines, modules, and detailed lessons enriched with videos and quizzes — creating a self-contained, interactive learning experience from a single line of text.

[![Live Demo](https://img.shields.io/badge/Try%20it%20Live-Vercel-brightgreen)](https://curric-ai-zeta.vercel.app/home)

---

## 🧰 Tech Stack  

<p align="center">
  <img src="https://skillicons.dev/icons?i=react,nodejs,express,mongodb,github" />
</p>

| Layer | Technology | Purpose |
|--------|-------------|----------|
| **Frontend** | React (Vite), Tailwind CSS | Dynamic and responsive UI |
| **Backend** | Node.js + Express | RESTful API logic |
| **Database** | MongoDB Atlas | Persistent course storage |
| **AI Services** | OpenAI API | Course & lesson generation |
| **Auth** | Auth0 | Secure OAuth 2.0 login |
| **Integrations** | YouTube API | Educational video suggestions |
| **Deployment** | Vercel + Railway | Cloud hosting with CI/CD |

---

## 🎥 Demo Video
<p align="center">
  <img src="Demo/CurricAIDemo.gif" width="700" alt="CurricAI Demo" />
</p>

---

## 💡 Key Highlights

- **🧩 AI-Powered Curriculum Generation** – Converts any topic (e.g., *“Intro to React Hooks”*) into structured courses using OpenAI.  
- **⚡ Dynamic & Interactive Site** – Real-time generation with persistent user-specific storage — not a static generator.  
- **📚 Rich Lesson Experience** – Lessons include text, code, MCQs, and embedded YouTube videos.  
- **🔐 Secure Auth & Personalization** – OAuth 2.0 login via Auth0 for user-specific courses.  
- **🧾 Lesson PDF Export** – Offline download with `jsPDF` and `html2canvas`.  
- **🌐 Seamless Deployment** – Frontend on Vercel, backend on Railway, CI/CD via GitHub Actions.  

---

## 🧠 Technical Architecture

**Frontend:**  
- **React + Vite** for fast development and modularity  
- Global state via Context API  
- Auth-protected routes with Auth0 React SDK  
- Fully responsive UI  

**Backend:**  
- **Node.js + Express** REST API  
- **Mongoose** schemas → Course → Module → Lesson  
- Middleware for auth and validation  
- AI service layer for content generation  

**Database:**  
- **MongoDB Atlas** for scalable document storage  
- Indexed relations for fast retrieval  

**External Integrations:**  
- **OpenAI API** for course and lesson generation  
- **YouTube Data API** for video enrichment  

**Deployment:**  
- **Vercel** (frontend)  
- **Railway** (backend + env vars)  
- **GitHub Actions** for automated CI/CD  

---

## 🧩 System Flow
1. **Prompt Input:** User enters a topic  
2. **AI Processing:** Backend calls OpenAI to generate structured JSON  
3. **Persistence:** Data stored in MongoDB  
4. **Rendering:** Frontend renders interactive content  
5. **Enhancements:** Videos, quizzes, PDF export  
6. **Personalization:** Auth0 ties data to user accounts  

---

## 🧰 Core Features Summary

| Feature | Description |
|----------|-------------|
| **Prompt-to-Course** | AI-generated structured modules |
| **Dynamic Renderer** | Interactive JSON-based content |
| **Auth0 Login** | OAuth 2.0 authentication & protected routes |
| **Video Integration** | Auto-suggested YouTube resources |
| **PDF Export** | Offline lesson downloads |
| **Persistent Storage** | MongoDB-backed user data |

---

## 🧑‍💻 Achievements & Learnings
- Built a **multi-stage AI prompt pipeline** for course and lesson generation.  
- Developed a **modular MERN architecture** with secure authentication.  
- Implemented **robust error handling** for AI JSON outputs.  
- Optimized API efficiency and token usage.  
- Deployed a **production-ready stack** with CI/CD automation.  

---

<details>
<summary>📜 Setup Instructions</summary>

```bash
# Clone repository
git clone https://github.com/yourusername/curricai.git

# Backend Setup
cd backend
npm install
npm run dev

# Frontend Setup
cd frontend
npm install
npm start
