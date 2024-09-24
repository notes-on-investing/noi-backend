// Use ES module import syntax
import dotenv from "dotenv";
// Configure dotenv
dotenv.config();
import express from "express";
import cors from "cors";
import pkg from "pg";
// const { Pool } = require("pg");
const { Pool } = pkg; // Correctly extract Pool from the imported pg package

// const express = require("express");
const app = express();

// Your middleware and other route handlers

// Start the server
const port = process.env.PORT || 5001;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

// Log a message when the connection pool is created
pool.on("connect", () => {
  console.log("Connected to the PostgreSQL database.");
});

// Route handler for GET /
app.get("/", (req, res) => {
  res.send("Welcome to the NOI Backend!");
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
});

app.get("/records", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM stock_prices_main");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// // Destructure the Pool class from the imported package
// const { Pool } = pkg; // Correctly extract Pool from the imported pg package

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json()); // req.body

// // Set up PostgreSQL connection pool
// const pool = new Pool({
//   user: process.env.PG_USER,
//   host: process.env.PG_HOST,
//   database: process.env.PG_DATABASE,
//   password: process.env.PG_PASSWORD,
//   port: parseInt(process.env.PG_PORT, 10),
// });

// // Your routes and other configurations go here

// // Example route to test the database connection
// app.get("/", (req, res) => {
//   res.send("Welcome to the NOI Backend!");
// });

// app.get("/test", (req, res) => {
//   res.send("<h1>It's working 🤗</h1>");
// });

// app.get("/api/test2", async (req, res) => {
//   try {
//     const result = await pool.query("SELECT * FROM stock_prices_main");
//     res.json(result.rows);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

// app.get("/health", (req, res) => {
//   res.status(200).send("OK");
// });

// // Start the server
// const port = process.env.PORT || 5001;
// app.listen(port, "0.0.0.0", () => {
//   console.log(`Server is running on port ${port}`);
// });
