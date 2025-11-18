// backend/models/Performance.js
const mongoose = require("mongoose");

const perfSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  mte: { type: Number, required: true },
  ete: { type: Number, required: true },
  finalScore: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Performance", perfSchema);
