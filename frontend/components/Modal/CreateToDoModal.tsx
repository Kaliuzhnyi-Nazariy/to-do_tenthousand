"use client";

import { useState } from "react";
import Modal from "./Modal";
import CreateTodo from "../CreateTodo";

const CreateToDoModal = () => {
  const [modalOpen, setModelOpen] = useState(false);

  const openModal = () => {
    setModelOpen(true);
  };

  const closeModal = () => {
    setModelOpen(false);
  };

  if (!modalOpen) {
    return (
      <button
        type="button"
        onClick={openModal}
        className="bg-primary w-full text-white rounded-md py-1 uppercase font-bold cursor-pointer border border-transparent hover:border-primary hover:bg-white hover:text-primary  focus:border-primary focus:bg-white focus:text-primary  focus:outline-none transition-colors duration-200 mt-2 "
      >
        Create TO-DO
      </button>
    );
  }

  return (
    <Modal closeModal={closeModal}>
      <CreateTodo closeModal={closeModal} />
    </Modal>
  );
};

export default CreateToDoModal;
