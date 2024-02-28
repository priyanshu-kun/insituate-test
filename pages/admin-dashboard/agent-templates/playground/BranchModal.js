import React, { useState } from "react";
import Modal from "../../../common-component/Modal";
import useGetBranch from "./hook/useGetBranch";

const BranchModal = ({
  showBranchModal,
  setShowBranchModal,
  workspaceId,
  slectedProjectId,
  getProject,
  progress,
  selectedModel,
  projectInfo,
  updatedInstructions,
}) => {
  const [branchName, setBranchName] = useState("");

  const {
    project_id = "",
    latest_version = "",
    versions,
    project_name,
  } = slectedProjectId || {};

  const handleInputChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setBranchName(value);
  };
  const { onCreateLoading, onBranchCreate } = useGetBranch({
    workspaceId,
    slectedProjectId,
    branchName,
    progress,
    selectedModel,
    projectInfo,
    getProject,
    setShowBranchModal,
    updatedInstructions,
  });
  return (
    <Modal
      showModal={showBranchModal}
      closeModal={() => setShowBranchModal(false)}
      modalWidth="w-1/4"
    >
      <div className="flex justify-center text-gray-500 ">
        <h1>Enter your branch name</h1>
      </div>
      <form onSubmit={(e) => {
        onBranchCreate(e);
      }}>
        <input
          type="text"
          name="branchName"
          onChange={handleInputChange}
          required
          placeholder="Branch name"
          className="w-full p-2 border text-gray-500 rounded-xl my-4 focus:outline-none focus:border-primary-accent-color"
        />
        <div className="flex justify-center">
          <button
            disabled={onCreateLoading}
            className="border rounded px-4 py-1 bg-primary-accent-color hover:bg-button-hover-color text-white my-2 mt-2 disabled:bg-gray-500 disabled:text-black"
          >
            {onCreateLoading ? "Creating..." : "Branch"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default BranchModal;
