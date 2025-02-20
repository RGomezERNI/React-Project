import React from "react";

const QuizForm = ({ quizName, setQuizName, quizTopic, setQuizTopic }) => {
  return (
    <>
      <h2 className="text-xl font-bold mb-4">Add Quiz</h2>
      <input
        type="text"
        placeholder="Quiz Name"
        value={quizName}
        onChange={(e) => setQuizName(e.target.value)}
        className="border border-gray-300 rounded p-2 mb-4 w-full"
      />
      <input
        type="text"
        placeholder="Quiz Topic"
        value={quizTopic}
        onChange={(e) => setQuizTopic(e.target.value)}
        className="border border-gray-300 rounded p-2 mb-4 w-full"
      />
    </>
  );
};

export default QuizForm;
