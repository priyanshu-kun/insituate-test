import React, { useState } from "react";
import Modal from "../../common-component/Modal";
import SecondaryHeading from '../../common-component/secondary-heading/SecondaryHeading';

const WorkSpaceModal = ({
  WorkSpaceModal,
  setShowWorkSpaceModal,
  setShowCard,
  workSpaceName,
  setWorkSpaceName,
}) => {
  // const [showCard, setShowCard] = useState(false);

  const onClose = () => {
    setShowWorkSpaceModal(false);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setWorkSpaceName(value);
  };
  const handleSubmit = () => {
    setShowCard(true);
    setShowWorkSpaceModal(false);
  };

  return (
    <Modal closeModal={onClose} showModal={WorkSpaceModal} modalWidth="w-1/3">
      <SecondaryHeading headingContent={"Start Your Work Space"} position="center" />
      <form onSubmit={handleSubmit}>
        <div className="mb-6 mx-10">
          <input
            type="search"
            onChange={handleInputChange}
            required
            value={workSpaceName}
            placeholder="Name of Your Work Space"
            className="w-full p-2 border rounded-xl focus:outline-none focus:border-primary-accent-color"
          />
        </div>
        <div className="flex justify-center">
          <button
            // onClick={() => {
            //   setShowCard(true);
            //   setShowWorkSpaceModal(false);
            // }}
            // disabled={workSpaceName === ""}
            className="bg-primary-accent-color hover:bg-button-hover-color text-white disabled:bg-gray-200 disabled:text-black rounded-2xl px-8 py-2 mb-4"
          >
            Create
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default WorkSpaceModal;
