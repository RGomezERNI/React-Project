import React from "react";
import { Link } from "react-router-dom";
import ButtonWelcome from "./buttonwelcome";

const QuizCard = ({ quiz, buttons }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 ">
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{quiz.quizName}</h3>
        <p className="text-gray-700 mb-2">Topic: {quiz.quizTopic}</p>
        {buttons.map((button, index) => (
          <ButtonWelcome
            key={index}
            label={button.label}
            onClick={button.onClick}
          />
        ))}
      </div>
    </div>
  );
};

export default QuizCard;
