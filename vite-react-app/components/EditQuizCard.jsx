import React from "react";

const EditQuizCard = ({ quiz, onDelete, onEdit }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h2 className="text-lg font-semibold">Question: {quiz.question}</h2>
      <p className="text-gray-700">Answer: {quiz.answer}</p>
      <button
        onClick={() => onDelete(quiz.id)}
        className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Delete
      </button>
      <button
        onClick={() => onEdit(quiz)}
        className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Edit Question
      </button>
    </div>
  );
};

export default EditQuizCard;
