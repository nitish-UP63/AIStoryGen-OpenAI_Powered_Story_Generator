import React from "react";
import "./leaderboardCard.css";
import { Favorite } from "@mui/icons-material";

function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + " ...";
  }
  return text;
}

function LeaderboardCard({ story, onClick }) {
  const truncatedStory = truncateText(story.story, 125);

  return (
    <div className="leaderboardCard" onClick={() => onClick(story)}>
      <h3>{story.prompt}...</h3>
      <p>{truncatedStory}</p>
      <div className="likeButton1">
        {story.likeCount}
        <Favorite className=" favoriteIcon" />
      </div>
    </div>
  );
}

export default LeaderboardCard;
