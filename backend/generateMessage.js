const express = require("express");
const router = express.Router();

// Fallback templates
const templates = [
  "Hello {name}, Diwali greetings! Wishing you bright days and many smiles.",
  "Hi {name}, warm wishes for Diwali! Stay happy and safe."
];

router.post("/", (req, res) => {
  const { prompt } = req.body;
  if(!prompt) return res.status(400).json({ error: "Prompt required" });

  // Random template for demo
  const message = templates[Math.floor(Math.random() * templates.length)];
  res.json({ message, tokens: ["{name}"] });
});

module.exports = router;
