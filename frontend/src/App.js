import React, { useState } from "react";
import PromptForm from "./component/PromtForm.js";
import Leaderboard from "./component/Leaderboard.js";
import Card from "./component/Card.js";
import Header from "./component/Header.js";
import Footer from "./component/Footer.js";
import "./App.css";

function App() {
  const [generatedStory, setGeneratedStory] = useState("");
  const [prompt, setPrompt] = useState("");
  const [generateId,setGeneratedId] = useState("");

  const [newprompt, setnewprompt] = useState("");
  const [likes , setLikes] = useState(0);
  const [storyId, setStoryId] = useState("");

  // Function to update the prompt
  const updatePrompt = (newPrompt) => {
    setPrompt(newPrompt);
  };

  const updateGeneratedStoryId = (newId) => {
    setGeneratedId(newId);
  }

  // Function to update the generated story
  const updateGeneratedStory = (story) => {
    setGeneratedStory(story);
    setnewprompt(prompt+"....");
    setLikes(0);
    setStoryId(generateId);
  };


  // Function to handle a LeaderboardCard click and update the selected story
  const handleCardClick = (story,prompt,likeCount,_id) => {
    setGeneratedStory(story);
    setnewprompt(prompt+"....");
    setLikes(likeCount);
    setStoryId(_id);
  };

  return (
    <div className="App">
      <div className="header">
        <Header />
      </div>
      <div className="searchBox">
        <PromptForm
          updateGeneratedStory={updateGeneratedStory}
          updatePrompt={updatePrompt}
          updateGeneratedStoryId={updateGeneratedStoryId}
        />
      </div>
      <main className="main-container">
        <div className="leftContainer">
          <Card
            generatedStory={generatedStory}
            prompt={newprompt}
            likeCnt={likes}
            storyId={storyId}
          />
        </div>
        <div className="rightContainer">
          <Leaderboard onCardClick={handleCardClick} />
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
