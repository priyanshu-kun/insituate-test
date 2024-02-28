import React, { useEffect, useState, useRef } from "react";
import Builder from "./Builder";
import Project from "./Project";
import Configuration from "./configuration/Configuration";
import useSaveProject from "../hook/useSaveProject";
import BranchModal from "./BranchModal";
import ExportAPI from "./ExportAPI";
import useGetExportAPIdata from "./hook/useGetExportAPIdata";
import {
  faFileExport,
  faSave,
  faCodeBranch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tooltip from "../../../common-component/render-custom-tooltip-component-for-icon/Tooltip";
import SelectWrapper from '../../../common-component/select/Select';

const Playground = ({
  projectConfig = {},
  slectedProjectId = {},
  selectedBranchName,
  workspaceId,
  selectedModel,
  setSelectedModel = () => {},
  getConfig = () => {},
  progress,
  setProgress = () => {},
  updatedInstructions,
  setUpdatedInstructions = () => {},
  projectInfo,
  setProjectInfo = () => {},
  getProject,
  names,
  defaultOption
}) => {
  const [activeSubTab, setActiveSubTab] = useState("builder");
  const [showBranchModal, setShowBranchModal] = useState(false);
  const [exportAPImodal, setExportAPImodal] = useState(false);
  const [advancedRag, setAdvancedRag] = useState("");
  const [nameOptions, setNameOptions] = useState([]);

  const { isSaveLoading, onSaveProject } = useSaveProject({
    slectedProjectId,
    projectConfig,
    progress,
    selectedModel,
    projectInfo,
    updatedInstructions,
    getConfig,
    workspaceId,
    advancedRag,
  });

  useEffect(() => {
    onSaveProject();
  }, [selectedModel])

  useEffect(() => {
    setNameOptions(
      names?.folders?.map((name) => {
        return {
          value: name,
          label: name,
        };
      })
    );
  }, [names]);

  const handleSetAdvancedRag = (name) => {
    setAdvancedRag(name);
  };

  const handleSelectChange = (option) => {
    setSelectedModel(option.value);
  };
  const [messageList, setMessageList] = useState([]);

  const {
    getExportAPIdata,
    isExportAPIloading,
    exportAPIdata,
    getHyperparamSuggestion,
    hyperparamSuggestionData,
  } = useGetExportAPIdata({ workspaceId, slectedProjectId, setExportAPImodal });

  return (
    <div className="w-full">
      <div className="flex items-center justify-between border-b">
        <div className=" w-fit ">
          <SelectWrapper
            onSelect={handleSelectChange}
            options={nameOptions}
            defaultOption={defaultOption}
          />
        </div>
        <div className="mb-2" >
          <Tooltip
            icon={
              <button
                onClick={() => {
                  getExportAPIdata();
                }}
                disabled={isExportAPIloading}
                className="border mr-3 disabled:bg-gray-200 disabled:text-black hover:bg-primary-accent-color hover:text-white text-sm rounded text-gray-500 py-1 px-2"
              >
                {isExportAPIloading ? (
                  "Loading..."
                ) : (
                  <FontAwesomeIcon icon={faFileExport} />
                )}
              </button>
            }
            tooltipText="Export Code"
          />
          <Tooltip
            icon={
              <button
                onClick={() => {
                  onSaveProject();
                  getProject(workspaceId);
                }}
                disabled={isSaveLoading}
                className="border mr-3 disabled:bg-gray-200 disabled:text-black hover:bg-primary-accent-color hover:text-white text-sm rounded text-gray-500 py-1 px-2"
              >
                {isSaveLoading ? (
                  "Loading..."
                ) : (
                  <FontAwesomeIcon icon={faSave} />
                )}
              </button>
            }
            tooltipText="Save Project"
          />

          <Tooltip
            isOverflowing={true}
            icon={
              <button
                className="border mr-3 disabled:bg-gray-200 disabled:text-black hover:bg-primary-accent-color hover:text-white text-sm rounded text-gray-500 py-1 px-2"
                onClick={() => setShowBranchModal(true)}
              >
                <FontAwesomeIcon icon={faCodeBranch} />
              </button>
            }
            tooltipText="Branch new version"
          />
        </div>
      </div>
      <div className="flex my-4 justify-between items-center">
        <button
          onClick={() => setActiveSubTab("builder")}
          className={
            activeSubTab === "builder"
              ? "flex items-center border-b border-solid border-gray-200  rounded-tl-md rounded-tr-md p-1 px-3 bg-secondary-accent-color text-sm text-primary-accent-color"
              : "flex items-center border-b border-solid border-gray-200 rounded-tl-md rounded-tr-md  bg-white px-3 p-1 text-sm text-primary-accent-color"
          }
        >
          <img src="/images/builder.svg" alt="builder" className="mr-2" />
          Builder
        </button>
        <button
          onClick={() => setActiveSubTab("project")}
          className={
            activeSubTab === "project"
              ? "flex items-center border-b border-solid border-gray-200 rounded-tl-md rounded-tr-md p-1 px-3 bg-secondary-accent-color text-sm text-primary-accent-color"
              : "flex items-center border-b border-solid border-gray-200 rounded-tl-md rounded-tr-md bg-white px-3 p-1 text-sm text-primary-accent-color"
          }
        >
          Project
        </button>
        <button
          onClick={() => {
            setActiveSubTab("configuration");
            getHyperparamSuggestion();
          }}
          className={
            activeSubTab === "configuration"
              ? "flex items-center border-b border-solid border-gray-200 rounded-tl-md rounded-tr-md mr-3 p-1 px-3 bg-secondary-accent-color text-sm text-primary-accent-color"
              : "flex items-center border-b border-solid border-gray-200 rounded-tl-md rounded-tr-md mr-3 bg-white px-3 p-1 text-sm text-primary-accent-color"
          }
        >
          Configuration
        </button>
      </div>

      {activeSubTab === "builder" && (
        <Builder
          projectConfig={projectConfig}
          workspaceId={workspaceId}
          slectedProjectId={slectedProjectId}
          messageList={messageList}
          setMessageList={setMessageList}
          getConfig={getConfig}
          handleSetAdvancedRag={handleSetAdvancedRag}
        />
      )}
      {activeSubTab === "project" && (
        <Project
          projectInfo={projectInfo}
          setProjectInfo={setProjectInfo}
          selectedBranchName={selectedBranchName}
        />
      )}
      {activeSubTab === "configuration" && (
        <Configuration
          projectConfig={projectConfig}
          progress={progress}
          setProgress={setProgress}
          workspaceId={workspaceId}
          slectedProjectId={slectedProjectId}
          updatedInstructions={updatedInstructions}
          setUpdatedInstructions={setUpdatedInstructions}
          hyperparamSuggestionData={hyperparamSuggestionData}
        />
      )}
      {showBranchModal && (
        <BranchModal
          showBranchModal={showBranchModal}
          setShowBranchModal={setShowBranchModal}
          workspaceId={workspaceId}
          slectedProjectId={slectedProjectId}
          progress={progress}
          selectedModel={selectedModel}
          projectInfo={projectInfo}
          updatedInstructions={updatedInstructions}
          getProject={getProject}
        />
      )}
      {exportAPImodal && (
        <ExportAPI
          exportAPImodal={exportAPImodal}
          setExportAPImodal={setExportAPImodal}
          exportAPIdata={exportAPIdata}
        />
      )}
    </div>
  );
};

export default Playground;
