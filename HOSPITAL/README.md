# Operation Scheduler For Hospital Management

## Features Overview
- **Modular Frontend:** Build on React/Vite with premium customized Glassmorphism design and typography.
- **Backend Architecture:** REST APIs designed via Node.js, Express, connected to MongoDB.
- **Administrators Management:** Endpoints for adding Doctors, registering Patients, and posting Operation Schedules.
- **Workflow & Evaluation Metrics:** Follows strict security routing using JSON Web Token authentication. Incorporates basic workflow separation between Admin & standard medical User roles. Error management & activity tracing using Morgan server logging.

## Tech Stack
**Frontend:** React (JSX), Vanilla CSS (High Aesthetics), React Router DOM 
**Backend:** Node.js, Express.js
**Database:** MongoDB, Mongoose 
**Security:** JWT, bcryptjs, Helmet

## Quick Start & Setup

### 1. Backend Initializations
To run the server side, follow the sequences below:
```bash
cd backend
# create a .env file containing:
# MONGO_URI="mongodb://127.0.0.1:27017/hospital_management"
# JWT_SECRET="your_secure_random_string"
# PORT=5000

npm install

# Seed the initial admin user, sample doctors, and patients
node seeder.js

npm run dev or node server.js
```
The server will boot up and establish connection to your MongoDB instance. Check your terminal output! `http://localhost:5000`

### 2. Frontend Launch
In a parallel shell/terminal:
```bash
cd frontend
npm install
npm run dev
```
Navigate to the localized network preview URL provided (default `http://localhost:5173`). Have fun exploring the app aesthetics!

---
> Code Architecture & Logic definitions find deeper context in the /docs/Project_Report.md
> All metrics regarding portability and execution fall into structured Node package designs.
