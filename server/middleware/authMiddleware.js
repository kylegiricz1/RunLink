const jwt = require('jsonwebtoken');
const User = require('../models/user');  // Ensure correct path

const protect = async (req, res, next) => {
  let token;

  // Check if the Authorization header exists and starts with 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from Bearer token
      token = req.headers.authorization.split(' ')[1];

      // Verify the token with the secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user to the request object (without password)
      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        return res.status(401).json({ message: 'Not authorized, user no longer exists' });
      }

      // Continue to the next middleware/route handler
      next();
    } catch (error) {
      // Handle invalid token
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    // Token not provided
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
