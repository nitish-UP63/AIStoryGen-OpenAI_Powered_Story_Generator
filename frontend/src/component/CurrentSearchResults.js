import React, { useState } from 'react';

const CurrentSearchResults = () => {
  const [currentStory, setCurrentStory] = useState({ text: 'Current Story', likes: 0 });

  const handleLikeClick = () => {
    setCurrentStory({ ...currentStory, likes: currentStory.likes + 1 });
  };

  return (
    <div>
      <h2>Current Search Results</h2>
      <p>{currentStory.text} - Likes: {currentStory.likes} <button onClick={handleLikeClick}>Like</button></p>
    </div>
  );
};

export default CurrentSearchResults;
