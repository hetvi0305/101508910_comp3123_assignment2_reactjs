const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const jwt = require("jsonwebtoken");
const SECRET = "MY_SECRET_KEY"; // move to .env later

const { default: mongoose } = require("mongoose")

const routes = express.Router();

/**
 * POST /api/v1/user/signup
 * Create a new user
 */
routes.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ 
        $or: [{ email }, { username }] 
        });
        if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
        }

    // Create new user (password gets hashed automatically)
    const user = await User.create({ username, email, password });
    res.status(201).json({ message: 'User created successfully', user });
    } catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        });
    }
});

/**
 * POST /api/v1/user/login
 * Login with username OR email + password
 */
routes.post('/login', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const user = await User.findOne({
        $or: [{ email }, { username }]
        });

        if (!user) {
        return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            SECRET,
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        });
    }
});

module.exports = routes;
