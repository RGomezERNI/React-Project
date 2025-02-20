import React from "react";

const AddButton = ({ label, onClick }) => {
  return (
    <div className=" py-4">
      <button
        className=" fixed bottom-0 left-0 right-0 flex justify-center bg-blue-500 text-white font-semibold py-2 px-4 rounded shadow-lg hover:bg-blue-600 transition duration-200"
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  );
};

export default AddButton;
