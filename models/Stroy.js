const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
  prompt: {
    type: String,
    required: true,
  },
  story: {
    type: String,
    required: true,
  },
  likeCount: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Story", storySchema);
