import React from "react";

const GenericModal = ({ children, onClose, title }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg relative overflow-y-auto max-h-[90vh]">
        {/* الهيدر */}
        <div className="flex justify-between items-center border-b px-6 py-4">
          {title && <h2 className="text-lg font-semibold">{title}</h2>}
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 font-bold text-xl"
          >
            ×
          </button>
        </div>

        {/* محتوى المودال */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default GenericModal;
