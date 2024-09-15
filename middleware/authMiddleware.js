const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret_key'; // Store securely in environment variables

// Token validation middleware
module.exports.validateToken = (req, res, next) => {
    const token = req.headers['authorization']
    if (!token) {
        return res.status(401).json({ message: 'Token required' });
    }

    try {
        const decoded = jwt.verify(token, "imran");
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};
