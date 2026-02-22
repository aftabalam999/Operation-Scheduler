const express = require('express');
const cors = require('cors');
const logger = require('./logger');
const admin = require('firebase-admin');

// ---------------------------------------------------------
// FIREBASE INTEGRATION
// Note: To fully activate, provide serviceAccountKey.json
// ---------------------------------------------------------
/*
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const dbFirestore = admin.firestore();
*/

const app = express();
app.use(cors());
app.use(express.json());

// Middleware to log all requests
app.use((req, res, next) => {
    logger.info(`Received ${req.method} request for ${req.url}`);
    next();
});

app.get('/api/health', (req, res) => {
    logger.info('Health check endpoint called');
    res.status(200).json({ status: 'OK' });
});

// Mock database to demonstrate modular data storage structure matching Firestore
let db = {
    users: [],
    doctors: [
        { id: 'd1', name: 'Dr. John Smith', specialty: 'Anesthesiologist', availableDays: ['Monday', 'Wednesday', 'Friday'] },
        { id: 'd2', name: 'Dr. Sarah Connor', specialty: 'General Surgeon', availableDays: ['Tuesday', 'Thursday'] },
    ],
    patients: [
        { id: 'p1', name: 'Michael Doe', age: 45, condition: 'Appendicitis' },
    ],
    schedules: [
        {
            id: 's1',
            date: '2026-03-01T10:00',
            otId: 'OT-1',
            doctorIds: 'Dr. Sarah Connor',
            medicName: 'Dr. Alan Grant',
            anesthesiaType: 'General',
            anesthesiologistName: 'Dr. John Smith',
            nurses: 'Nurse Joy, Nurse Ratched',
            patientId: 'Michael Doe',
            status: 'Scheduled',
            surgeryType: 'Appendectomy',
            remarks: 'Standard procedure',
            drugsAndMaterials: 'Standard Surgical Kit, Propofol',
            prePostEvents: 'Pre-op vital signs stable.',
            surgicalReports: 'Pending operation...'
        }
    ],
    logs: []
};

// 0. Auth Endpoint
app.post('/api/auth/register', (req, res) => {
    const newUser = { id: `u${Date.now()}`, role: 'user', ...req.body };
    logger.info(`User registered: ${newUser.email}`);
    db.users.push(newUser);
    res.status(201).json(newUser);
});

// 1. Doctors Endpoint
app.get('/api/doctors', (req, res) => {
    logger.info('Fetching all doctors');
    res.json(db.doctors);
});

app.post('/api/doctors', (req, res) => {
    const newDoctor = { id: `d${Date.now()}`, ...req.body };
    logger.info(`Adding new doctor: ${newDoctor.name}`);
    db.doctors.push(newDoctor);
    res.status(201).json(newDoctor);
});

// 2. Patients Endpoint
app.get('/api/patients', (req, res) => {
    logger.info('Fetching all patients');
    res.json(db.patients);
});

app.post('/api/patients', (req, res) => {
    const newPatient = { id: `p${Date.now()}`, ...req.body };
    logger.info(`Adding new patient: ${newPatient.name}`);
    db.patients.push(newPatient);
    res.status(201).json(newPatient);
});


// 3. Schedules Endpoint
app.get('/api/schedules', (req, res) => {
    logger.info('Fetching all schedules');
    res.json(db.schedules);
});

app.post('/api/schedules', (req, res) => {
    const newSchedule = { id: `s${Date.now()}`, ...req.body };
    logger.info(`Adding new schedule for patient: ${newSchedule.patientId}`);
    db.schedules.push(newSchedule);
    res.status(201).json(newSchedule);
});

app.put('/api/schedules/:id', (req, res) => {
    const id = req.params.id;
    const index = db.schedules.findIndex(s => s.id === id);
    if (index !== -1) {
        db.schedules[index] = { ...db.schedules[index], ...req.body };
        logger.info(`Updated schedule: ${id}`);
        res.json(db.schedules[index]);
    } else {
        logger.error(`Schedule not found: ${id}`);
        res.status(404).json({ error: 'Not found' });
    }
});

app.delete('/api/schedules/:id', (req, res) => {
    const id = req.params.id;
    db.schedules = db.schedules.filter(s => s.id !== id);
    logger.info(`Deleted schedule: ${id}`);
    res.sendStatus(204);
});

// 4. Activity Logs for Administrators
app.get('/api/logs', (req, res) => {
    logger.info('Fetching system activity logs');
    res.json([
        { id: 1, text: "OT-1 Requesting additional anesthesia materials.", time: "1 hour ago", type: "event" },
        { id: 2, text: "Dr. Sarah Connor updated surgical report for Michael Doe.", time: "3 hours ago", type: "update" },
        { id: 3, text: "OT-3 Emergency surgery assigned.", time: "5 hours ago", type: "emergency" }
    ]);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
    console.log(`Backend is up and running on port ${PORT}`);
});
