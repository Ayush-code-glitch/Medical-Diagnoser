const express = require('express');
const router = express.Router();
const axios = require('axios');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
    try {
        const { symptoms } = req.body;

        if (!symptoms || !Array.isArray(symptoms)) {
            return res.status(400).json({ msg: 'Invalid symptoms format' });
        }

        const response = await axios.post('http://localhost:5001/predict', {
            symptoms,
        });

        res.json(response.data);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
