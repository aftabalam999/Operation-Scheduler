const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');

// Creating a dummy express instance configured with the route we want to test
const app = express();
app.use(express.json());
// Import simple controller to test
const { getDoctors } = require('../controllers/doctorController');

// Mock route
app.get('/api/doctors', getDoctors);

describe('Operation Scheduler API Endpoints', () => {

    beforeAll(async () => {
        await mongoose.connect('mongodb://127.0.0.1:27017/hospital_management_test');
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('Code Level Optimizations & Modules: Should fetch an array of doctors', async () => {
        const res = await request(app).get('/api/doctors');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });
});
