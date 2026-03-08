const Doctor = require('../models/Doctor');

exports.getDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find({});
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addDoctor = async (req, res) => {
    try {
        const doctor = new Doctor(req.body);
        const createdDoctor = await doctor.save();
        res.status(201).json(createdDoctor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (doctor) {
            await doctor.remove();
            res.json({ message: 'Doctor removed' });
        } else {
            res.status(404).json({ message: 'Doctor not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (doctor) {
            res.json(doctor);
        } else {
            res.status(404).json({ message: 'Doctor not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getDoctorProfile = async (req, res) => {
    try {
        const doctor = await Doctor.findOne({ email: req.user.email });
        if (doctor) {
            res.json(doctor);
        } else {
            res.status(404).json({ message: 'Doctor profile not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.saveDoctorProfile = async (req, res) => {
    try {
        let doctor = await Doctor.findOne({ email: req.user.email });

        if (doctor) {
            doctor.specialization = req.body.specialization || doctor.specialization;
            doctor.contactNumber = req.body.contactNumber || doctor.contactNumber;
            doctor.workingHours = req.body.workingHours || doctor.workingHours;
            // Name and email are tied to the logged-in user to prevent arbitrary changes
            const updatedDoctor = await doctor.save();
            res.json(updatedDoctor);
        } else {
            doctor = new Doctor({
                name: req.user.name,
                email: req.user.email,
                specialization: req.body.specialization,
                contactNumber: req.body.contactNumber,
                workingHours: req.body.workingHours,
            });
            const createdDoctor = await doctor.save();
            res.status(201).json(createdDoctor);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
