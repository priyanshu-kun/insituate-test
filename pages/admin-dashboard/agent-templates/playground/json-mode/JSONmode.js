import React, { useState } from "react";
import Metadata from "./Metadata";
import useInference from "../../hook/useInference";
import Skeleton from "react-loading-skeleton";

const JSONmode = ({
  workspaceId,
  slectedProjectId,
  getConfig,
  progress,
  selectedModel,
  updatedInstructions,
  projectInfo,
}) => {
  const [inputQuery, setInputQuery] = useState({
    queryText: "",
    queryFile: "",
  });

  const handleInputChange = (e) => {
    const { name, type } = e.target;
    if (type === "file") {
      const file = e.target.files[0];
      if (file) {
        setInputQuery((prev) => ({ ...prev, [name]: file }));
      }
    } else {
      const { value } = e.target;
      setInputQuery((prev) => ({ ...prev, [name]: value }));
    }
  };

  const { queryData, isInferenceLoading, onRunQuery } = useInference({
    inputQuery,
    workspaceId,
    slectedProjectId,
    getConfig,
    progress,
    selectedModel,
    projectInfo,
    updatedInstructions,
  });

  return (
    <div>
      <div className="mx-4">
        <h1 className="text-gray-500 mt-4 mb-1">Query</h1>
        <div className="flex w-full items-center">
          <textarea
            text="text"
            name="queryText"
            defaultValue={inputQuery.queryText}
            onChange={handleInputChange}
            className="w-8/12 h-24 px-2 mr-3 border focus:outline-none focus:border-primary-accent-color rounded-xl"
          />

          <div
            className="border w-4/12 overflow-auto h-24 mt-1 flex flex-col justify-center items-center rounded-xl cursor-pointer relative"
            onClick={() => document.getElementById("fileInput").click()}
          >
            <img
              src="/images/uploadFile.svg"
              alt="upload"
              className="mx-auto mb-2"
            />
            <input
              type="file"
              // id="fileInput"
              name="queryFile"
              // defaultValue={inputQuery.queryFile}
              onChange={handleInputChange}
              // className="hidden"
              multiple
            />
            {/* {inputQuery?.queryFile?.name} */}
          </div>
        </div>

        <div className="flex justify-center my-4">
          <button
            onClick={onRunQuery}
            disabled={isInferenceLoading}
            className="border disabled:bg-gray-200 rounded hover:bg-secondary-accent-color hover:text-black text-gray-500 text-sm p-1 px-4 bg-gray-200"
          >
            {isInferenceLoading ? "Loading..." : "RUN"}
          </button>
        </div>
        <div>
          <h1 className="text-gray-500 mt-2 mb-1">Response</h1>
          {isInferenceLoading ? (
            <Skeleton height={112} />
          ) : (
            <textarea
              readOnly
              defaultValue={queryData?.response}
              className="w-full text-primary-accent-color h-24 px-2 mr-3 border focus:outline-none focus:border-primary-accent-color rounded-xl"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default JSONmode;
