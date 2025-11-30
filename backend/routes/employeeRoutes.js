const express = require('express');
const multer = require("multer");
const Employee = require('../models/employeeModel');
const auth = require('../middleware/authMiddleware');
const routes = express.Router();

// Multer config for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const upload = multer({ storage: storage });


/**
 * GET /api/v1/emp/employees
 * List all employees
 */
routes.get('/employees', auth, async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        });
    }
});

/**
 * POST /api/v1/emp/employees
 * Create a new employee
 */
routes.post('/employees', auth, upload.single("profile_picture"), async (req, res) => {
    try {
        const { first_name, last_name, email } = req.body;

        // Auto-fill fields required by your model
        const autoFilledFields = {
            position: "New Hire",
            salary: 50000,
            department: "General",
            date_of_joining: new Date()
        };

        let employeeData = {
            first_name,
            last_name,
            email,
            ...autoFilledFields
        };

        // Add profile picture if uploaded
        if (req.file) {
            employeeData.profile_picture = `/uploads/${req.file.filename}`;
        }

        const employee = await Employee.create(employeeData);

        return res.status(201).json({
            message: "Employee created successfully.",
            employee
        });

    } catch (err) {
        return res.status(500).json({ status: false, message: err.message });
    }
});

/**
 * GET /api/v1/emp/employees/:eid
 * Get one employee by ID
 */
routes.get('/employees/:eid', auth, async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.eid);
        if (!employee) return res.status(404).json({ message: 'Employee not found' });
        res.status(200).json(employee);
    } catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        });
    }
});

/**
 * PUT /api/v1/emp/employees/:eid
 * Update an employee (only allow editing 3 fields)
 */
routes.put('/employees/:eid', auth, upload.single("profile_picture"), async (req, res) => {
    try {
        const { first_name, last_name, email } = req.body;

        let updateData = {
            first_name,
            last_name,
            email
        };

        // If a picture is uploaded, update path
        if (req.file) {
            updateData.profile_picture = `/uploads/${req.file.filename}`;
        }

        const employee = await Employee.findByIdAndUpdate(
            req.params.eid,
            updateData,
            { new: true }
        );

        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        return res.status(200).json({
            message: "Employee updated successfully.",
            employee
        });

    } catch (err) {
        return res.status(500).json({ status: false, message: err.message });
    }
});

/**
 * DELETE /api/v1/emp/employees?eid=xxx
 * Delete an employee by query parameter
 */
routes.delete('/employees', auth, async (req, res) => {
    try {
        const { eid } = req.query;
        if (!eid) return res.status(400).json({ message: 'Missing eid query parameter' });

        const employee = await Employee.findByIdAndDelete(eid);
        if (!employee) return res.status(404).json({ message: 'Employee not found' });

        res.status(204).send(); // No content
    } catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })  ;
    }
});

/**
 * DELETE /api/v1/emp/employees/:eid
 * Delete employee using URL parameter
 */
routes.delete('/employees/:eid', auth, async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.eid);
        if (!employee) return res.status(404).json({ message: 'Employee not found' });

        res.status(200).json({ message: 'Employee deleted successfully.' });
    } catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        });
    }
});

/**
 * GET /api/v1/emp/employees/search?department=IT&position=Manager
 * Search employees by department,position or both (case-insensitive)
 */
routes.get('/employees/search', auth, async (req, res) => {
    try {
        const { department, position } = req.query;

        if (!department && !position) {
            return res.status(400).json({
                message: "Please provide department or position to search."
            });
        }

        let filter = {};

        if (department) {
            filter.department = { $regex: department, $options: "i" };
        }

        if (position) {
            filter.position = { $regex: position, $options: "i" };
        }

        const employees = await Employee.find(filter);
        res.status(200).json(employees);

    } catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        });
    }
});


module.exports = routes;
