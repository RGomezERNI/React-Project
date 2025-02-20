import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import QuizComponent from "../components/Quizcomponent";
import axios from "axios";

const Quiz = () => {
  const selectedQuizId = useSelector((state) => state.quiz.selectedQuizId);
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuizData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://localhost:7042/QuizApp/${selectedQuizId}`
        );
        setQuizData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedQuizId) {
      fetchQuizData();
    }
  }, [selectedQuizId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!quizData) {
    return <p>No quiz data available.</p>;
  }

  return (
    <>
      <Navbar />
      <QuizComponent quizData={quizData} />
    </>
  );
};

export default Quiz;
