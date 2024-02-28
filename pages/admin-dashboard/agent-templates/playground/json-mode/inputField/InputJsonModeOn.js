import React, { useContext, useEffect, useState } from "react";
import { AgentTemplateState } from "../../../AgentTemplets";

const InputJsonModeOn = () => {
  const templateState = useContext(AgentTemplateState);
  const {
    keyValuePairs,
    setKeyValuePairs,
    selectedIndices,
    setSelectedIndices,
    input_form = {},
  } = templateState || {};

  const initialOptions = input_form?.fields?.reduce((acc, _, index) => {
    acc[index] = "Text";
    return acc;
  }, {});

  const [selectedOption, setSelectedOption] = useState(initialOptions);

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

  // useEffect(() => {
  //   const transformedArr = input_form?.fields.map((item) => {
  //     if (typeof item === "string") {
  //       return { key: item, value: "" };
  //     } else {
  //       const key = Object.keys(item)[0];
  //       const value = item[key];
  //       return { key, value };
  //     }
  //   });
  //   setKeyValuePairs(transformedArr);
  // }, [input_form?.fields]);

  const handleAddPair = () => {
    setKeyValuePairs([...keyValuePairs, { key: "", value: "" }]);
  };
  const handleCheckboxChange = (index) => {
    const newSelectedIndices = [...selectedIndices];
    if (newSelectedIndices?.includes(index)) {
      const selectedIndex = newSelectedIndices?.indexOf(index);
      newSelectedIndices?.splice(selectedIndex, 1);
    } else {
      newSelectedIndices.push(index);
    }
    setSelectedIndices(newSelectedIndices);
  };

  return (
    <div className="mx-4 text-gray-500">
      <div className="w-full m-1  flex">
        <h1 className="w-1/2">Key</h1>
        <h1 className="w-1/2">Value</h1>
      </div>

      <form>
        <div className="border w-full rounded-xl">
          {keyValuePairs?.map((pair, index) => (
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
                    className="ml-1 px-1 placeholder:text-gray-300 block  w-full mr-2"
                    onChange={(e) => handleChange(index, "key", e)}
                  />
                </div>
                <div>
                  <select
                    name="keyValue"
                    className="text-gray-500 border rounded px-1 text-sm"
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
                    className="ps-1 placeholder:text-gray-300 block w-full"
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
              className="border rounded px-2 my-2 text-xs"
              type="button"
              onClick={handleAddPair}
            >
              Add field
            </button>
          </div>
        </div>
        {/* <div className="flex my-4 justify-center">
          <button
            type="submit"
            disabled={isInferenceLoading}
            className="border text-sm text-gray-500  px-4 p-1 disabled:bg-gray-200 rounded hover:bg-blue-100 hover:text-black"
          >
            {isInferenceLoading ? "Loading..." : "SEND"}
          </button>
        </div> */}
      </form>
    </div>
  );
};

export default InputJsonModeOn;
