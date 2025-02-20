import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import QuizCard from "../components/QuizCard";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; // Import useDispatch
import { selectQuiz } from "../slices/quizSlice"; // Import the selectQuiz action\
import { logout } from "../slices/authSlice";

const SelectQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const isAuth = localStorage.getItem("isAuthenticated");
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize useDispatch

  const handleButtonClick = (quizId) => {
    dispatch(selectQuiz(quizId)); // Dispatch the action to set the selected quiz ID
    navigate("/Quiz"); // Navigate to the Quiz page
  };

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch("https://localhost:7042/QuizApp"); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch quizzes");
        }
        const data = await response.json();
        setQuizzes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  if (loading) {
    return <p>Loading quizzes...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }
  const handleLogout = () => {
    dispatch(logout());
    navigate("/YourQuizzes");
  };

  return (
    <div>
      <Navbar isAuthenticated={isAuth} onLogout={handleLogout} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 z-50">
        {quizzes.map((quiz) => (
          <QuizCard
            key={quiz.quizId}
            quiz={quiz}
            buttons={[
              {
                label: "Take Quiz",
                onClick: () => handleButtonClick(quiz.quizId),
              },
            ]}
          />
        ))}
      </div>
    </div>
  );
};

export default SelectQuiz;
