import React, { use } from "react";
import Navbar from "../components/Navbar";
import Loginform from "../components/Loginform";
import WelcomeMessage from "../components/WelcomeMessage";
import ButtonWelcome from "../components/buttonwelcome";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logout } from "../slices/authSlice";
const Home = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("username");
  const isAuth = localStorage.getItem("isAuthenticated");
  const dispatch = useDispatch();

  const handleButtonPlay = () => {
    navigate("/SelectQuiz");
  };

  const handleButtonYourQuizzes = () => {
    navigate("/YourQuizzes");
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/YourQuizzes");
  };
  return (
    <div>
      <Navbar isAuthenticated={isAuth} onLogout={handleLogout} />
      {isAuth ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <WelcomeMessage username={user} />{" "}
          <div className="flex">
            <ButtonWelcome
              onClick={() => handleButtonYourQuizzes()}
              label="Your Quizzes"
            />
            <ButtonWelcome onClick={() => handleButtonPlay()} label="Play" />
          </div>
        </div>
      ) : (
        <Loginform />
      )}
    </div>
  );
};

export default Home;
