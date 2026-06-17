# 📚 CollabStudy — Collaborative Study Room Platform

<div align="center">

![CollabStudy Banner](https://img.shields.io/badge/CollabStudy-Collaborative%20Learning-6366f1?style=for-the-badge&logo=bookstack&logoColor=white)

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3-6DB33F?style=flat-square&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14-336791?style=flat-square&logo=postgresql&logoColor=white)](https://postgresql.org)
[![Spring AI](https://img.shields.io/badge/Spring%20AI-1.0-6DB33F?style=flat-square&logo=spring&logoColor=white)](https://spring.io/projects/spring-ai)
[![WebSocket](https://img.shields.io/badge/WebSocket-STOMP-010101?style=flat-square&logo=socket.io&logoColor=white)](https://stomp.github.io)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

### A real-time collaborative study platform where students create virtual rooms,
### study together with AI assistance, and gamify their learning journey.

[🚀 Live Demo](https://collab-study.vercel.app) • [📬 API Docs](https://collab-study-api.onrender.com/swagger-ui.html) • [📮 Postman Collection](#api-documentation)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [WebSocket Events](#websocket-events)
- [Deployment](#deployment)
- [Screenshots](#screenshots)
- [Contributing](#contributing)

---

## 🌟 Overview

CollabStudy solves a real problem — students studying alone lack accountability,
collaboration, and intelligent support. This platform brings together:

- **Real-time collaboration** via WebSocket (STOMP + SockJS)
- **AI-powered study tools** via Spring AI + OpenRouter (GPT-4o-mini)
- **Gamification** to keep students motivated (XP, badges, streaks)
- **Social authentication** via Google and GitHub OAuth2
- **Shared workspace** with notes, tasks, and chat in one place

---

## ✨ Features

### 🔐 Authentication & Security
- JWT-based stateless authentication with refresh token rotation
- Google OAuth2 and GitHub OAuth2 social login
- Role-based access control (USER / ADMIN)
- Secure token storage and auto-refresh mechanism
- Password hashing with BCrypt

### 🏠 Study Room Management
- Create public or private study rooms with unique 8-character codes
- Password-protected private rooms
- Smart room recommendations by subject
- Join rooms via room code — share with friends easily
- Room capacity management (2–50 participants)

### ⏱️ Study Sessions
- Start, join, and end real-time timed study sessions
- Live countdown timer synchronized via WebSocket
- Automatic XP rewards based on session duration
- Session history with notes and participant tracking
- Focus score calculation per session

### 💬 Real-time Chat
- Instant messaging powered by WebSocket (STOMP protocol)
- Emoji support with emoji picker 😀🔥💡
- Message reply threading
- AI trigger via `@ai` or `/ai` prefix in chat
- System messages for room events (join, leave, session start)
- Chat history pagination via REST API
- AI responses rendered with full Markdown formatting

### 🤖 AI Study Assistant (Spring AI)
- **Explain Topic** — plain-language explanations of any concept
- **Generate Quiz** — 5 MCQs with answers on any subject
- **Summarize Notes** — condense long notes into key points
- **Create Interview Questions** — with expected answers
- Powered by **Spring AI 1.0** → OpenRouter → GPT-4o-mini
- In-chat AI trigger for seamless workflow
- AI Explorer badge awarded on first use

### 📝 Collaborative Shared Notes
- Create and edit markdown notes per room
- Real-time broadcast of edits to all room members via WebSocket
- Auto-save with debounce (saves 1.5s after last keystroke)
- **Export notes as PDF** (iText library)
- Last-edited-by tracking for accountability

### ✅ Task / Goal Tracker
- Add shared tasks with title, description, priority, due date
- Assign tasks to specific room members
- Real-time completion broadcast to all members
- Priority levels: HIGH (🔴), MEDIUM (🟡), LOW (🟢)
- Separate pending and completed sections

### 🏆 Gamification System
- **XP Points** earned for: creating rooms (+10), joining rooms (+5),
  completing sessions (duration-based), using AI (+badge)
- **Level System** — levels 1–10+ based on cumulative XP
- **Daily Streaks** — auto-detected, resets if a day is missed
- **10 Badge Types** with automatic award logic:

| Badge | Condition | Icon |
|-------|-----------|------|
| 7 Day Warrior | 7-day study streak | 🔥 |
| Monthly Champion | 30-day study streak | 🏆 |
| Night Owl | Studied after 10 PM | 🦉 |
| Early Bird | Studied before 7 AM | 🌅 |
| Session Pro | Completed 10 sessions | ⭐ |
| Study Master | Completed 50 sessions | 💎 |
| Subject Master | Subject mastery achieved | 🎓 |
| Room Creator | Created first room | 🏠 |
| Team Player | Joined a study room | 🤝 |
| AI Explorer | Used AI assistant | 🤖 |

### 📊 Analytics Dashboard
- Personal: total study hours, sessions, XP, level, streak
- Room: member count, total messages, average session duration
- Global leaderboard by XP points or study streak (top 20)

### 🔔 Real-time Notification System
- WebSocket push notifications (no polling)
- Session start alerts to all room members
- Badge earned notifications with icon
- XP earned toasts after every session
- Mark read / mark all read
- Unread count badge on navbar bell icon

---

## 🛠️ Tech Stack

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Java | 21 | Primary language |
| Spring Boot | 3.3.0 | Application framework |
| Spring Security | 6.x | Authentication & authorization |
| Spring AI | 1.0.0 | AI integration |
| Spring WebSocket | 3.3.0 | Real-time communication |
| Spring Data JPA | 3.3.0 | Database ORM |
| Spring OAuth2 Client | 6.x | Social login |
| JJWT | 0.12.5 | JWT token handling |
| PostgreSQL | 14+ | Primary database |
| iTextPDF | 5.5.13 | PDF generation |
| Maven | 3.8+ | Build tool |

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18 | UI library |
| TypeScript | 5.0 | Type safety |
| Vite | 5.x | Build tool |
| Tailwind CSS | 3.x | Styling |
| shadcn/ui | Latest | Component library |
| TanStack Query | 5.x | Server state management |
| Zustand | 4.x | Client state management |
| Axios | 1.x | HTTP client |
| @stomp/stompjs | 7.x | WebSocket client |
| sockjs-client | 1.x | WebSocket fallback |
| react-hook-form | 7.x | Form management |
| Zod | 3.x | Schema validation |
| react-markdown | 9.x | Markdown rendering |
| react-hot-toast | 2.x | Toast notifications |
| date-fns | 3.x | Date formatting |
| lucide-react | Latest | Icons |

### Infrastructure
| Service | Purpose |
|---------|---------|
| Render | Backend deployment |
| Vercel | Frontend deployment |
| PostgreSQL (Render) | Production database |
| OpenRouter | AI API gateway |
| GitHub Actions | CI/CD (optional) |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT (React + TS)                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐  │
│  │  Pages   │  │  Store   │  │  Query   │  │  WS    │  │
│  │ (Router) │  │(Zustand) │  │(TanStack)│  │(STOMP) │  │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └───┬────┘  │
│       └─────────────┴──────────────┴─────────────┘      │
│                    Axios (JWT Interceptor)               │
└──────────────────────────┬──────────────────────────────┘
                    HTTP / WebSocket
┌──────────────────────────▼──────────────────────────────┐
│               SPRING BOOT BACKEND (Port 8080)           │
│  ┌──────────────────────────────────────────────────┐   │
│  │            Spring Security (JWT + OAuth2)         │   │
│  └──────────────────────────────────────────────────┘   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐  │
│  │   Auth   │  │  Rooms   │  │ Sessions │  │  Chat  │  │
│  │Controller│  │Controller│  │Controller│  │  WS    │  │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └───┬────┘  │
│       └─────────────┴──────────────┴─────────────┘      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │Spring AI │  │Gamificat.│  │Analytics │              │
│  │(OpenRtr) │  │ Service  │  │ Service  │              │
│  └──────────┘  └──────────┘  └──────────┘              │
│                   Spring Data JPA                       │
└──────────────────────────┬──────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────┐
│                    PostgreSQL Database                   │
│  users │ study_rooms │ study_sessions │ chat_messages   │
│  shared_notes │ tasks │ badges │ notifications          │
└─────────────────────────────────────────────────────────┘
```

### Key Design Decisions
- **Stateless JWT** — no server-side sessions, horizontally scalable
- **WebSocket with STOMP** — topic-based pub/sub per room
- **Spring AI abstraction** — swap AI providers without changing business logic
- **Repository pattern** — clean separation of data access
- **Global exception handler** — consistent API error responses

---

## 🚀 Getting Started

### Prerequisites
```bash
Java 21+
Maven 3.8+
Node.js 18+
PostgreSQL 14+
```

### 1. Clone the Repository
```bash
https://github.com/radhika4229/StudySync.git
cd study-room-platform
```

### 2. Backend Setup

**Create PostgreSQL database:**
```sql
CREATE DATABASE studyroom;
```

**Configure environment variables:**
```bash
cp .env.example .env
# Fill in your values (see Environment Variables section)
```

**Run the backend:**
```bash
mvn spring-boot:run
# Backend starts at http://localhost:8080
```

### 3. Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
# .env contains: VITE_API_BASE_URL=http://localhost:8080/api
npm run dev
# Frontend starts at http://localhost:5173
```

### 4. Open the App
```
http://localhost:5173
```

---

## 🔐 Environment Variables

### Backend (`.env` in project root)
```env
# Database
DB_URL=jdbc:postgresql://localhost:5432/studyroom
DB_USERNAME=postgres
DB_PASSWORD=yourpassword

# JWT (use a strong 256-bit base64 encoded secret)
JWT_SECRET=your-super-secret-jwt-key-minimum-256-bits-long

# Google OAuth2
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub OAuth2
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# OpenRouter AI
OPENROUTER_API_KEY=your-openrouter-api-key

# Email (optional)
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-gmail-app-password

# Frontend URL (for OAuth2 redirects)
FRONTEND_URL=http://localhost:5173

# Spring profile
SPRING_PROFILES_ACTIVE=dev
```

### Frontend (`frontend/.env`)
```env
VITE_API_BASE_URL=http://localhost:8080/api
```

> ⚠️ **IMPORTANT**: Never commit `.env` files.
> Only `.env.example` with placeholder values goes to GitHub.

---

## 📬 API Documentation

Full Postman collection available: [`CollabStudy_API.postman_collection.json`](./CollabStudy_API.postman_collection.json)

### Quick Reference

#### Auth Endpoints
```
POST   /api/auth/register          Register new user
POST   /api/auth/login             Login with email/password
POST   /api/auth/refresh           Refresh access token
POST   /api/auth/logout            Logout (invalidate refresh token)
GET    /api/auth/me                Get current user
GET    /oauth2/authorize/google    Google OAuth2 login
GET    /oauth2/authorize/github    GitHub OAuth2 login
```

#### Room Endpoints
```
GET    /api/rooms                  List public rooms
POST   /api/rooms                  Create room
GET    /api/rooms/my               Get my rooms
GET    /api/rooms/{id}             Get room by ID
GET    /api/rooms/code/{code}      Get room by code
POST   /api/rooms/{code}/join      Join room by code
DELETE /api/rooms/{id}/leave       Leave room
GET    /api/rooms/recommend        Smart recommendations
```

#### Session Endpoints
```
POST   /api/sessions/rooms/{id}/start   Start session
PUT    /api/sessions/{id}/end           End session
POST   /api/sessions/{id}/join          Join session
GET    /api/sessions/rooms/{id}/active  Get active session
GET    /api/sessions/rooms/{id}         Session history
```

#### AI Endpoint
```
POST   /api/ai/query
Body:  { "question": "...", "queryType": "EXPLAIN" }
Types: EXPLAIN | GENERATE_QUIZ | SUMMARIZE_NOTES | CREATE_INTERVIEW_QUESTIONS
```

#### Other Endpoints
```
POST   /api/chat/rooms/{id}/messages    Send message
GET    /api/chat/rooms/{id}/messages    Get chat history
POST   /api/notes/rooms/{id}            Create note
PUT    /api/notes/{id}                  Update note
GET    /api/notes/{id}/export/pdf       Export as PDF
POST   /api/tasks/rooms/{id}            Create task
PUT    /api/tasks/{id}/complete         Complete task
GET    /api/analytics/me                Personal analytics
GET    /api/analytics/rooms/{id}        Room analytics
GET    /api/leaderboard                 Global leaderboard
GET    /api/notifications               All notifications
PUT    /api/notifications/read-all      Mark all read
```

---

## 🔌 WebSocket Events

Connect to `ws://localhost:8080/ws` using SockJS + STOMP.

**Connection Header:**
```javascript
{ Authorization: "Bearer <jwt-token>" }
```

**Subscribe to these topics:**
```
/topic/room/{roomId}/chat      → Incoming chat messages
/topic/room/{roomId}/session   → Session start/end events
/topic/room/{roomId}/notes     → Note update notifications
/topic/room/{roomId}/tasks     → Task create/complete events
/user/queue/notifications      → Personal notifications (XP, badges)
```

---

## 🌐 Deployment

### Backend → Render
```bash
# 1. Push to GitHub
git push origin main

# 2. Go to render.com → New Web Service → Connect GitHub repo
# 3. Settings:
#    Build Command: mvn clean package -DskipTests
#    Start Command: java -jar target/study-room-platform-1.0.0.jar
#    Environment: Add all env variables from .env

# 4. Add PostgreSQL database from Render dashboard
#    Copy the connection string to DB_URL env variable
```

### Frontend → Vercel
```bash
# 1. Go to vercel.com → New Project → Import frontend folder
# 2. Framework: Vite
# 3. Root Directory: frontend
# 4. Add environment variable:
#    VITE_API_BASE_URL = https://your-backend.onrender.com/api

# 5. Deploy
```

### Update OAuth2 Redirect URIs
After deployment, update in Google Console and GitHub OAuth App:
```
Authorized redirect URI: https://your-backend.onrender.com/oauth2/callback/google
Authorized redirect URI: https://your-backend.onrender.com/oauth2/callback/github
```

---

## 📸 Screenshots

| Landing Page | Dashboard | Study Room |
|-------------|-----------|------------|
| ![Landing](screenshots/landing.png) | ![Dashboard](screenshots/dashboard.png) | ![Room](screenshots/room.png) |

| AI Assistant | Leaderboard | Profile |
|-------------|-------------|---------|
| ![AI](screenshots/ai.png) | ![Leaderboard](screenshots/leaderboard.png) | ![Profile](screenshots/profile.png) |

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@radhika4229](https://github.com/radhika4229)
- LinkedIn: [radhika-sishodiya](https://www.linkedin.com/in/radhika-sishodiya/)
- Email: sishodiyaradhika@gmail.com

---

## 📄 License

This project is licensed under the MIT License.

---

<div align="center">
Built with ❤️ for students who study better together
</div>
