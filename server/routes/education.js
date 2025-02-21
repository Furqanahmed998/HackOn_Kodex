const express = require("express");
const router = express.Router();
const Education = require("../models/Education");

// 📌 POST: Store user education details
router.post("/submit-education", async (req, res) => {
  try {
    const {
      userId,
      highestQualification,
      university,
      yearOfCompletion,
      skills,
    } = req.body;

    // Validate input
    if (!userId || !highestQualification || !university || !yearOfCompletion) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    // Create new education record
    const education = new Education({
      userId,
      highestQualification,
      university,
      yearOfCompletion,
      skills,
    });

    // Save to MongoDB
    await education.save();

    res
      .status(201)
      .json({ message: "Education details saved successfully!", education });
  } catch (error) {
    res.status(500).json({ error: "Server error, try again!" });
  }
});

module.exports = router;
