const OperationSchedule = require('../models/OperationSchedule');

exports.getSchedules = async (req, res) => {
    try {
        const schedules = await OperationSchedule.find({}).populate('patient').populate('doctor').populate('assistantSurgeon');
        res.json(schedules);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addSchedule = async (req, res) => {
    try {
        const schedule = new OperationSchedule(req.body);
        const createdSchedule = await schedule.save();
        res.status(201).json(createdSchedule);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateSchedule = async (req, res) => {
    try {
        const schedule = await OperationSchedule.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (schedule) {
            res.json(schedule);
        } else {
            res.status(404).json({ message: 'Schedule not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteSchedule = async (req, res) => {
    try {
        const schedule = await OperationSchedule.findById(req.params.id);
        if (schedule) {
            await schedule.remove();
            res.json({ message: 'Schedule removed' });
        } else {
            res.status(404).json({ message: 'Schedule not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
