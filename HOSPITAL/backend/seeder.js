const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Doctor = require('./models/Doctor');
const Patient = require('./models/Patient');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const importData = async () => {
    try {
        await User.deleteMany();
        await Doctor.deleteMany();
        await Patient.deleteMany();

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin123', salt);

        const adminUser = new User({
            name: 'Super Admin',
            email: 'admin@hospital.com',
            password: hashedPassword,
            role: 'Admin',
        });

        await adminUser.save();

        const sampleDoctors = [
            { name: 'John Doe', specialization: 'Cardiology', contactNumber: '1234567890', email: 'john@doc.com', workingHours: '09:00-17:00' },
            { name: 'Jane Smith', specialization: 'Neurology', contactNumber: '0987654321', email: 'jane@doc.com', workingHours: '10:00-18:00' },
        ];
        await Doctor.insertMany(sampleDoctors);

        const samplePatients = [
            { name: 'Alice Walker', age: 30, gender: 'Female', contactNumber: '1112223334', address: '123 Elm St', medicalHistory: 'None' },
            { name: 'Bob Carter', age: 45, gender: 'Male', contactNumber: '5556667778', address: '456 Oak St', medicalHistory: 'Hypertension' },
        ];
        await Patient.insertMany(samplePatients);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

importData();
