const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    specialization: { type: String, required: true },
    contactNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    workingHours: { type: String }, // e.g., '09:00 AM - 05:00 PM'
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);
