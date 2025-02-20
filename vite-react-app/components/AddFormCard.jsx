import React, { useState } from "react";
import QuizForm from "./QuizForm";
import QuestionForm from "./QuestionForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddFormCard = ({ isOpen, onClose, mode, userId, onAdd, quiz }) => {
  const [quizName, setQuizName] = useState("");
  const [quizTopic, setQuizTopic] = useState("");
  const [questions, setQuestions] = useState([{ question: "", answer: "" }]);
  const navigate = useNavigate();

  const payload = questions.map((q) => ({
    quizId: quiz,
    question: q.question,
    answer: q.answer,
  }));

  const handleAddQuestion = () => {
    if (questions.length < 10) {
      setQuestions([...questions, { question: "", answer: "" }]);
    }
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const removeQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const handleSubmit = async () => {
    if (mode === "addQuiz") {
      await axios.post("https://localhost:7042/QuizApp", {
        userId,
        quizName,
        quizTopic,
      });
      resetFields();
      onAdd();
    } else {
      await axios.post("https://localhost:7042/api/QandA", payload);
      resetFields();
      onAdd();
    }
  };

  const resetFields = () => {
    setQuizName("");
    setQuizTopic("");
    setQuestions([{ question: "", answer: "" }]);
  };

  const handleClose = () => {
    resetFields();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        {mode === "addQuiz" && (
          <QuizForm
            quizName={quizName}
            setQuizName={setQuizName}
            quizTopic={quizTopic}
            setQuizTopic={setQuizTopic}
          />
        )}
        {mode === "addQuestion" && (
          <QuestionForm
            questions={questions}
            handleQuestionChange={handleQuestionChange}
            removeQuestion={removeQuestion}
            handleAddQuestion={handleAddQuestion}
          />
        )}
        <div className="flex justify-between mt-4">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded shadow hover:bg-blue-600 transition duration-200"
            disabled={
              mode === "editQuiz" &&
              questions.some((q) => !q.question || !q.answer)
            }
          >
            Add
          </button>
          <button
            onClick={handleClose}
            className="bg-red-500 text-white font-semibold py-2 px-4 rounded shadow hover:bg-red-600 transition duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddFormCard;
