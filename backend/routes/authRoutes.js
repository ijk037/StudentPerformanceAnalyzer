// backend/routes/authRoutes.js
const express = require("express");
const router = express.Router();
const ctl = require("../controllers/authController");

// Student
router.post("/student/register", ctl.registerStudent);
router.post("/student/login", ctl.loginStudent);

// Faculty
router.post("/faculty/register", ctl.registerFaculty);
router.post("/faculty/login", ctl.loginFaculty);

module.exports = router;
