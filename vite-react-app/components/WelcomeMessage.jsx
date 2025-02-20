// WelcomeMessage.js
import React from "react";

const WelcomeMessage = ({ username }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Welcome, {username}!</h1>
      <label>Enter subtext...</label>
    </div>
  );
};

export default WelcomeMessage;
