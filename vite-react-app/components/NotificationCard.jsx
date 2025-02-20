import React from "react";

const NotificationCard = ({ message, onClose, type }) => {
  const isError = type === "error";
  const isSuccess = type === "success";

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose} />

      {/* Notification Card */}
      <div
        className={`bg-white rounded-lg shadow-lg p-6 z-10 ${
          isError
            ? "border border-red-400"
            : isSuccess
            ? "border border-green-400"
            : ""
        }`}
      >
        <div
          className={`flex items-center mb-4 ${
            isError ? "text-red-700" : isSuccess ? "text-green-700" : ""
          }`}
        >
          <strong className="font-bold">
            {isError ? "Error!" : isSuccess ? "Success!" : ""}
          </strong>
          <span className="ml-2">{message}</span>
        </div>
        <button
          onClick={onClose}
          className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default NotificationCard;
