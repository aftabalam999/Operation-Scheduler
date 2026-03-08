const mongoose = require('mongoose');

const operationScheduleSchema = new mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true }, // Main Surgeon
    assistantSurgeon: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
    anesthesiologist: { type: String },
    anesthesiaType: { type: String },
    nurses: [{ type: String }],
    operationDate: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    otNumber: { type: String, required: true },
    status: { type: String, enum: ['Scheduled', 'Ongoing', 'Completed', 'Cancelled', 'Postponed'], default: 'Scheduled' },
    preOpEvents: { type: String },
    postOpEvents: { type: String },
    surgicalReports: { type: String }, // Can be URL or text notes
    remarks: { type: String },
    requiredEquipments: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('OperationSchedule', operationScheduleSchema);
