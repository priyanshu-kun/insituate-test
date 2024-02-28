import React from "react";
import Modal from "../../common-component/Modal";
import useDelete from "./hooks/useDelete";
import { truncateString } from "../../utils/utillityFunction";
const DeleteIdModal = ({
  getEmployees,
  deleteId,
  setDeleteId,
  editProfile = {},
}) => {
  const { id } = editProfile;
  const { isLoading, onDeleteId } = useDelete({
    id,
    getEmployees,
    setDeleteId,
  });
  return (
    <Modal
      closeModal={() => setDeleteId(false)}
      showModal={deleteId}
      modalWidth="w-1/4"
    >
      <div>
        <h1 className="flex flex-col justify-center items-center text-gray-500">
          Are you sure you want delete this id :
          <div className="ml-2 hover:text-primary-accent-color">
            {truncateString(id, 5, 5, 10)} ?
          </div>
        </h1>
        <div className="flex justify-center my-5">
          <button
            onClick={() => setDeleteId(false)}
            className="bg-primary-accent-color  hover:bg-button-hover-color text-white rounded-xl px-4 py-1 mb-4"
          >
            Cancel
          </button>
          <button
            disabled={isLoading}
            onClick={onDeleteId}
            className="bg-red-500 ml-4 disabled:bg-gray-500 hover:bg-red-700 text-white rounded-xl px-4 py-1 mb-4"
          >
            {isLoading ? "Deleting..." : "Yes"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteIdModal;
