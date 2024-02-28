// /get_model_names
import React, { createContext, useEffect, useState, useRef } from "react";
import AgentTemplateHeader from "./AgentTemplateHeader";
import TemplateSideBar from "./TemplateSideBar";
import Playground from "./playground/Playground";
import JSONmode from "./playground/json-mode/JSONmode";
import JsonModeOn from "./playground/json-mode-on/JsonModeOn";
import Logs from "./logs/Logs";
import Knowledge from "./knowledge/Knowledge";
import HandleUserQuery from "../handle-user-query/HandleUserQuery";
import { useRouter } from "next/router";
import useGetProjectConfig from "./hook/useGetProjectConfig";
import useGetAgentTemplate from "./hook/useGetAgentTemplate";
import useGetAllWorkSpaces from "../work-spaces/hooks/useGetAllWorkSpaces";
import AutoLLM from "./autoLLM/autoLLM";
import CardTemplates from "./CardTemplates";
import Metadata from "./playground/json-mode/Metadata";
import useGetTearsheetData from "./autoLLM/hook/useGetTearsheetData";
import AccordionItem from "./autoLLM/AccordionItem";
import ExportedAPIS from "./ExportedAPIS/ExportedAPIS";
import InputJsonModeOn from "./playground/json-mode/inputField/InputJsonModeOn";
import InputJsonModeOff from "./playground/json-mode/inputField/InputJsonModeOff";
import ResponseJsonModeOn from "./playground/json-mode/responseField/ResponseJsonModeOn";
import ResponseJsonModeOff from "./playground/json-mode/responseField/ResponseJsonModeOff";
import useInference from "./hook/useInference";
import useSendInference from "./playground/json-mode-on/hook/useSendInference";
import WindowResizer from "./WindowResizer";
import useGetModelNames from './hook/useGetModelNames';

export const AgentTemplateState = createContext();

const AgentTemplets = () => {
  const router = useRouter();
  const centerRef = useRef(null);
  const lastRef = useRef(null);
  const [tempCache, setTempCache] = useState(false);
  const handleTempCache = (cache) => {
    setTempCache(cache)
  }

  const workspaceId = router?.query?.activeId;

  const {names, isLoadingNames} = useGetModelNames();

  const {
    tearsheetData = [],
    isTearsheetDataLoading,
    getTearsheetData,
  } = useGetTearsheetData();


  const { workSpaceData, isWorkSpaceLoading } = useGetAllWorkSpaces();

  const { projects = [], getProject } = useGetAgentTemplate();

  useEffect(() => {
      getProject(workspaceId);
  }, [workspaceId])

  const {
    project_id = "",
    latest_version = "",
    versions,
    project_name,
  } = projects?.[projects.length - 1] || {};

  const [slectedProjectId, setSelectedProjectId] = useState({
    project_id: project_id,
    version_id: latest_version,
    versions: versions,
    project_name: project_name,
  });

  useEffect(() => {
    setSelectedProjectId({ 
      project_id: project_id,
      version_id: latest_version,
      versions: versions,
      project_name: project_name,
    });
  }, [project_id, latest_version, versions, project_name]);

  const [activeSidebar, setActiveSidebar] = useState("Playground");

  const [selectedBranchName, setSelectedBranchName] = useState("");
  const [showTemplateCard, setShowTemplateCard] = useState(false);
  const [drawer, setDrawer] = useState(false);

  useEffect(() => {
    setSelectedBranchName(versions?.[0]?.branch_name);
  }, [versions]);

  const { projectConfig, getConfig = () => {} } = useGetProjectConfig({
    workspaceId,
    slectedProjectId,
  });


  const {
    hyperparams = {},
    project_name: projectName,
    project_desc,
    model_name,
    instructions,
  } = projectConfig;
  const { max_new_tokens, repetition_penalty, temp, top_k, top_p } =
    hyperparams;

  const [progress, setProgress] = useState({
    max_new_tokens: 2048,
    repetition_penalty: 0.5,
    temp: 0.5,
    top_k: 0.5,
    top_p: 0.5,
  });
  const [updatedInstructions, setUpdatedInstructions] = useState(instructions);
  const [projectInfo, setProjectInfo] = useState({
    project_name: projectName,
    project_desc: project_desc,
    project_version: slectedProjectId?.version_id,
  });

  const [selectedModel, setSelectedModel] = useState(() => model_name);

  useEffect(() => {
    setUpdatedInstructions(instructions);
  }, [instructions]);

  useEffect(() => {
    setProgress({
      max_new_tokens: max_new_tokens || 2048,
      repetition_penalty: repetition_penalty || 0.5,
      temp: temp || 0.5,
      top_k: top_k || 0.5,
      top_p: top_p || 0.5,
    });
  }, [max_new_tokens, repetition_penalty, temp, top_k, top_p]);

  useEffect(() => {
    setProjectInfo({
      project_name: project_name,
      project_desc: project_desc,
      project_version: slectedProjectId?.version_id,
    });
  }, [project_name, project_desc, slectedProjectId?.version_id]);

  const { input_form = {}, output_form = {} } = projectConfig || {};
  const { json_mode } = input_form || {};
  const [isToggleOn, setIsToggleOn] = useState(false);
  const [isInputToggleOn, setIsInputToggle] = useState(false);
  const [isResponseToggleOn, setIsResponseToggleOn] = useState(false);

  useEffect(() => {
    setIsToggleOn(json_mode);
    setIsInputToggle(input_form?.json_mode);
  }, [json_mode, input_form?.json_mode]);

  useEffect(() => {
    setIsResponseToggleOn(output_form?.json_mode);
  }, [output_form?.json_mode]);

  const [keyValuePairs, setKeyValuePairs] = useState([{ key: "", value: "" }]);
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [outputKey, setOutputKey] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [inputQuery, setInputQuery] = useState({
    queryText: "",
    queryFile: "",
  });

  useEffect(() => {
    const transformedArr = input_form?.fields?.map((item) => {
      if (typeof item === "string") {
        return { key: item, value: "" };
      } else {
        const key = Object.keys(item)[0];
        const value = item[key];
        return { key, value };
      }
    });
    setKeyValuePairs(transformedArr);
  }, [input_form?.fields]);

  useEffect(() => {
    setOutputKey(output_form?.fields);
  }, [output_form?.fields]);

  const { queryData, isInferenceLoading, onSendQuery } = useSendInference({
    workspaceId,
    slectedProjectId,
    getConfig,
    progress,
    selectedModel,
    projectInfo,
    updatedInstructions,
    isResponseToggleOn,
    isInputToggleOn,
    keyValuePairs,
    selectedIndices,
    selectedItems,
    outputKey,
    inputQuery,
    cached: tempCache
  });


 useEffect(() => {
    setSelectedModel(model_name);
  }, [model_name]);

  return (
    <AgentTemplateState.Provider
      value={{
        keyValuePairs,
        setKeyValuePairs,
        selectedIndices,
        setSelectedIndices,
        input_form,
        output_form,
        outputKey,
        setOutputKey,
        selectedItems,
        setSelectedItems,
        queryData,
        inputQuery,
        setInputQuery,
      }}
    >
      <div className="w-full relative">
        <div className="w-full z-40 fixed">
          <AgentTemplateHeader
            projects={projects}
            workspaceId={workspaceId}
            workSpaceData={workSpaceData}
            isWorkSpaceLoading={isWorkSpaceLoading}
            setSelectedProjectId={setSelectedProjectId}
            slectedProjectId={slectedProjectId}
            setSelectedBranchName={setSelectedBranchName}
            setShowTemplateCard={setShowTemplateCard}
          />
        </div>
        <div className="flex w-full">
          <div className=" w-80 pr-6 mt-8">
            <TemplateSideBar
              activeSidebar={activeSidebar}
              setActiveSidebar={setActiveSidebar}
            />
          </div>

          {activeSidebar === "Playground" && (
            <>
              {showTemplateCard ? (
                <div className="w-5/6 ml-auto border-l mt-24">
                  <CardTemplates
                    setShowTemplateCard={setShowTemplateCard}
                    workspaceId={workspaceId}
                    getConfig={getConfig}
                    setSelectedProjectId={setSelectedProjectId}
                    getProject={getProject}
                  />
                </div>
              ) : (
                <div className="flex w-full h-full ">
                  <div
                    ref={centerRef}
                    className="custom-height w-2/5 overflow-y-auto mt-12 py-8 border-r ml-auto flex-1 box-border"
                  >
                    <Playground
                      projectConfig={projectConfig}
                      slectedProjectId={slectedProjectId}
                      selectedBranchName={selectedBranchName}
                      workspaceId={workspaceId}
                      getConfig={getConfig}
                      selectedModel={selectedModel}
                      setSelectedModel={setSelectedModel}
                      progress={progress}
                      setProgress={setProgress}
                      updatedInstructions={updatedInstructions}
                      setUpdatedInstructions={setUpdatedInstructions}
                      projectInfo={projectInfo}
                      setProjectInfo={setProjectInfo}
                      getProject={getProject}
                      names={names}
                      defaultOption={{label: model_name, value: model_name}}
                    />
                  </div>

                  <WindowResizer
                    centerRef={centerRef}
                    lastRef={lastRef}
                    isInputToggleOn={isInputToggleOn}
                    setIsInputToggle={setIsInputToggle}
                    InputJsonModeOn={InputJsonModeOn}
                    InputJsonModeOff={InputJsonModeOff}
                    onSendQuery={onSendQuery}
                    isInferenceLoading={isInferenceLoading}
                    isResponseToggleOn={isResponseToggleOn}
                    setIsResponseToggleOn={setIsResponseToggleOn}
                    ResponseJsonModeOn={ResponseJsonModeOn}
                    ResponseJsonModeOff={ResponseJsonModeOff}
                    queryData={queryData}
                    Metadata={Metadata}
                    projectConfig={projectConfig}
                    handleTempCache={handleTempCache}
                  />
                </div>
              )}
            </>
          )}

          {activeSidebar === "Logs" && (
            // <div className="flex w-full">
            <div className="w-5/6 pt-14 my-14 ml-auto">
              <Logs
                workspaceId={workspaceId}
                slectedProjectId={slectedProjectId}
              />
            </div>
            // </div>
          )}
          {activeSidebar === "Knowledge" && (
            <div className="w-5/6 pt-14 my-14 ml-auto">
              <Knowledge
                slectedProjectId={slectedProjectId}
                workspaceId={workspaceId}
              />
            </div>
          )}
          {activeSidebar === "AutoLLM" && (
            <div className="w-5/6 h-screen ml-auto flex pt-12">
              <div className="h-full w-full overflow-y-auto pb-4 box-border">
                <AutoLLM
                  workspaceId={workspaceId}
                  slectedProjectId={slectedProjectId}
                  setDrawer={setDrawer}
                  drawer={drawer}
                  getTearsheetData={getTearsheetData}
                />
              </div>
              <div
                className={`${
                  drawer ? "w-3/4" : "w-0 overflow-x-hidden"
                } border-l-4 border-solid border-gray-200 bg-gray-100 transition-all duration-300 overflow-x-hidden py-6`}
              >
                {isTearsheetDataLoading
                  ? "Loading..."
                  : tearsheetData?.logs?.map((list, index) => {
                      return <AccordionItem list={list} index={index} />;
                    })}
              </div>
            </div>
          )}
          {activeSidebar === "Fine-tuning" && (
            <div className="w-5/6 pt-14 my-14 ml-auto">
              <HandleUserQuery />
            </div>
          )}
          {activeSidebar === "Evaluations" && (
            <div className="w-5/6 pt-14 my-14 ml-auto">
              <HandleUserQuery />
            </div>
          )}
          {activeSidebar === "Settings" && (
            <div className="w-5/6 pt-14 my-14 ml-auto">
              <HandleUserQuery />
            </div>
          )}
          {activeSidebar === "exportedAPIS" && (
            <div className="w-5/6 pt-14 my-14 ml-auto">
              <h1 className="ml-8 mb-6 text-xl text-gray-500">
                Exported APIs
              </h1>
              <ExportedAPIS />
            </div>
          )}
        </div>
      </div>
    </AgentTemplateState.Provider>
  );
};

export default AgentTemplets;

