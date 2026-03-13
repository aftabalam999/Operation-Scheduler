const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    contactNumber: { type: String },
    medicalHistory: [{ type: String }],
    assignedDoctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    }
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);
