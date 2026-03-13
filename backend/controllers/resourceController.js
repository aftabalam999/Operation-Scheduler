const Resource = require('../models/Resource');

exports.getResources = async (req, res) => {
    try {
        const resources = await Resource.find();
        res.json(resources);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addResource = async (req, res) => {
    try {
        const resource = await Resource.create(req.body);
        res.status(201).json(resource);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
