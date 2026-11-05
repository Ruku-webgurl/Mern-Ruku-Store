import { FiX } from "react-icons/fi";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Dialog Card */}
      <div className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-pink-100 shadow-2xl z-10 transform transition-all animate-scale-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-pink-50 hover:bg-pink-100 text-gray-500 hover:text-pink-600 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <FiX size={16} />
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
