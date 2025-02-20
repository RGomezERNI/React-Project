import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import QuizCard from "../components/QuizCard";
import { useNavigate } from "react-router-dom";
import { selectQuiz, deleteQuiz } from "../slices/quizSlice";
import AddButton from "../components/AddButton";
import AddFormCard from "../components/AddFormCard";
import QuizEdit from "../components/QuizEdit";
import { logout } from "../slices/authSlice";

const YourQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isCardOpen, setCardOpen] = useState(false);
  const [mode, setMode] = useState("addQuiz");
  const [isEditFormOpen, setEditFormOpen] = useState(false); // State for edit form
  const [currentQuiz, setCurrentQuiz] = useState(null); // State for current quiz being edited
  const userID = localStorage.getItem("userId");
  const isAuth = localStorage.getItem("isAuthenticated");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchQuizzes = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://localhost:7042/api/User/${userID}`);
      if (!response.ok) {
        throw new Error("Failed to fetch quizzes");
      }
      const data = await response.json();
      setQuizzes(data.quizInfoDTOs);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = async (quizId, actionType) => {
    if (actionType === "delete") {
      if (window.confirm("Are you sure you want to delete this quiz?")) {
        await dispatch(deleteQuiz(quizId));
        await fetchQuizzes();
      }
    } else if (actionType === "addQandA") {
      dispatch(selectQuiz(quizId));
      navigate(`/EditQuiz`);
    } else if (actionType === "edit") {
      const quizToEdit = quizzes.find((quiz) => quiz.quizId === quizId);
      setCurrentQuiz(quizToEdit);
      setEditFormOpen(true);
    }
  };

  const openAddQuiz = () => {
    setMode("addQuiz");
    setCardOpen(true);
  };

  const handleUpdate = async (quizId, updatedData) => {
    try {
      console.log(JSON.stringify(updatedData));
      const response = await fetch(`https://localhost:7042/QuizApp/${quizId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) {
        throw new Error("Failed to update quiz");
      }
      await fetchQuizzes();
    } catch (err) {
      console.error("Error updating quiz:", err.message);
    }
  };

  const cardButtons = [
    {
      label: "Delete",
      onClick: (quizId) => handleButtonClick(quizId, "delete"),
    },
    {
      label: "Add or Delete Questions",
      onClick: (quizId) => handleButtonClick(quizId, "addQandA"),
    },
    {
      label: "Edit Quiz",
      onClick: (quizId) => handleButtonClick(quizId, "edit"),
    },
  ];

  useEffect(() => {
    if (userID) {
      fetchQuizzes();
    }
  }, [userID]);

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
            buttons={cardButtons.map((button) => ({
              ...button,
              onClick: () => button.onClick(quiz.quizId),
            }))}
          />
        ))}
      </div>
      <AddButton label="Add Quizzes" onClick={openAddQuiz} />
      <AddFormCard
        isOpen={isCardOpen}
        onClose={() => {
          setCardOpen(false);
          fetchQuizzes();
        }}
        mode={mode}
        userId={userID}
        onAdd={() => {
          fetchQuizzes();
          setCardOpen(false);
        }}
      />
      <QuizEdit
        isOpen={isEditFormOpen}
        onClose={() => setEditFormOpen(false)}
        quiz={currentQuiz}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default YourQuizzes;
