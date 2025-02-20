import React, { useState, useEffect } from "react";

const QuizEdit = ({ isOpen, onClose, quiz, onUpdate }) => {
  const [quizName, setQuizName] = useState("");
  const [quizTopic, setQuizTopic] = useState("");

  useEffect(() => {
    if (quiz) {
      setQuizName(quiz.quizName);
      setQuizTopic(quiz.quizTopic);
    }
  }, [quiz]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onUpdate(quiz.quizId, { quizName, quizTopic });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-lg font-semibold">Edit Quiz</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block">Quiz Name:</label>
            <input
              type="text"
              value={quizName}
              onChange={(e) => setQuizName(e.target.value)}
              className="border rounded w-full p-2"
              required
            />
          </div>
          <div>
            <label className="block">Quiz Topic:</label>
            <input
              type="text"
              value={quizTopic}
              onChange={(e) => setQuizTopic(e.target.value)}
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

export default QuizEdit;
