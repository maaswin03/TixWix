require("dotenv").config();

const express = require("express");
const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const cors = require("cors");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const app = express();
const port = 5100;

app.use(cors());
app.use(express.json());

app.post("/chatbot", async (req, res) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = req.body.prompt;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    console.log(text);
    res.json({ text });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
});

app.post("/recommend", async (req, res) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
        Recommend events around the India
      `;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();

      console.log(text);
      res.json({ text });
    } catch (error) {
      res
        .status(500)
        .json({
          message: "An error occurred while generating content",
          error: error.message,
        });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
});

const PORT = process.env.PORT || 5100;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
