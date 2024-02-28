import React, { useContext, useState } from "react";
import { AgentTemplateState } from "../../../AgentTemplets";

const InputJsonModeOff = () => {
  const templateState = useContext(AgentTemplateState);
  const { inputQuery, setInputQuery } = templateState || {};

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

  return (
    <div className="mx-4">
      <div className="flex w-full items-center">
        <textarea
          text="text"
          name="queryText"
          defaultValue={inputQuery.queryText}
          onChange={handleInputChange}
          className="w-5/6 h-24 mr-3 box-border p-2 border focus:outline-none focus:border-primary-accent-color rounded-xl text-sm text-gray-600"
        />

        <div
          className="border  w-2/12 overflow-auto h-24 mt-1 flex flex-col justify-center items-center rounded-xl cursor-pointer relative"
          onClick={() => document.getElementById("fileInput").click()}
        >
          <img
            src="/images/uploadFile.svg"
            alt="upload"
            className="mx-auto mb-2"
          />
          <input
            type="file"
            id="fileInput"
            name="queryFile"
            onChange={handleInputChange}
            className="hidden"
          />
          {inputQuery?.queryFile?.name}
        </div>
      </div>
    </div>
  );
};

export default InputJsonModeOff;
