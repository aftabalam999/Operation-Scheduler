# Low Level Design Document 

## 1. Description and Overview
This document outlines the detailed system architecture and specifications of the **Operation Scheduler For Hospital Management** module. The application caters to the problem statement addressing dynamic and scalable operating room schedules, using HTML, CSS, JavaScript (MERN configuration with Firebase integration).

### Problem Solved
Currently, surgical schedules consist of static tables where modifications require manual adjustments across various physical logs. This system translates these activities into dynamic REST interfaces utilizing Firebase mock logic and advanced `winston` logging for traceability. Let's outline the specific class logic, UI state logic and Database structure underneath the interface models.

## 2. Technology Stack & Frameworks
**Frontend:**
*   **React Component Library:** Vite.js template (Javascript JSX) ensuring scalable components.
*   **CSS Framework:** TailwindCSS generating aesthetic and responsive modules out-of-the-box.
*   **Routing Mechanism:** `react-router-dom` implementing strict Role-Based Access controls (RBAC).

**Backend Engine:**
*   **API Framework:** Node.js with `express` acting as middleware API endpoints preventing direct DB hits from client browsers (Security best practice).
*   **Database:** Configured to map straightforwardly to Firebase Firestore (collections `doctors`, `patients`, `schedules`).
*   **Logging Engine:** `winston` combined format JSON timestamps written to `combined.log` and `error.log`.

## 3. Class Definitions and Component Lifecycle

### A) Main Component Architecture
1.  **`App (<Router>)`**
    *   Main Entry point initializing `user` authentication state (mocked or firebase-auth token).
    *   Distributes properties across the component tree to validate route access.
2.  **`Login (Authentication Control)`**
    *   Authenticating credentials matching to explicit Roles `Admin` | `User`.
3.  **`AdminDashboard` & `UserDashboard`**
    *   React standard hook state controls UI tab transitions (`activeTab`).
    *   *Effect Lifecycles* mount REST calls resolving list elements from `backend` services.

### B) Entity Logic Mapping (Database Configuration)
1. **`Doctors` Collection**
   *   `id` : (String UUID)
   *   `name` : (String) e.g. Dr. John Smith
   *   `specialty` : (Enum/String) Anesthesiologist, Surgeon
   *   `availableDays` : (String[]) mapped to week days validating OT assignments.
2. **`Patients` Collection**
   *   `id` : (String UUID)
   *   `name` : (String)
   *   `age` : (Integer)
   *   `condition` : (String) surgical requirement baseline.
3. **`Schedules` Collection (Ties the data together via Foreign Key style references)**
   *   `id` : (String UUID) 
   *   `date` : (DateTime Format) schedule allocation
   *   `otId` : (String UUID) Reference to unique Operation Theater.
   *   `doctorIds` : (String[]) Reference indicating primary surgeon allocation.
   *   `patientId` : (String) Reference to patient allocation.
   *   `status` : (Enum Status) Scheduled, Cancelled, Completed, Postponed.
   *   `surgeryType` : (String) Specific operational procedure required.

## 4. API Endpoints and Payloads

### Backend REST Routes (`index.js` Controller)
* `GET /api/doctors` -> Fetches doctor object arrays for dropdown form population.
* `POST /api/doctors` -> Ingests a new doctor class object. Writes log.
* `GET /api/patients` -> Retrieves patient allocations.
* `POST /api/patients` -> Ingests a new patient tracking model. Write log.
* `GET /api/schedules` -> Formats and lists entire operational timeline logic.
* `POST /api/schedules` -> Calculates allocations, commits a new Operation Timeline model matching a patient -> doctor -> OT -> date instance.

## 5. Security and Logging Best Practices
*   **Logging Metrics:** Every Express route passes through a custom-built Winston middleware intercept logging `req.method` and `req.url` including granular detail down to new entry generation IDs.
*   **Access Control:** The route level component in React evaluates `user.role`. A user with standard privileges accessing `/admin` gets redirected back to landing `/login`.
*   **Data Consistency:** Operations mimic Document-store transactions (NoSQL pattern perfect for Firebase configurations).

## 6. Execution and Maintenance
*   **Safe Code Development:** Standard practices separating components logic into specific React views, decoupled API server logic allowing containerization.
*   **Portability:** Entire structure executes purely on cross-platform NPM configurations.

*Authored for Academic Delivery & Assessment Criteria. MERN specification utilizing robust NoSQL logic framework mapped to JS frameworks.*
