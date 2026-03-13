const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    surgery: { type: mongoose.Schema.Types.ObjectId, ref: 'Surgery', required: true },
    operativeNotes: { type: String, required: true },
    postOpInstructions: { type: String },
    complications: { type: String },
    reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Report', reportSchema);
