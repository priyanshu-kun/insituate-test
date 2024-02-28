import React from "react";

const Project = ({
  projectInfo = {},
  setProjectInfo = () => {},
  selectedBranchName,
}) => {
  const { project_name, project_desc } = projectInfo;

  const handleProjectInputChange = (e) => {
    const { name, value } = e.target;
    setProjectInfo((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <div className="border py-2 px-4 me-3 rounded-lg">
        <div className="my-2">
          <h1 className="text-gray-500 mb-1 mt-2">Project Name</h1>
          <input
            name="project_name"
            defaultValue={project_name}
            type="text"
            onChange={handleProjectInputChange}
            className="border text-sm text-gray-400 w-full p-2 focus:border-primary-accent-color focus:outline-none rounded-xl"
          />
        </div>
        <div className="my-2">
          <h1 className="text-gray-500 mb-1 mt-4">Version Name</h1>
          <input
            name="project_version"
            defaultValue={selectedBranchName}
            type="text"
            onChange={handleProjectInputChange}
            className="border text-sm text-gray-400 w-full focus:border-primary-accent-color p-2 focus:outline-none rounded-xl"
          />
        </div>
        <div className="my-2">
          <h1 className="text-gray-500 mb-1 mt-4">Project Description</h1>
          <textarea
            name="project_desc"
            defaultValue={project_desc}
            type="text"
            onChange={handleProjectInputChange}
            className="border h-20 text-sm text-gray-400 focus:border-primary-accent-color w-full p-3 focus:outline-none rounded-xl"
          />
        </div>
      </div>
      <em>
        <div className="my-4">
          <h1 className="text-sm text-gray-500 font-semibold mb-2 mt-10">
            Insituate offers four LLMs, each with different cost structures:
          </h1>
          <ul className="list-disc ms-6">
            <li>
              <span className="text-sm text-gray-500 font-semibold">
                IsX-S ($0.69/hour):
              </span>
              <span className="text-sm ms-1 text-gray-400">
                The most budget-friendly option, providing cost-effective
                language model capabilities.
              </span>
            </li>
            <li>
              <span className="text-sm text-gray-500 font-semibold">
                IsX-M ($1.00/hour):
              </span>
              <span className="text-sm ms-1 text-gray-400">
                Balancing cost and performance, suitable for various tasks.
              </span>
            </li>
            <li>
              <span className="text-sm text-gray-500 font-semibold">
                IsX-L ($2.00/hour):
              </span>
              <span className="text-sm ms-1 text-gray-400">
                Offers high performance but at a higher cost.
              </span>
            </li>
            <li>
              <span className="text-sm text-gray-500 font-semibold">
                IsX-U ($4.20/hour):
              </span>
              <span className="text-sm ms-1 text-gray-400">
                The premium choice, providing top-tier performance at a premium
                cost.
              </span>
            </li>
            <li>
              <span className="text-sm text-gray-500 font-semibold">
                IsX-M-128k ($1.20/hour):
              </span>
              <span className="text-sm ms-1 text-gray-400">
                Extended token window for extremely large file uploads and
                queries.
              </span>
            </li>
          </ul>
        </div>
      </em>
    </div>
  );
};

export default Project;
