'use client';
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";

const Modal = ({
  showModal,
  modalWidth = "w-1/2",
  modalHeight = "",
  closeModal,
  children,
}) => {
  useEffect(() => {
    if (showModal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [showModal]);

  if (!showModal) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-10000">
      <div
        className={`bg-white ${modalWidth} ${modalHeight} rounded-lg pt-2 px-12 box-border pb-4`}
      >
        <div className="flex justify-end">
          <button onClick={closeModal}>
            <FontAwesomeIcon
              icon={faXmark}
              className="bg-gray-200 rounded-full px-2 py-1.5 -mr-10"
            />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
