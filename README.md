# Operation Scheduler For Hospital Management

## Description
Operating room surgical schedules provide logistical challenges due to various considerations like room availability, working hours per week, doctor preferences, and operating room capabilities. Administrators often use static schedules that require manual manipulation. The aim of this module is to transform static timetables into a dynamic model, streamlining surgical scheduling and resources management. 

Technologies utilized: MERN strategy (Frontend React + Backend Node API structure) & HTML, CSS, JS.
Logging is handled using `winston` on the backend.
Database strategy is designed for Firebase integration (Firebase Admin logic structured in backend).

## Project Requirements Addressed
- **Admin & User Interface:** Modular role-based dashboards with clear functionalities.
- **Manage Doctors & Patients:** Registration and viewing capabilities.
- **Dynamic Scheduling System:** Allocate patients, doctors, surgeons, OTs, and surgery times appropriately.
- **Resource Logging & Activity Tracking:** Every request is logged using `winston` for robust visibility.
- **Clean Aesthetic UI:** Modern responsive web design prioritizing clear view for crucial healthcare applications.

## System Architecture (High Level)
1. **Frontend:** React SPA built with Vite and TailwindCSS for streamlined performance and modern aesthetics.
2. **Backend Engine:** Express.js REST API with modular endpoints mimicking Firestore capabilities.
3. **Database Layer:** Mock implementation mirroring Cloud Firestore structure for `doctors`, `patients`, and `schedules` collections. Ready to connect via `firebase-admin`.
4. **Logging Layer:** `winston` logger writing operational transactions to `combined.log` and `error.log`.

## Setup & Execution Workflow
### 1. Requirements
Ensure Node.js and NPM are installed.

### 2. Startup Backend
Open a terminal in the root folder and run:
```bash
cd backend
npm install
npm run start # Use node index.js
```
The backend initializes the Express server on `http://localhost:5000` and configures `winston` logging. 

### 3. Startup Frontend
Open another terminal in the root folder and run:
```bash
cd frontend
npm install
npm run dev
```
The frontend launches the Vite development server (usually on `http://localhost:5173`).

### 4. Basic Workflow 
1. Open the frontend React application in your browser.
2. Select **Login** from the landing page.
3. Choose either **Admin Login** or **User Login** to demonstrate Role-Based Access Control.
4. **Admin Dashboard:**
   - Go to "Manage Doctors" or "Manage Patients" to populate data.
   - Go to "OT Schedules" to assign schedules using available doctors and patients.
5. **User Dashboard:**
   - Logged in as a general medical worker/user, view posted schedules.
   - Inspect specific Doctor Details.
6. Verify Logs: Observe the `backend/combined.log` generated file logging structural actions seamlessly.

## Follow Up
- LLD Document: Review `LLD.md` file in the repository for detailed Low-Level Design structure.
