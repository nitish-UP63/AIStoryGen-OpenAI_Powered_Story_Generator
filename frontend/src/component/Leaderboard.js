import React, { useEffect, useState } from "react";
import LeaderboardCard from "./LeaderboardCard";
import "./leaderboard.css";

function Leaderboard({ onCardClick }) {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/getallstories")
      .then((response) => response.json())
      .then((data) => {
        setStories(data); 
      })
      .catch((error) => {
        console.error("Error fetching stories:", error);
      });
  }, []);

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      {stories.map((story, index) => (
        <LeaderboardCard
          key={index}
          story={story}
          onClick={() => onCardClick(story.story, story.prompt,story.likeCount,story._id)}
        />
      ))}
    </div>
  );
}

export default Leaderboard;
