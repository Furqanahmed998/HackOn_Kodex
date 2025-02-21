const express = require("express");
const connectDB = require("./db");
const cors = require("cors");
require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyAlu0s17QmFj5VbgSTQcPSAmn2YP8gv_Kw");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();
app.get("/api/quiz/data", (req, res) => {
  // New route!
  // Fetch or generate your quiz data here
//   const quizData = {
 
    //   };
    console.log("in the api/quiz/data");
//   res.json(quizData);
});
// Import Routes
const educationRoutes = require("./routes/education");
app.use("/api/education", educationRoutes);
app.post("/api/gemini/courseInfo", async (req, res) => {
  let { formData } = req.body;
  console.log(formData);
  const prompt = "Explain how AI works";

  await result(
    formData.topics,
    formData.currentProficiency,
    formData.desiredLearningLevel,
    res
  );

  res.status(200).json({
    message: "Education details saved successfully!",
  });
});

// Create HTTP server and attach Socket.IO with path /api/quiz
const server = http.createServer(app);
const io = new Server(server, {
  path: "/api/quiz",
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A client connected to quiz socket");

  socket.on("quizAnswer", async (data) => {
    console.log("Received quiz answer:", data.answer);
    try {
      // Construct a prompt for Gemini based on the quiz answer received
      const prompt = `Provide an evaluation and feedback for the following quiz answer: "${data.answer}"`;
      const result = await model.generateContent(prompt);
      const feedback = result.response.text();
      socket.emit("quizResponse", { feedback });
    } catch (error) {
      console.error("Error processing quiz answer:", error);
      socket.emit("quizResponse", { error: "Failed to process quiz answer" });
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected from quiz socket");
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

async function result(topic, knowledge, desiredLearning, res) {
  let prompt = `act as the chatbot. as i asked in the prompt
Predefined AI Learning Assistant Prompt for Adaptive Teaching

The user wants to learn about: ${topic}
The user has rated their current knowledge of this topic as:${knowledge}
The user’s desired learning level is: ${desiredLearning}

Instructions for AI:

1. Define Scope of Learning:
Based on the user’s desired learning level:

Divide the topic into X chapters for Beginner level, Y chapters for Intermediate level, and Z chapters for Advanced level.
Each chapter should cover a specific concept or sub-topic needed to achieve the desired level.
Keep the chapters concise and manageable for easier tracking.
Present an outline of the chapters at the start to show the user the full roadmap (e.g., "Chapter 1: Basics, Chapter 2: Syntax, Chapter 3: Applications").
For Example:
Beginner Level (3 chapters): Introduction, Basics, Applications
Intermediate Level (5 chapters): Basics, Intermediate Concepts, Examples, Exercises, Applications
Advanced Level (7 chapters): Advanced Theory, Deep Concepts, Exercises, Real-world Applications, and so on.

2. Knowledge Assessment Quiz:
Start with a 5-question quiz based on the user’s self-rated knowledge level:
If the level is Beginner, ask basic-level questions.
If the level is Intermediate, ask moderately challenging questions.
If the level is Advanced, ask complex, in-depth questions.
Use this quiz to confirm the user’s current knowledge level and adjust the teaching plan if needed.
3. Teaching Phase:
Teach the topic step-by-step based on the confirmed level, aligned with the chapter structure:
Use examples, analogies, and small exercises to explain each concept.
Incorporate interactive learning methods, such as completing code snippets, answering fill-in-the-blank questions, or solving real-world examples.
After completing each chapter, update the user on their progress (e.g., "You’ve completed Chapter 1. Progress: 20%").
4. Learning Check (Quiz After Each Chapter):
Conduct a 3-5 question quiz after each chapter to evaluate the user’s understanding of the key concepts just taught.
Questions should focus on the core points of the chapter.
If the user struggles with answers, provide:
Immediate feedback to clarify mistakes.
Reteaching using alternative methods (e.g., diagrams, simpler explanations, or additional examples).
A follow-up quiz to confirm understanding before moving forward.
5. Adaptive Feedback:
If answers are correct: Congratulate the user and proceed to the next chapter.
If answers are incorrect or partially correct:
Provide immediate feedback, clarifying mistakes.
Reteach the chapter using simpler explanations or additional examples.
Reevaluate understanding with a new quiz.
6. Progression:
Move sequentially through the chapters, increasing complexity as the user demonstrates mastery.
Regularly summarize and review past chapters to reinforce learning.
Show progress updates after each chapter (e.g., "You’ve completed 50% of the Beginner course").
7. Universal Adaptability:
This structure should dynamically adjust to all educational topics, allowing the AI to tailor content, quizzes, and chapters based on the user’s responses, progress, and desired learning level.`;

  const result = await model.generateContent(prompt);
  console.log(result.response.text());
}
