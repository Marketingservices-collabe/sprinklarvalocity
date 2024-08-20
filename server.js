const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/calculate-velocity', (req, res) => {
    const { pipeSize, flowRate } = req.body;
    const pipeDiameters = {
        "1.049": 1.049,
        "1.380": 1.380,
        "1.610": 1.610,
        "2.067": 2.067,
        "2.469": 2.469,
        "3.068": 3.068,
        "4.026": 4.026,
        "6.065": 6.065
    };
    const diameter = pipeDiameters[pipeSize];
    if (flowRate > 0 && diameter) {
        const velocity = (0.408 * flowRate) / (Math.PI * Math.pow(diameter / 2, 2));
        const velocityAcceptable = velocity <= 15;
        res.json({
            velocity: velocity.toFixed(2),
            velocityAcceptable: velocityAcceptable ? 'Yes' : 'No'
        });
    } else {
        res.status(400).json({ error: 'Flow rate must be greater than 0 and pipe size must be valid' });
    }
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`Sprinkler Velocity Calculator API is running on port ${PORT}`);
});
