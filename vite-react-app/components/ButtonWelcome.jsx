// Button.js
import React from "react";

const ButtonWelcome = ({ onClick, label }) => {
  return (
    <button
      className="m-2 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 transition duration-300"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default ButtonWelcome;
