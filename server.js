require("dotenv").config();
const cors = require('cors');
const express = require("express");

const OpenAIApi  = require('openai');
const app = express();
app.use(express.json());
app.use(cors());

const openai = new OpenAIApi({
  api_key: process.env.OPENAI_API_KEY
});

const port = process.env.PORT || 5000;

app.post("/ask", async (req, res) => {
  const prompt = req.body.prompt;

  try {
    if (prompt == null) {
      throw new Error("Uh oh, no prompt was provided");
    }

    const messages = [
      { role: "user", content: `Come up with a astory about ${prompt} (Word limit:less than 400 words).` },
      // You can add more messages here if needed
    ];
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
      max_tokens: 500,
    });

    const completion = response.choices[0].message.content;

    return res.status(200).json({
      success: true,
      message: completion,
    });
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(port, () => console.log(`Server is running on port ${port}!!`));