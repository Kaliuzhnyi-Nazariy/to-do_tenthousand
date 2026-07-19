import React from "react";

const Modal = ({
  children,
  closeModal,
}: {
  children: React.ReactNode;
  closeModal: () => void;
}) => {
  return (
    <div
      className="absolute top-0 left-0 w-full h-screen bg-black/50"
      onClick={closeModal}
    >
      <div
        className="bg-white w-4/5 p-4 rounded-md absolute top-1/2 left-1/2 -translate-1/2 z-2"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
