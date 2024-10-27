const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/crud')
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

// Event Schema
const eventSchema = new mongoose.Schema({
    name: String,
    email: String,
    eventId: String
});

const Event = mongoose.model('Event', eventSchema);

// API endpoint to register for an event
app.post('/register', async (req, res) => {
    const { name, email, eventId } = req.body;
    const newEvent = new Event({ name, email, eventId });
    try {
        await newEvent.save();
        res.status(201).send("Registration successful!");
    } catch (error) {
        res.status(500).send("Registration failed. Please try again.");
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
