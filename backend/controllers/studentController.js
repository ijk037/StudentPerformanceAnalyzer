// backend/controller/studentController.js
const Student = require("../models/Student");

// Student updates own performance (protected route)
exports.updatePerformance = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { mte, ete } = req.body;
    const m = Number(mte) || 0;
    const e = Number(ete) || 0;
    const finalScore = +(m * 0.4 + e * 0.6).toFixed(2);

    await Student.findByIdAndUpdate(userId, { mte: m, ete: e });

    return res.json({ message: "Performance updated", finalScore });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Student predicts their score (no need to save)
exports.predictPerformance = async (req, res) => {
  try {
    const { mte, ete } = req.body;
    const m = Number(mte) || 0;
    const e = Number(ete) || 0;
    const predictedScore = +(m * 0.4 + e * 0.6).toFixed(2);
    return res.json({ predictedScore });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
