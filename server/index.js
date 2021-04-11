const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

/**
 * MongoDB connection info
 * Remember to set the src url
 */
mongoose.connect(process.env.MONGODB_SRC, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Api endpoints

/**
 * User account
 * Create new user - POST "/newUser", req.body.email, req.body.password
 * Login to user - POST "/login", req.body.email, req.body.password
 * Get all shortened urls - GET "/allLinks/:userId"
 */
const account = require("./routes/account.js");
app.use("/api/account", account);

// Redirector
const redirector = require("./routes/redirector.js");
app.use("/api/redirector", redirector);

// To generate new links
const generator = require("./routes/generator.js");
app.use("/api/generator", generator);

// Handle production
if (process.env.NODE_ENV === "production") {
  // Static folder
  app.use(express.static(__dirname + "/public/"));

  // Handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
}

// Server port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
