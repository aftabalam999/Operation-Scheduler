# Project Report: Operation Scheduler For Hospital Management

## 1. Introduction
The Operation Scheduler for Hospital Management aims to solve the logistical challenges of organizing operating room schedules. The project replaces static timetables with a dynamic, digital interface where administrators can efficiently manage Operation Theater (OT) activities. The platform considers room availability, doctor schedules, and other crucial pre/post-operative requirements.

## 2. Technology Stack
- **Frontend:** React (powered by Vite) + Vanilla Custom CSS (Premium Modern Aesthetics)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT) & bcrypt

## 3. System Architecture & Wireframe
The system adopts a classical **Client-Server Architecture**.

### 3.1 Components
- **Client (Frontend):** 
  - Admin/User UI: Dashboard, Doctors list, Patients registry, Scheduler.
- **API Gateway (Express Backend):**
  - Routes requests to specific controllers (Auth, Doctors, Patients, Schedules).
- **Database (MongoDB):**
  - Collections for Users, Doctors, Patients, and OperationSchedules.

### 3.2 Wireframe Overview
- **Login/Register:** Initial entry point. Routes users based on roles.
- **Dashboard:**
  - *Metrics Panel:* Total Operations, Ongoing, Completed.
  - *Schedule Grid:* Visual list of upcoming and past procedures.
- **Admin Section:** 
  - *Post Schedule:* Form taking inputs like patient info, anesthesiologist, time slots, OT number.
  
## 4. Low-Level Design (LLD) Document
### 4.1 Schema Mappings
- `User`: Handles system access (Admin/User).
- `Doctor`: Surgeon attributes (Name, Specialization, Contact).
- `Patient`: Patient details (Age, Gender, History).
- `OperationSchedule`: Master table connecting Doctor, Patient via references. Tracks statuses like Scheduled, Ongoing, Completed.

### 4.2 Module Breakdown
1. **Authentication:** Register/Login flows using `authController`.
2. **Resource Management:** CRUD for Doctors and Patients via `doctorController` and `patientController`. Validated by JWT admin middleware.
3. **Scheduling Core:** Allows creating procedures linking resources. `scheduleController`.

## 5. Deployment Strategies & Resource Optimization
- **Code Logic:** Controller-Service-Route separation ensures module independence.
- **Architecture:** The use of REST API ensures platform-agnostic operation. The client bundle (React) can be hosted on Vercel/Netlify edge devices, while the Node API resides on Render or Heroku, with MongoDB Atlas as the cloud DB.
- **Justification:** Serverless functions provide auto-scaling benefits to handle erratic queries common in hospital databases.

## 6. Implementation Specifications Checklist
- [x] Code is modular.
- [x] Tested & Portable.
- [x] Proper frontend with aesthetic styles.
- [x] MongoDB database connectivity established.
- [x] Error handling & Logging configured with Morgan middleware.
