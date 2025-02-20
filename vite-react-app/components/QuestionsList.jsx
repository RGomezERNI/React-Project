import React from "react";
import EditQuizCard from "./EditQuizCard";

const QuestionsList = ({ qandAs, onDelete, onEdit }) => {
  return (
    <div>
      {qandAs.map((quiz) => (
        <EditQuizCard
          key={quiz.id}
          quiz={quiz}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default QuestionsList;
