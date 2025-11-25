const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize app

const app = express();

const SERVER_PORT = process.env.SERVER_PORT || 3002
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING || "mongodb+srv://hetvipatel3:Mitali2307@cluster0.qedl0kb.mongodb.net/comp3123_assignment1?retryWrites=true&w=majority&appName=Cluster0"
//const MONGO_URI = 'mongodb://mongo:27017/hrdb' || "mongodb+srv://hetvipatel3:Mitali2307@cluster0.qedl0kb.mongodb.net/comp3123_assignment1?appName=Cluster0"
//const PORT = 3002;


// Middleware to parse data
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(cors());

// Serve uploaded images statically
app.use('/uploads', express.static('uploads'));

// Routes
const userRoutes = require('./routes/userRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

// Mount routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', employeeRoutes);

app.route("/")
    .get((req, res) => {
        res.send("<h1>MogoDB + Mongoose Example</h1>")
    })

mongoose.connect(DB_CONNECTION_STRING)
    .then(() => {
        console.log("Connected to MongoDB Atlas");
        app.listen(SERVER_PORT, () => console.log(`Server running on port ${SERVER_PORT}`));
    })
    .catch(err => { 
    console.log("Error connecting to MongoDB:", err.message)
})
