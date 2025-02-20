import React from "react";
import Navbar from "../components/Navbar";
import AddButton from "../components/AddButton";
import { useState, useEffect } from "react";
import AddFormCard from "../components/AddFormCard";
import EditFormCard from "../components/EditFormCard"; // Import the EditFormCard
import { useSelector } from "react-redux";
import QuestionsList from "../components/QuestionsList";
import axios from "axios";

const CustomQuiz = () => {
  const [isCardOpen, setCardOpen] = useState(false);
  const [isEditCardOpen, setEditCardOpen] = useState(false); // State for edit card
  const [mode, setMode] = useState("addQuiz");
  const selectedQuizId = useSelector((state) => state.quiz.selectedQuizId);
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuiz, setCurrentQuiz] = useState(null); // State for current quiz being edited

  const fetchQuizData = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7042/QuizApp/${selectedQuizId}`
      );
      setQuizData(response.data.qandAs);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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

  const openEditQuiz = () => {
    setMode("addQuestion");
    setCardOpen(true);
  };

  const handleDelete = async (quizItemId) => {
    try {
      await axios.delete(`https://localhost:7042/api/QandA/${quizItemId}`);
      console.log(`Delete quiz item with ID: ${quizItemId}`);
      await fetchQuizData();
    } catch (err) {
      console.error("Error deleting quiz item:", err.message);
    }
  };

  const handleEdit = (quiz) => {
    setCurrentQuiz(quiz);
    setEditCardOpen(true);
  };

  const handleUpdate = async (quizItemId, updatedData) => {
    try {
      await axios.patch(
        `https://localhost:7042/api/QandA/${quizItemId}`,
        updatedData
      );
      await fetchQuizData();
    } catch (err) {
      console.error("Error updating quiz item:", err.message);
    }
  };

  return (
    <div>
      <Navbar />
      <AddButton label="Add Questions" onClick={openEditQuiz} />
      <AddFormCard
        isOpen={isCardOpen}
        onClose={() => setCardOpen(false)}
        mode={mode}
        quiz={selectedQuizId}
        onAdd={() => {
          fetchQuizData();
          setCardOpen(false);
        }}
      />
      <EditFormCard
        isOpen={isEditCardOpen}
        onClose={() => setEditCardOpen(false)}
        quiz={currentQuiz}
        onUpdate={handleUpdate}
      />
      <QuestionsList
        qandAs={quizData}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
};

export default CustomQuiz;
