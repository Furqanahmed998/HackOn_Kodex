
const mongoose = require("mongoose");

const EducationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    highestQualification: { type: String, required: true },
    university: { type: String, required: true },
    yearOfCompletion: { type: Number, required: true },
    skills: { type: [String], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Education", EducationSchema);
