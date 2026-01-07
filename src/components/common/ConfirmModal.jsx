import React from "react";
import GenericModal from "./GenericModal";

const ConfirmModal = ({ message, onConfirm, onCancel }) => {
  return (
    <GenericModal onClose={onCancel}>
      <p className="mb-4 text-center">{message}</p>
      <div className="flex justify-center space-x-4">
        <button
          onClick={onConfirm}
          className="bg-red-500 px-4 py-2 text-white rounded"
        >
          Yes
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-400 px-4 py-2 text-white rounded"
        >
          Cancel
        </button>
      </div>
    </GenericModal>
  );
};

export default ConfirmModal;
