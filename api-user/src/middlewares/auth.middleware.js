const authService = require("../services/auth.service");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Token não fornecido" });
    }

    const decoded = authService.verifyToken(token);
    req.userId = decoded.userId;

    next();
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

module.exports = authMiddleware;
