// backend/middleware/auth.js
const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET = process.env.JWT_SECRET || "pbl_secret";

module.exports = (req, res, next) => {
  // Accept both "Bearer <token>" and raw token in Authorization header
  const raw = req.headers["authorization"] || req.headers["Authorization"];
  if (!raw) return res.status(401).json({ error: "No token provided" });

  const token = raw.startsWith("Bearer ") ? raw.split(" ")[1] : raw;

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded; // { id, role, iat, exp }
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
