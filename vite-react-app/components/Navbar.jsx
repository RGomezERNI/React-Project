// Navbar.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ isAuthenticated, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    onLogout(); // Call the logout function passed as a prop
    navigate("/"); // Redirect to home after logout
  };

  return (
    <nav className="bg-gray-800 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link to="/">QuizApp</Link>
        </div>
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="hover:text-gray-300">
            Home
          </Link>

          {isAuthenticated && (
            <>
              <Link to="/SelectQuiz" className="hover:text-gray-300">
                Quizzes
              </Link>
              <Link to="/YourQuizzes" className="hover:text-gray-300">
                Your Quizzes
              </Link>
              <button onClick={handleLogout} className="hover:text-gray-300">
                Logout
              </button>
            </>
          )}
        </div>
        <button className="md:hidden p-2" onClick={toggleMenu}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>
      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        <ul className="flex flex-col space-y-2 px-4 py-2 bg-gray-700">
          <li>
            <Link to="/" className="block px-2 py-1 hover:bg-gray-600">
              Home
            </Link>
          </li>

          {isAuthenticated && (
            <>
              <li>
                <Link
                  to="/SelectQuiz"
                  className="block px-2 py-1 hover:bg-gray-600"
                >
                  Quizzes
                </Link>
              </li>
              <li>
                <Link
                  to="/YourQuizzes"
                  className="block px-2 py-1 hover:bg-gray-600"
                >
                  Your Quizzes
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="block px-2 py-1 hover:bg-gray-600 w-full text-left"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
