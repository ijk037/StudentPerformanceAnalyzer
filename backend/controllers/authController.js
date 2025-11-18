// backend/controller/authController.js
const Student = require("../models/Student");
const Faculty = require("../models/Faculty");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET = process.env.JWT_SECRET || "pbl_secret";

// helper to sign token
function sign(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
}

// STUDENT REGISTER
exports.registerStudent = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: "Missing fields" });

    const exists = await Student.findOne({ email });
    if (exists) return res.status(400).json({ error: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);
    const student = await Student.create({ name, email, password: hashed });
    return res.json({ message: "Student registered", userId: student._id });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// STUDENT LOGIN
exports.loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Student.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ error: "Invalid credentials" });

    const token = sign({ id: user._id, role: "student" });
    return res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// FACULTY REGISTER
exports.registerFaculty = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: "Missing fields" });

    const exists = await Faculty.findOne({ email });
    if (exists) return res.status(400).json({ error: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);
    const faculty = await Faculty.create({ name, email, password: hashed });
    return res.json({ message: "Faculty registered", userId: faculty._id });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// FACULTY LOGIN
exports.loginFaculty = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Faculty.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ error: "Invalid credentials" });

    const token = sign({ id: user._id, role: "faculty" });
    return res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
