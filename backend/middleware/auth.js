import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const protect = async (req, res, next) => {
  let token =
    req.headers.authorization?.startsWith('Bearer ')
      ? req.headers.authorization.split(' ')[1]
      : req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Not authorized, no token'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      return res.status(401).json({ success: false, error: 'User not found' });
    }

    await req.user.updateLastActive();
    next();
  } catch (error) {
    console.error('JWT Error:', error.message);
    const message =
      error.name === 'TokenExpiredError'
        ? 'Token expired'
        : 'Not authorized, token failed';

    return res.status(401).json({ success: false, error: message });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(403).json({
      success: false,
      error: 'Not authorized as admin'
    });
  }
};

export { protect, admin };
