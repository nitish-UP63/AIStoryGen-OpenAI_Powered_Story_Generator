import React, { useEffect, useState } from "react";
import "./card.css";
import { Favorite } from "@mui/icons-material";

const Card = ({ generatedStory, prompt, likeCnt, storyId }) => {
  const [likes, setLikes] = useState(likeCnt);
  const [isFavourite, setFavourite] = useState(false);

  useEffect(() => {
    setLikes(likeCnt);
  }, [likeCnt]);

  const handleLike = () => {
    if (isFavourite) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }

    const actionType = isFavourite ? "unlike" : "like";
    // Send a POST request to the server to update the like count
    if (storyId) {
      fetch(`http://localhost:5000/stories/${storyId}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: actionType }),
      })
        .then((response) => {
          if (response.status === 200) {
            console.log("Like updated successfully");
          } else {
            console.error("Failed to update like");
          }
        })
        .catch((error) => {
          console.error("Error updating like:", error);
        });
    }
  };

  
  return (
    <div className="card">
      <h2 className="card-title">STORY</h2>
      <div className="card-content">
        <p className="prompt">{prompt}</p>
        <p className="story-text">{generatedStory}</p>
      </div>
      <div className="like-button">
        <button
          onClick={() => {
            setFavourite(!isFavourite);
            handleLike(); 
          }}
        >
          {likes}{" "}
          <div className={`isFavourite ${isFavourite ? "active" : ""}`}>
            <Favorite />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Card;
