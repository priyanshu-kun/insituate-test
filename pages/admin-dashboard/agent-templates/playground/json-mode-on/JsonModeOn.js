import React from "react";
import KeyValueQuery from "./KeyValueQuery";

const JsonModeOn = ({
  projectConfig,
  workspaceId,
  slectedProjectId,
  getConfig,
  progress,
  selectedModel,
  projectInfo,
  isToggleOn,
  updatedInstructions,
}) => {
  return (
    <div className="my-2 mx-3">
      <KeyValueQuery
        workspaceId={workspaceId}
        slectedProjectId={slectedProjectId}
        getConfig={getConfig}
        progress={progress}
        selectedModel={selectedModel}
        projectInfo={projectInfo}
        updatedInstructions={updatedInstructions}
        isToggleOn={isToggleOn}
        projectConfig={projectConfig}
      />
    </div>
  );
};

export default JsonModeOn;
