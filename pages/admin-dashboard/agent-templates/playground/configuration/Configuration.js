import React, { useState } from "react";
import Prompt from "./Prompt";
import Hyperparam from "./Hyperparam";
import useEnhance from "../../hook/useEnhance";
import PolicyFileUpload from "./PolicyFileUpload";

const Configuration = ({
  projectConfig = {},
  progress,
  setProgress = () => {},
  workspaceId,
  slectedProjectId,
  updatedInstructions,
  setUpdatedInstructions,
  hyperparamSuggestionData,
}) => {
  const { instructions } = projectConfig || {};
  const [showPrompt, setShowPrompt] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);

  console.log("hyperparamSuggestionData: ", hyperparamSuggestionData);

  const { promptList, isPromptLoading, handleEnhance } = useEnhance({
    workspaceId,
    slectedProjectId,
    setShowPrompt,
  });
  const { prompt_list = [] } = promptList || {};

  const handleInstructionsChange = (e) => {
    const value = e.target.value;
    setUpdatedInstructions(value);
  };

  return (
    <div>
      <div className="flex items-center">
        <h1 className="text-gray-500  mb-2">Model Instructions</h1>
        <button
          onClick={() => setShowFileUpload(true)}
          className="border text-sm mb-2 px-3 ml-4 py-1 rounded-md text-white bg-primary-accent-color hover:bg-button-hover-color"
        >
          Embed Policy
        </button>
      </div>
      <div className="my-1 me-3">
        <textarea
          defaultValue={
            updatedInstructions === "" ? instructions : updatedInstructions
          }
          type="text"
          onChange={handleInstructionsChange}
          style={{ fontSize: "14px" }}
          className="w-full h-40 text-gray-500 px-4 py-2 border focus:outline-none focus:border-primary-accent-color rounded-xl"
        />
      </div>
      <div className="flex my-3 justify-center">
        <button
          onClick={handleEnhance}
          disabled={isPromptLoading}
          className="border hover:text-primary-accent-color  rounded-lg disabled:bg-gray-100 disabled:text-gray-400 text-gray-500 px-12 py-1"
        >
          {isPromptLoading ? "Loading..." : "Enhance"}
        </button>
      </div>
      {showPrompt ? <Prompt prompt_list={prompt_list} /> : null}
      <div className="my-6 me-3">
        <Hyperparam
          progress={progress}
          setProgress={setProgress}
          hyperparamSuggestionData={hyperparamSuggestionData}
        />
      </div>
      {showFileUpload ? (
        <PolicyFileUpload
          showFileUpload={showFileUpload}
          setShowFileUpload={setShowFileUpload}
        />
      ) : null}
    </div>
  );
};

export default Configuration;
