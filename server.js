const express = require("express");
const path = require("path");

// Setting up Express App

const app = express();
const PORT = 3000;

// Setting up the Express app to handle data parsing

app.use(express.urlenconded({ extended: true }));
app.use(express.json());

// Routes ======================================================

app.get("/notes", function(request, response) {
   response.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", function(request, response) {
   response.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/api/notes", function(request, response) {
   return response.json(path.join(__dirname, "./db/db.json"));
});