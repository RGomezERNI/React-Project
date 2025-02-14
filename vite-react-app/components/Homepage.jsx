import React from "react";
import { useNavigate } from "react-router-dom";
import button from "./button";

const Homepage = () => {
  const navigate = useNavigate();

  const goToSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="mt-4 text-center">
      <span className="text-sm">Don't have an account? </span>
      <button className="text-blue-500 hover:underline">Register</button>
    </div>
  );
};

export default Homepage;
