const jwt = require('jsonwebtoken');

const SECRET_KEY = 'exam_system_secret_key'; // Move to .env in production

// Generate JWT
function generateToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' });
}

// Middleware to verify JWT from HTTPOnly cookie
function authenticateToken(req, res, next) {
  const token = req.cookies.token; // Token retrieved from cookie

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });
    req.user = user; // Attach decoded user data
    next();
  });
}

module.exports = { generateToken, authenticateToken };
