const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, enum: ['Instrument', 'Drug', 'Equipment'], required: true },
    availableQuantity: { type: Number, required: true, default: 0 },
    unit: { type: String },
    status: { type: String, enum: ['Available', 'Low Stock', 'Out of Stock'], default: 'Available' }
}, { timestamps: true });

module.exports = mongoose.model('Resource', resourceSchema);
