require("dotenv").config();
const cors = require("cors");
const express = require("express");
const OpenAIApi = require("openai");
const mongoose = require("mongoose");
const connectDatabase = require("./dbsetup/database");
const Story = require("./models/Stroy.js");

// Connect to the database
connectDatabase();

const app = express();
app.use(express.json());
app.use(cors());

const openai = new OpenAIApi({
  api_key: process.env.OPENAI_API_KEY,
});

const port = process.env.PORT || 5000;

app.post("/ask", async (req, res) => {
  const prompt = req.body.prompt;

  try {
    if (prompt == null) {
      throw new Error("Uh oh, no prompt was provided");
    }

    const messages = [
      {
        role: "user",
        content: `Write a brief story about ${prompt} (limit: 470 tokens).`,
      },
      // You can add more messages here if needed
    ];
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
      max_tokens: 500,
    });

    const completion = response.choices[0].message.content;

    // Save the prompt, story, and initial like count to the database
    const newStory = new Story({
      prompt,
      story: completion,
      liekCount: 0,
    });
    await newStory.save();

    return res.status(200).json({
      success: true,
      id: newStory._id,
      prompt,
      story: completion,
      likeCount: newStory.likeCount,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "An error occurred while generating and saving the story.",
    });
  }
});

app.get("/getallstories", async (req, res) => {
  try {
    const stories = await Story.find().sort({ likeCount: -1 }); // Fetch stories and sort by likeCount in descending order
    res.status(200).json(stories);
  } catch (error) {
    console.error("Error fetching stories:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/stories/:storyId/like", async (req, res) => {
  const storyId = req.params.storyId;
  const { action } = req.body;

  try {
    // Find the story by its ID in the MongoDB database
    const story = await Story.findById(storyId);

    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    if (action === "like") {
      story.likeCount += 1;
    }else if (action === "unlike") {
      story.likeCount -= 1;
    }

    // Save the updated story to the database
    await story.save();

    return res.status(200).json({ message: "Like updated successfully" });
  } catch (error) {
    console.error("Error updating like:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(port, () => console.log(`Server is running on port ${port}!!`));
