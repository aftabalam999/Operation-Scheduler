# 🏥 Operation Scheduler - Hospital Management System

Welcome to the **Operation Scheduler**, a comprehensive and dynamic hospital management platform designed to streamline operating room allocations, manage hospital staff, and provide dedicated portals for patients and administrators.

---

## 📖 Project Topic & Overview
Operating room surgical schedules provide immense logistical challenges due to room availability, doctor working hours, emergencies, and equipment availability. Administrators historically use static, paper-based schedules. **The topic of this project is to transform static hospital timetables into a dynamic, full-stack digital platform.**

This system solves real-world healthcare management problems by providing an interactive UI to assign patients to surgery rooms (OTs), allocate primary surgeons & anesthesiologists, and track operations in real-time from "Scheduled" to "Completed".

---

## ✨ Comprehensive Features

### 🔐 1. Role-Based Access Control (RBAC)
- **Admin/Receptionist Role**: Full access to the Dashboard, Surgery Scheduling, Doctor Management, and Resource allocation.
- **Doctor/Nurse Role**: Access to view assigned schedules, patient medical histories, and upcoming calendar events.
- **Patient Portal**: A dedicated, secure portal for patients to view their assigned doctor, ward, prescribed medications, medical reports, and upcoming surgery instructions.

### 📅 2. Dynamic Surgery Scheduling
- Schedule surgeries by selecting the Patient, Primary Surgeon, Assistant, Anesthesiologist, and specific OT Room.
- **Real-Time Conflict Detection**: Prevent double-booking a doctor or an OT room on the same date and time.
- **Priority Tagging**: Mark surgeries as "Normal" or "Emergency" (highlighted in red/purple across the platform).

### 📊 3. Interactive Master Dashboard
- Visual statistics and metric cards detailing total surgeries today, available OT rooms, active doctors, and emergency cases.
- **Recharts Integration**: Live bar charts showing OT Room Utilization percentages (Target vs. Actual Usage).

### 🩺 4. Doctor & Patient Management
- **Doctor Directory**: Maintain a database of doctors complete with their specialties, availability, and contact details.
- **Patient Records**: Store ages, blood groups, conditions, and complete medical histories. 
- Integrated view allowing staff to instantly see a patient's historical reports and surgery timelines.

### 📝 5. Timeline & Lifecycle Tracking
- Track every surgery through specific stages:
  1. `Scheduled`
  2. `Pre-Operation`
  3. `In Operation`
  4. `Post-Operation`
  5. `Completed`
- Visual progress bars dynamically update on the frontend as statuses are shifted.

### 📄 6. Reports & Analytics
- Administrators and Doctors can generate and attach "Pre-Op Assessments" and "Post-Op Notes" directly to a patient's ID.
- Patients can view these notes in read-only mode via their portal.

---

## 💻 Technology Stack

This project is built using the robust **MERN** stack (MongoDB, Express, React, Node.js):

### **Frontend (Client)**
- **Framework**: React 19 (built with Vite for lightning-fast HMR)
- **Styling**: TailwindCSS v4 for a highly modern, responsive, glassmorphism aesthetic.
- **Icons & UI Assets**: `lucide-react` for beautiful, consistent iconography.
- **Charts**: `recharts` for rendering data analytics on the dashboard.
- **Routing**: `react-router-dom` for secure, multi-page client-side routing.
- **API Client**: `axios` configured with interceptors for secure JWT token transmission.

### **Backend (Server)**
- **Runtime Environment**: Node.js (v20.x LTS)
- **Framework**: Express.js (REST API architecture)
- **Database**: MongoDB (via `mongoose` ODM) for scalable, flexible NoSQL data storage.
- **Authentication**: JWT (`jsonwebtoken`) and `bcrypt` for securely hashing passwords and generating session tokens.
- **Security**: `cors` middleware configured strictly to accept requests from the deployed frontend environment.

---

## 🚀 Deployment Guide

This project is fully production-ready and configured for cloud deployment.

### 1. Backend (Deployed on Render)
1. Push the code to GitHub.
2. Create a new "Web Service" on [Render.com](https://render.com).
3. Set the Root Directory to `backend`.
4. Build command: `npm install` | Start command: `node server.js`
5. Supply the required Environment Variables in Render:
   - `MONGO_URI`: Your MongoDB connection string.
   - `JWT_SECRET`: A secure random string for signing tokens.
   - `FRONTEND_URL`: The URL of your Vercel frontend deployment.

### 2. Frontend (Deployed on Vercel)
1. Import the repository into [Vercel](https://vercel.com).
2. Set the Root Directory to `frontend`.
3. Vercel will automatically detect Vite and run `npm run build`.
4. Supply the Environment Variable:
   - `VITE_BACKEND_URL`: The URL provided to you by Render for your backend (e.g., `https://operation-backend.onrender.com`).

---

## 🛠️ Local Development Setup

To run this project locally on your machine:

1. **Clone & Setup:**
   ```bash
   git clone https://github.com/aftabalam999/Operation-Scheduler.git
   cd Operation-Scheduler
   ```

2. **Boot the Backend:**
   ```bash
   cd backend
   npm install
   # Ensure you have a .env file locally with MONGO_URI, JWT_SECRET, PORT=5000, FRONTEND_URL=http://localhost:5173
   npm run dev
   ```

3. **Boot the Frontend:**
   ```bash
   cd ../frontend
   npm install
   # Ensure you have a .env file locally with VITE_BACKEND_URL=http://localhost:5000
   npm run dev
   ```
4. Visit `http://localhost:5173` in your browser.
