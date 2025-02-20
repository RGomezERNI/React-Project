import React from "react";
import Navbar from "../components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Quiz from "../Pages/Quiz";
import Home from "../Pages/Home";
import CustomQuiz from "../Pages/CustomQuiz";
import SelectQuiz from "../Pages/SelectQuiz";
import YourQuizzes from "../Pages/YourQuizzes";
import Register from "../Pages/Register";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignUp" element={<Register />} />
        <Route path="/SelectQuiz" element={<SelectQuiz />} />
        <Route path="/Quiz" element={<Quiz />} />
        <Route path="/EditQuiz" element={<CustomQuiz />} />
        <Route path="/YourQuizzes" element={<YourQuizzes />} />
      </Routes>
    </Router>
  );
};

export default App;
