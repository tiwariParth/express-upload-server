const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const port = 3000;

// Set up multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Endpoint to handle file upload
app.post("/upload", upload.single("file_chunk"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  res.send(`File uploaded successfully: ${req.file.filename}`);
});

// Start the server
app.listen(port, () => {
  console.log(`Upload server running at http://localhost:${port}`);
});
