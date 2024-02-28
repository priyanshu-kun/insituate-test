import React from "react";

const TemplateSideBar = ({ activeSidebar, setActiveSidebar }) => {
  return (
    <div className="mt-8 w-full">
      <div className="flex items-center px-4">
        <img src="/images/template.svg" alt="template" />
        <h1 className="my-4 ml-3 text-gray-500">Agent Templates</h1>
      </div>
      <ul>
        <li
          onClick={() => setActiveSidebar("Playground")}
          className={
            activeSidebar === "Playground"
              ? "w-full cursor-pointer bg-secondary-accent-color text-primary-accent-color py-2 rounded-r-xl px-4"
              : "w-full text-gray-500 cursor-pointer hover:text-primary-accent-color py-2 rounded-r-xl px-4"
          }
        >
          <button className="flex items-center">
            <img
              src="/images/playground.svg"
              alt="playground"
              className="mr-3"
            />
            Playground
          </button>
        </li>
        <hr className="w-11/12"></hr>
        <li
          onClick={() => setActiveSidebar("Logs")}
          className={
            activeSidebar === "Logs"
              ? "w-full cursor-pointer bg-secondary-accent-color text-primary-accent-color py-2 rounded-r-xl px-4"
              : "w-full text-gray-500 cursor-pointer hover:text-primary-accent-color py-2 rounded-r-xl px-4"
          }
        >
          <button className="flex items-center">
            <img src="/images/logs.svg" alt="logs" className="mr-3" /> Logs
          </button>
        </li>
        <hr className="w-11/12"></hr>
        <li
          onClick={() => setActiveSidebar("Knowledge")}
          className={
            activeSidebar === "Knowledge"
              ? "w-full cursor-pointer bg-secondary-accent-color text-primary-accent-color py-2 rounded-r-xl px-4"
              : "w-full text-gray-500 cursor-pointer hover:text-primary-accent-color py-2 rounded-r-xl px-4"
          }
        >
          <button className="flex items-center">
            <img src="/images/dataset.svg" alt="logs" className="mr-3" />
            Knowledge
          </button>
        </li>
        <hr className="w-11/12"></hr>
        <li
          onClick={() => setActiveSidebar("AutoLLM")}
          className={
            activeSidebar === "AutoLLM"
              ? "w-full cursor-pointer bg-secondary-accent-color text-primary-accent-color py-2 rounded-r-xl px-4"
              : "w-full text-gray-500 cursor-pointer hover:text-primary-accent-color py-2 rounded-r-xl px-4"
          }
        >
          <button className="flex items-center">
            <img src="/images/experiments.svg" alt="logs" className="mr-3" />{" "}
            Auto LLM
          </button>
        </li>
        <hr className="w-11/12"></hr>
        <li
          onClick={() => setActiveSidebar("Fine-tuning")}
          className={
            activeSidebar === "Fine-tuning"
              ? "w-full cursor-pointer bg-secondary-accent-color text-primary-accent-color py-2 rounded-r-xl px-4"
              : "w-full text-gray-500 cursor-pointer hover:text-primary-accent-color py-2 rounded-r-xl px-4"
          }
        >
          <button className="flex items-center">
            <img src="/images/fineTuning.svg" alt="logs" className="mr-3" />{" "}
            Fine-tuning
          </button>
        </li>
        <hr className="w-11/12"></hr>
        <li
          onClick={() => setActiveSidebar("Evaluations")}
          className={
            activeSidebar === "Evaluations"
              ? "w-full cursor-pointer bg-secondary-accent-color text-primary-accent-color py-2 rounded-r-xl px-4"
              : "w-full text-gray-500 cursor-pointer hover:text-primary-accent-color py-2 rounded-r-xl px-4"
          }
        >
          <button className="flex items-center">
            <img src="/images/evalution.svg" alt="logs" className="mr-3" />{" "}
            Evaluations
          </button>
        </li>
        <hr className="w-11/12"></hr>
        <li
          onClick={() => setActiveSidebar("exportedAPIS")}
          className={
            activeSidebar === "exportedAPIS"
              ? "w-full cursor-pointer bg-secondary-accent-color text-primary-accent-color py-2 rounded-r-xl px-4"
              : "w-full text-gray-500 cursor-pointer hover:text-primary-accent-color py-2 rounded-r-xl px-4"
          }
        >
          <button className="flex items-center">
            <img src="/images/uploadFile.svg" alt="logs" className="mr-3  w-4" />{" "}
            Exported APIs
          </button>
        </li>
        <hr className="w-11/12"></hr>
        <li
          onClick={() => setActiveSidebar("Settings")}
          className={
            activeSidebar === "Settings"
              ? "w-full cursor-pointer bg-secondary-accent-color text-primary-accent-color py-2 rounded-r-xl px-4"
              : "w-full text-gray-500 cursor-pointer hover:text-primary-accent-color py-2 rounded-r-xl px-4"
          }
        >
          <button className="flex items-center">
            <img src="/images/setting.svg" alt="logs" className="mr-3" />{" "}
            Settings
          </button>
        </li>
      </ul>
    </div>
  );
};

export default TemplateSideBar;
