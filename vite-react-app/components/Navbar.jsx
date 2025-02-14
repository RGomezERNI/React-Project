// Navbar.js
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/SignUp">About</Link>
        </li>
        <li>
          <Link to="/SelectQuiz">Services</Link>
        </li>
        <li>
          <Link to="/Quiz">Contact</Link>
        </li>
        <li>
          <Link to="/EditQuiz">Contact</Link>
        </li>
        <li>
          <Link to="/YourQuizzes">Contact</Link>
        </li>
        <li>
          <Link to="/QuizResult">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
