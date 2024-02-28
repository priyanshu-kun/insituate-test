import React, { useEffect, useState } from "react";
import useSendInference from "./hook/useSendInference";
import Query from "./Query";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import KeyValueOn from "./KeyValueOn";

const KeyValueQuery = ({
  workspaceId,
  slectedProjectId,
  getConfig,
  progress,
  selectedModel,
  projectInfo,
  updatedInstructions,
  isToggleOn,
  projectConfig,
}) => {
  const { input_form = {}, output_form = {} } = projectConfig || {};
  const { fields = [] } = input_form;
  const { json_mode } = output_form || {};
  const initialOptions = fields?.reduce((acc, _, index) => {
    acc[index] = "Text";
    return acc;
  }, {});

  const [selectedOption, setSelectedOption] = useState(initialOptions);
  const [selectedItems, setSelectedItems] = useState([]);
  const [outputKey, setOutputKey] = useState([]);
  const [outputField, setoutputField] = useState([]);

  const handleSelectChange = (index, value) => {
    setSelectedOption((prevOptions) => ({
      ...prevOptions,
      [index]: value,
    }));
  };

  const handleChange = (index, field, e) => {
    const { type } = e.target;
    const updatedPairs = [...keyValuePairs];
    if (type === "file") {
      const file = e.target.files[0];
      if (file) {
        updatedPairs[index][field] = file;
        setKeyValuePairs(updatedPairs);
      }
    } else {
      const { value } = e.target;
      updatedPairs[index][field] = value;
      setKeyValuePairs(updatedPairs);
    }
  };

  const [isQueryToggleOn, setIsQueryToggleOn] = useState(json_mode);

  useEffect(() => {
    setIsQueryToggleOn(json_mode);
  }, [json_mode]);

  const [keyValuePairs, setKeyValuePairs] = useState([{ key: "", value: "" }]);

  useEffect(() => {
    const transformedArr = fields.map((item) => {
      if (typeof item === "string") {
        return { key: item, value: "" };
      } else {
        const key = Object.keys(item)[0];
        const value = item[key];
        return { key, value };
      }
    });
    setKeyValuePairs(transformedArr);
  }, [fields]);

  const handleAddPair = () => {
    setKeyValuePairs([...keyValuePairs, { key: "", value: "" }]);
  };

  const [selectedIndices, setSelectedIndices] = useState([]);

  const handleCheckboxChange = (index) => {
    const newSelectedIndices = [...selectedIndices];
    if (newSelectedIndices.includes(index)) {
      const selectedIndex = newSelectedIndices.indexOf(index);
      newSelectedIndices.splice(selectedIndex, 1);
    } else {
      newSelectedIndices.push(index);
    }
    setSelectedIndices(newSelectedIndices);
  };

  const { isInferenceLoading, onSendQuery, queryData } = useSendInference({
    workspaceId,
    slectedProjectId,
    getConfig,
    progress,
    selectedModel,
    projectInfo,
    updatedInstructions,
    isToggleOn,
    isQueryToggleOn,
    keyValuePairs,
    selectedIndices,
    selectedItems,
    outputKey,
  });

  return (
    <div className="text-sm text-gray-500">
      <div className="w-full m-1  flex">
        <h1 className="w-1/2">Key</h1>
        <h1 className="w-1/2">Value</h1>
      </div>

      <form onSubmit={onSendQuery}>
        <div className="border w-full rounded-xl">
          {keyValuePairs.map((pair, index) => (
            <div key={index} className="flex w-full border-b last:border-none">
              <div className="w-1/2 border-r p-1.5 px-2.5 flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="border"
                    onChange={() => handleCheckboxChange(index)}
                    checked={selectedIndices.includes(index)}
                  />
                  <input
                    type="text"
                    placeholder="Key"
                    value={pair.key}
                    className="ml-1 px-1 placeholder:text-gray-300"
                    onChange={(e) => handleChange(index, "key", e)}
                  />
                </div>
                <div>
                  <select
                    name="keyValue"
                    className="text-gray-500 border rounded px-1"
                    id={`keyValue-${index}`}
                    value={selectedOption[index]}
                    onChange={(e) => handleSelectChange(index, e.target.value)}
                  >
                    <option key={index} value="File">
                      File
                    </option>
                    <option value="Text">Text</option>
                  </select>
                </div>
              </div>
              <div className="w-1/2 ps-2 pe-6 flex items-center justify-between">
                {selectedOption[index] === "Text" ? (
                  <input
                    type="text"
                    placeholder="Value"
                    value={pair.value}
                    className="ps-1 placeholder:text-gray-300"
                    onChange={(e) => handleChange(index, "value", e)}
                  />
                ) : (
                  <div className="flex items-center w-full justify-between">
                    <div>{pair["value"].name}</div>
                    <div
                      className="flex justify-end"
                      onClick={() =>
                        document.getElementById("fileInput").click()
                      }
                    >
                      <img src="/images/smallFileUpload.svg" alt="fileUpload" />
                      <input
                        type="file"
                        onChange={(e) => handleChange(index, "value", e)}
                        id="fileInput"
                        className="hidden"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div className="flex justify-center">
            <button
              className="border rounded px-2 my-2"
              type="button"
              onClick={handleAddPair}
            >
              Add field
            </button>
          </div>
        </div>
        <div className="flex my-4 justify-center">
          <button
            type="submit"
            disabled={isInferenceLoading}
            className="border text-sm text-gray-500  px-4 p-1 disabled:bg-gray-200 rounded hover:bg-blue-100 hover:text-black"
          >
            {isInferenceLoading ? "Loading..." : "SEND"}
          </button>
        </div>
      </form>

      <div className="mb-4">
        <div className="flex items-center">
          <span className="me-2 text-gray-500">JSON Mode</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              name="isQueryToggle"
              type="checkbox"
              value={isQueryToggleOn}
              checked={isQueryToggleOn}
              className="sr-only peer"
              onChange={() => setIsQueryToggleOn((prev) => !prev)}
            />
            <div className="w-11 h-6 bg-gray-200 dark:peer-focus:ring-primary-accent-color rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-accent-color"></div>
          </label>
        </div>
        {isInferenceLoading ? (
          <Skeleton height={112} />
        ) : (
          <>
            {isQueryToggleOn ? (
              <KeyValueOn
                output_form={output_form}
                queryData={queryData}
                setoutputField={setoutputField}
                outputField={outputField}
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
                outputKey={outputKey}
                setOutputKey={setOutputKey}
              />
            ) : (
              <Query queryData={queryData} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default KeyValueQuery;
