// src/components/common/AddButton.jsx
import React from "react";
import { Plus } from "lucide-react"; // أيقونة + جميلة

const AddButton = ({ onClick, disabled = false, label = "Add" }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="
        flex items-center gap-2
        bg-green-500
        px-3 py-1.5
        text-white text-sm
        rounded-lg
        shadow-sm
        hover:bg-green-600
        hover:shadow-md
        active:scale-95
        disabled:opacity-50
        disabled:cursor-not-allowed
        transition-all
      "
    >
      <Plus size={16} />
      <span>{label}</span>
    </button>
  );
};

export default AddButton;
