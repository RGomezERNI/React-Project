import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const QuizComponent = ({ quizData }) => {
  const { qandAs } = quizData;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0); // Track correct answers
  const navigate = useNavigate(); // Initialize useHistory for navigation

  const handleInputChange = (event) => {
    setUserAnswer(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const currentQuestion = qandAs[currentQuestionIndex];

    // Disable the button immediately upon submission
    setIsButtonDisabled(true);

    if (
      userAnswer.trim().toLowerCase() === currentQuestion.answer.toLowerCase()
    ) {
      setFeedback("Correct!");
      setCorrectAnswersCount((prevCount) => prevCount + 1); // Increment correct answers count
    } else {
      setFeedback(
        `Incorrect! The correct answer is: ${currentQuestion.answer}`
      );
    }

    // Clear the input for the next question
    setUserAnswer("");

    // Move to the next question after a short delay
    setTimeout(() => {
      if (currentQuestionIndex < qandAs.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setFeedback("");
      } else {
        setFeedback("Quiz completed!");
        setIsQuizCompleted(true); // Mark the quiz as completed
      }
      // Re-enable the button after the feedback is shown
      setIsButtonDisabled(false);
    }, 2000);
  };

  const handleQuit = () => {
    navigate("/SelectQuiz"); // Redirect to /SelectQuiz
  };

  const currentQuestion = qandAs[currentQuestionIndex];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full mb-4">
        {currentQuestion ? (
          <div>
            <p className="text-lg font-semibold mb-4">
              {currentQuestion.question}
            </p>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={userAnswer}
                onChange={handleInputChange}
                placeholder="Your answer"
                required
                disabled={isQuizCompleted} // Disable input if quiz is completed
                className={`border border-gray-300 rounded-lg p-2 w-full mb-4 ${
                  isQuizCompleted ? "bg-gray-200" : ""
                }`}
              />
              <button
                type="submit"
                disabled={isButtonDisabled || isQuizCompleted} // Disable button if quiz is completed or waiting for next question
                className={`bg-blue-500 text-white rounded-lg px-4 py-2 w-full hover:bg-blue-600 transition duration-200 ${
                  isButtonDisabled || isQuizCompleted
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                Submit
              </button>
            </form>
            {feedback && <p className="mt-4 text-center">{feedback}</p>}
          </div>
        ) : (
          <p>No questions available.</p>
        )}
      </div>

      {/* Quit Button */}
      <button
        onClick={handleQuit}
        className="bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-600 transition duration-200 mb-4"
      >
        Quit
      </button>

      {/* Popup for Quiz Completion */}
      {isQuizCompleted && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
            <h2 className="text-lg font-semibold mb-4">Quiz Completed!</h2>
            <p className="text-xl font-bold text-center">
              {correctAnswersCount}/{qandAs.length}
            </p>
            <div className="mt-4 flex">
              <button
                onClick={() => navigate("/SelectQuiz")}
                className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition duration-200"
              >
                Select Quiz
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizComponent;
