import React from "react";
import Modal from "../../common-component/Modal";

const CreateProject = ({
  showCreateProject,
  setProjectInfo,
  setShowCreateProject,
  onCreate,
  onCreateLoading,
}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectInfo((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <Modal
        showModal={showCreateProject}
        closeModal={() => setShowCreateProject(false)}
      >
        <div className="flex justify-center text-gray-500 -mt-4">
          <h1>Project Information</h1>
        </div>
        <form onSubmit={(e) => onCreate("skip", e)}>
          <input
            type="text"
            name="projectName"
            onChange={handleInputChange}
            required
            // value={projectInfo.projectName}
            placeholder="Project name"
            className="w-full p-2 border text-gray-500 rounded-xl my-4 focus:outline-none focus:border-primary-accent-color"
          />
          <textarea
            name="projectDesc"
            // value={projectInfo.projectDesc}
            type="text"
            onChange={handleInputChange}
            style={{ fontSize: "14px" }}
            placeholder="Project description..."
            className="w-full h-40 text-gray-500 px-4 py-2 border focus:outline-none focus:border-primary-accent-color rounded-xl"
          />
          <div className="flex justify-center">
            <button
              disabled={onCreateLoading}
              className="border rounded px-4 py-1 bg-primary-accent-color hover:bg-button-hover-color text-white my-2 mt-2 disabled:bg-gray-500 disabled:text-black"
            >
              {onCreateLoading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CreateProject;
