const Doctor = require('../models/Doctor');

exports.getDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find().populate('user', 'name email');
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addDoctor = async (req, res) => {
    try {
        const { user, specialization, availability } = req.body;
        const doctor = await Doctor.create({ user, specialization, availability });
        res.status(201).json(doctor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
