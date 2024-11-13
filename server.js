// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Replace <db_password> with your actual database password
const dbURI = 'mongodb+srv://missari:missari123@cluster0.2uqs2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection error:', error));

app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a schema and model for your data
const DataSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});
const Data = mongoose.model('Data', DataSchema);

// Handle form submissions
app.post('/submit-form', async (req, res) => {
    const { name, email, message } = req.body;
    
    try {
        const newData = new Data({ name, email, message });
        await newData.save();
        res.send('Form data saved successfully!');
    } catch (error) {
        res.status(500).send('Error saving data');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
