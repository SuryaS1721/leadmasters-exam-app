# LeadMasters Exam App (MERN)

Student-side exam-taking module with JWT auth, randomized MCQs, timer with auto-submit, scoring, and results.

## Tech Stack
- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB (Mongoose)
- Auth: JWT (Http-only not used here to keep things simple for local dev; use Bearer token)
- API testing: Postman collection included

## Quick Start

### 1) Prerequisites
- Node.js 18+
- MongoDB Atlas (or local MongoDB)
- Yarn or npm

### 2) Backend Setup
```bash
cd server
cp .env.example .env   # fill values
npm install
npm run dev            # starts on http://localhost:4000
# (optional) seed questions
npm run seed
```

### 3) Frontend Setup
```bash
cd client
npm install
npm run dev            # opens http://localhost:5173
```

### 4) Flow
1. Register a user -> login -> token saved in localStorage.
2. Click "Start Exam" to fetch randomized questions (default 10, 30-minute timer).
3. Navigate with Next/Previous, choose options.
4. When time ends or "Submit" clicked, exam auto-submits.
5. See result summary.

### 5) Environment (.env for server)
```
PORT=4000
MONGO_URI=mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority
JWT_SECRET=change_this_to_a_long_random_string
CORS_ORIGIN=http://localhost:5173
DEFAULT_EXAM_DURATION_MINUTES=30
DEFAULT_QUESTION_COUNT=10
```

### 6) API Endpoints
- `POST /api/auth/register` { name, email, password }
- `POST /api/auth/login` { email, password } -> { token }
- `GET /api/exam/start` (auth) -> randomized questions (without answers)
- `POST /api/exam/submit` (auth) -> { score, total, correct, incorrect, percentage }

### 7) Postman
Open the Postman collection under `postman/LeadMasters.postman_collection.json`. Set the `token` variable after login.

### 8) Notes
- This is a reference implementation for the assessment. In production, prefer httpOnly cookies, rate limiting, helmet, CSRF protections, improved error handling, and stricter validation.
- Admin panel, uploads, analytics are **excluded** as per scope.
