import React from "react";

const AdminNavbar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="mt-8 w-full">
      <ul>
        <li
          onClick={() => setActiveTab("work-spaces")}
          className={
            activeTab === "work-spaces"
              ? "w-full cursor-pointer bg-secondary-accent-color text-primary-accent-color py-2 rounded-r-xl px-4"
              : "w-full text-gray-500 cursor-pointer hover:text-primary-accent-color py-2 rounded-r-xl px-4"
          }
        >
          <button>Work Spaces</button>
        </li>
        <hr className="w-11/12"></hr>
        <li
          onClick={() => setActiveTab("llm-studio")}
          className={
            activeTab === "llm-studio"
              ? "w-full cursor-pointer bg-secondary-accent-color text-primary-accent-color py-2 rounded-r-xl px-4"
              : "w-full text-gray-500 cursor-pointer hover:text-primary-accent-color py-2 rounded-r-xl px-4"
          }
        >
          <button>LLM Studio</button>
        </li>
        <hr className="w-11/12"></hr>
        <li
          onClick={() => setActiveTab("employee-id-generator")}
          className={
            activeTab === "employee-id-generator"
              ? "w-full cursor-pointer bg-secondary-accent-color text-primary-accent-color py-2 rounded-r-xl px-4"
              : "w-full text-gray-500 cursor-pointer hover:text-primary-accent-color py-2 rounded-r-xl px-4"
          }
        >
          <button> Employee ID Generator</button>
        </li>
        <hr className="w-11/12"></hr>
        <li
          onClick={() => setActiveTab("organization-settings")}
          className={
            activeTab === "organization-settings"
              ? "w-full cursor-pointer bg-secondary-accent-color text-primary-accent-color py-2 rounded-r-xl px-4"
              : "w-full text-gray-500 cursor-pointer hover:text-primary-accent-color py-2 rounded-r-xl px-4"
          }
        >
          <button> Organization Settings</button>
        </li>
        <hr className="w-11/12"></hr>
        <li
          onClick={() => setActiveTab("ask-support")}
          className={
            activeTab === "ask-support"
              ? "w-full cursor-pointer bg-secondary-accent-color text-primary-accent-color py-2 rounded-r-xl px-4"
              : "w-full text-gray-500 cursor-pointer hover:text-primary-accent-color py-2 rounded-r-xl px-4"
          }
        >
          <button> Ask Support</button>
        </li>
        <hr className="w-11/12"></hr>
        <li
          onClick={() => setActiveTab("handle-user-query")}
          className={
            activeTab === "handle-user-query"
              ? "w-full cursor-pointer bg-secondary-accent-color text-primary-accent-color py-2 rounded-r-xl px-4"
              : "w-full text-gray-500 cursor-pointer hover:text-primary-accent-color py-2 rounded-r-xl px-4"
          }
        >
          <button> Handle User Query</button>
        </li>
        <hr className="w-11/12"></hr>
        <li
          onClick={() => setActiveTab("release-notes")}
          className={
            activeTab === "release-notes"
              ? "w-full cursor-pointer bg-secondary-accent-color text-primary-accent-color py-2 rounded-r-xl px-4"
              : "w-full text-gray-500 cursor-pointer hover:text-primary-accent-color py-2 rounded-r-xl px-4"
          }
        >
          <button>Release Notes</button>
        </li>
      </ul>
    </div>
  );
};

export default AdminNavbar;
