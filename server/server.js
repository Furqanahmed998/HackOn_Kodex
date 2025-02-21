const express = require("express");
const connectDB = require("./db");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Import Routes
const educationRoutes = require("./routes/education");
app.use("/api/education", educationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
//AIzaSyAlu0s17QmFj5VbgSTQcPSAmn2YP8gv_Kw
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyAlu0s17QmFj5VbgSTQcPSAmn2YP8gv_Kw");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
const prompt = "Explain how AI works";
async function result() {
    const result =await  model.generateContent(prompt);
    console.log(result.response.text());

}
// result();