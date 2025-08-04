const { generateToken } = require('../middleware/auth');
const User = require('../models/User');

// Google OAuth callback handler
const googleCallback = async (req, res) => {
  try {
    if (!req.user) {
      return res.redirect(`${process.env.CLIENT_URL}/login?error=auth_failed`);
    }

    // Generate JWT token
    const token = generateToken(req.user._id);
    
    // Redirect to frontend with token in URL (for initial setup)
    // In production, you might want to use a more secure method
    res.redirect(`${process.env.CLIENT_URL}/dashboard?token=${token}&auth=success`);
  } catch (error) {
    console.error('Google callback error:', error);
    res.redirect(`${process.env.CLIENT_URL}/login?error=server_error`);
  }
};

// Get current user
const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-__v');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        lastLogin: user.lastLogin
      }
    });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Logout user
const logout = async (req, res) => {
  try {
    // For JWT-only auth, logout is handled on the client side
    // The server just confirms the logout
    res.json({ 
      success: true, 
      message: 'Logged out successfully' 
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Check authentication status
const checkAuth = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ 
        authenticated: false,
        message: 'Not authenticated' 
      });
    }

    res.json({
      authenticated: true,
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        avatar: req.user.avatar
      }
    });
  } catch (error) {
    console.error('Check auth error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  googleCallback,
  getCurrentUser,
  logout,
  checkAuth
}; 