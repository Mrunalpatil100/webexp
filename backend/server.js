const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Student = require("./models/Student");

const app = express();

// CORS configuration
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("MERN Backend is Running");
});

// Add student
app.post("/api/students", async (req, res) => {
  try {
    const { username, rollno } = req.body;

    if (!username || !rollno) {
      return res.status(400).json({
        message: "Username and Roll Number are required",
      });
    }

    const student = new Student({
      username,
      rollno,
    });

    await student.save();

    res.status(201).json(student);
  } catch (error) {
    console.error("POST ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// Get all students
app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find();

    res.json(students);
  } catch (error) {
    console.error("GET ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// Render provides the PORT through environment variables
const PORT = process.env.PORT || 5000;

// Connect MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB Connection Error:");
    console.log(error);
  });