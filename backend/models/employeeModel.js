const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    first_name: { 
        type: String, 
        required: [true, "First name is required"], 
        trim: true 
    },
    last_name: { 
        type: String, 
        required: [true, "Last name is required"], 
        trim: true 
    },
    email: { 
        type: String, 
        required: [true, "Email is required"], 
        unique: true, 
        lowercase: true, 
        match: /.+\@.+\..+/ 
    },
    position: { 
        type: String, 
        required: [true, "Position is required"] 
    },
    salary: { 
        type: Number, 
        required: [true, "Salary is required"] 
    },
    date_of_joining: { 
        type: Date, 
        required: [true, "Date of joining is required"] 
    },
    department: { 
        type: String, 
        required: [true, "Department is required"] 
    },
    profile_picture: {
        type: String,
        default: null
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('Employee', employeeSchema);
