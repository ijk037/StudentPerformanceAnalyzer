const express = require("express");
const router = express.Router();

const {
  getStudents,
  updatePerformance,
} = require("../controllers/facultyController");

router.get("/students", getStudents);
router.post("/performance", updatePerformance);

module.exports = router;
