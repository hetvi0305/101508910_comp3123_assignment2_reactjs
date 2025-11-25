const jwt = require("jsonwebtoken");

const SECRET = "MY_SECRET_KEY"; // use same secret as login

// Middleware to verify token
module.exports = function (req, res, next) {
    const authHeader = req.headers.authorization;

    // Check if header exists
    if (!authHeader) {
        return res.status(401).json({ message: "No token provided" });
    }

    // Format "Bearer TOKEN"
    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Invalid token format" });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded; // store user info in request
        next(); // allow request to continue
    } catch (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};
