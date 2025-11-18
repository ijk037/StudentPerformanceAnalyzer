const Student = require("../models/Student");
const Performance = require("../models/Performance");

exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.updatePerformance = async (req, res) => {
  try {
    const { studentId, subject, score } = req.body;

    const performance = new Performance({
      studentId,
      subject,
      score
    });

    await performance.save();

    res.json({ message: "Performance updated!" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
