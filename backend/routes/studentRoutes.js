// backend/routes/studentRoutes.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const ctl = require("../controllers/studentController");

// Protected routes for student
router.post("/update", auth, ctl.updatePerformance);
router.post("/predict", auth, ctl.predictPerformance);

module.exports = router;
