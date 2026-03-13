const Surgery = require('../models/Surgery');
const Doctor = require('../models/Doctor');
const Log = require('../models/Log');

// Helper function to check conflicts
const checkConflict = async (otRoom, doctorId, date, startTime, endTime, excludeSurgeryId = null) => {
    const query = {
        date: new Date(date),
        status: { $nin: ['Cancelled', 'Completed'] },
        $or: [
            { otRoom },
            { doctor: doctorId }
        ]
    };

    if (excludeSurgeryId) {
        query._id = { $ne: excludeSurgeryId };
    }

    const surgeries = await Surgery.find(query);

    // Time overlap logic
    for (let s of surgeries) {
        if (
            (startTime >= s.startTime && startTime < s.endTime) ||
            (endTime > s.startTime && endTime <= s.endTime) ||
            (startTime <= s.startTime && endTime >= s.endTime)
        ) {
            return true; // Conflict found
        }
    }

    return false; // No conflict
};

// @desc    Schedule a new surgery
// @route   POST /api/surgeries
exports.createSurgery = async (req, res) => {
    try {
        const { patient, doctor, otRoom, date, startTime, endTime, type, priority, remarks } = req.body;

        // Check for conflicts
        const hasConflict = await checkConflict(otRoom, doctor, date, startTime, endTime);

        // If emergency, we might allow overriding, but currently let's just return conflict flag.
        if (hasConflict && priority !== 'Emergency') {
            return res.status(409).json({ message: 'Scheduling conflict detected (OT Room or Doctor unavailable)' });
        }

        const surgery = await Surgery.create({
            patient,
            doctor,
            otRoom,
            date,
            startTime,
            endTime,
            type,
            priority,
            remarks,
            status: 'Scheduled'
        });

        // Log action
        await Log.create({
            user: req.user._id,
            action: 'Create Surgery',
            details: `Scheduled surgery for patient ${patient} in ${otRoom}`
        });

        res.status(201).json(surgery);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all surgeries (dashboard)
// @route   GET /api/surgeries
exports.getSurgeries = async (req, res) => {
    try {
        // Populate references if needed
        const surgeries = await Surgery.find().populate('doctor').populate('patient');
        res.json(surgeries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update surgery status
// @route   PUT /api/surgeries/:id/status
exports.updateSurgeryStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const surgery = await Surgery.findByIdAndUpdate(req.params.id, { status }, { new: true });

        if (!surgery) return res.status(404).json({ message: 'Surgery not found' });

        // Log action
        await Log.create({
            user: req.user._id,
            action: 'Update Status',
            details: `Updated surgery ${surgery._id} status to ${status}`
        });

        res.json(surgery);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
