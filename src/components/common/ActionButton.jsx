import React from "react";

const ActionButton = ({ variant, onClick, children }) => {
  const styles = {
    edit: "bg-yellow-500 hover:bg-yellow-600",
    delete: "bg-red-500 hover:bg-red-600",
  };

  return (
    <button
      onClick={onClick}
      className={`${styles[variant]} px-3 py-1 rounded text-white text-sm transition-colors`}
    >
      {children}
    </button>
  );
};

export default ActionButton;
