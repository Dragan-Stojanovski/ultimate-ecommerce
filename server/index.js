const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./src/router"); 

require("dotenv").config();

const app = express();
app.use(express.json());

const port = process.env.PORT || 3001;

// CORS configuration
app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
  credentials: true, 
}));

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};



// Initialize the server
const initializeServer = async () => {
  await connectDB();

  app.use("/", router);
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
};

// Start the server
initializeServer();