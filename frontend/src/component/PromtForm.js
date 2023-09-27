import React, { useState } from "react";
import {} from "@mui/material";
import { SearchRounded } from "@mui/icons-material";
import PropTypes from "prop-types";
import "./promptForm.css";

const PromptForm = ({
  updateGeneratedStory,
  updatePrompt,
  updateGeneratedStoryId,
}) => {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (response.ok) {
        const data = await response.json();
        const story = data.story;
        const storyId = data.id;
        updateGeneratedStory(story);
        updateGeneratedStoryId(storyId);
      } else {
        console.error("Failed to generate story");
        updateGeneratedStory("Failed to generate story");
      }
    } catch (error) {
      console.error("Error sending prompt:", error);
      updateGeneratedStory("Error sending prompt");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="prompt-form-container">
      <h2 className="text">New Story ??</h2>

      <div className="inputBox">
        <SearchRounded className="searchIcon" />
        <input
          type="text"
          placeholder="Enter a story prompt..."
          value={prompt}
          onChange={(e) => {
            setPrompt(e.target.value);
            updatePrompt(e.target.value);
          }}
        />
      </div>

      <button onClick={handleSubmit} type="submit" className="generate-button">
        {isLoading ? "Generating..." : "Generate Story"}
      </button>
    </div>
  );
};

PromptForm.propTypes = {
  updateGeneratedStory: PropTypes.func.isRequired,
  updatePrompt: PropTypes.func.isRequired, // Add the prop type for updatePrompt
};

export default PromptForm;
