import React, { useState, useEffect } from "react";

const EditFormCard = ({ isOpen, onClose, quiz, onUpdate }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    if (quiz) {
      setQuestion(quiz.question);
      setAnswer(quiz.answer);
    }
  }, [quiz]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onUpdate(quiz.id, { question, answer });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-lg font-semibold">Edit Quiz</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block">Question:</label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="border rounded w-full p-2"
              required
            />
          </div>
          <div>
            <label className="block">Answer:</label>
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="border rounded w-full p-2"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Update
          </button>
          <button
            type="button"
            onClick={onClose}
            className="mt-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditFormCard;
