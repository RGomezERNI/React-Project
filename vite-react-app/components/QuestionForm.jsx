import React from "react";

const QuestionForm = ({
  questions,
  handleQuestionChange,
  removeQuestion,
  handleAddQuestion,
}) => {
  return (
    <>
      <h2 className="text-xl font-bold mb-4">Edit Quiz</h2>
      <div className="max-h-60 overflow-y-auto mb-4">
        {questions.map((q, index) => (
          <div key={index} className="mb-4 border-b border-gray-300 pb-2">
            <input
              type="text"
              placeholder="Question"
              value={q.question}
              onChange={(e) =>
                handleQuestionChange(index, "question", e.target.value)
              }
              className="border border-gray-300 rounded p-2 mb-2 w-full"
            />
            <input
              type="text"
              placeholder="Answer"
              value={q.answer}
              onChange={(e) =>
                handleQuestionChange(index, "answer", e.target.value)
              }
              className="border border-gray-300 rounded p-2 w-full"
            />
            <button
              type="button"
              onClick={() => removeQuestion(index)}
              className="text-red-500 mt-2"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={handleAddQuestion}
        className="bg-green-500 text-white font-semibold py-2 px-4 rounded shadow hover:bg-green-600 transition duration-200"
        disabled={questions.length >= 10}
      >
        Add More Questions
      </button>
    </>
  );
};

export default QuestionForm;
