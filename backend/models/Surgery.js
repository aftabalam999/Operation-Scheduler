const mongoose = require('mongoose');

const surgerySchema = new mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    assistantSurgeon: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
    anesthesiologist: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Could be User or Doctor
    nurses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Users with role 'Nurse'
    otRoom: { type: String, required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true }, // Format HH:mm
    endTime: { type: String, required: true },
    status: {
        type: String,
        enum: ['Scheduled', 'Pre-Operation', 'In Operation', 'Post-Operation', 'Completed', 'Cancelled'],
        default: 'Scheduled'
    },
    type: { type: String, required: true },
    priority: { type: String, enum: ['Normal', 'Emergency'], default: 'Normal' },
    remarks: { type: String },
    resourcesUsed: [{
        resourceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Resource' },
        quantity: { type: Number }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Surgery', surgerySchema);
