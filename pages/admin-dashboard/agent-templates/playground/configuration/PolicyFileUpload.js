import React, { useState } from "react";
import Modal from "../../../../common-component/Modal";

const PolicyFileUpload = ({ showFileUpload, setShowFileUpload }) => {
  const [inputQuery, setInputQuery] = useState({
    queryText: "",
    queryFile: "",
  });

  const handleInputChange = (e) => {
    const { name, type } = e.target;
    if (type === "file") {
      const file = e.target.files[0];
      if (file) {
        setInputQuery((prev) => ({ ...prev, [name]: file.name }));
      }
    } else {
      const { value } = e.target;
      setInputQuery((prev) => ({ ...prev, [name]: value }));
    }
  };
  return (
    <Modal
      showModal={showFileUpload}
      closeModal={() => setShowFileUpload(false)}
      modalWidth="w-1/4"
    >
      <div className="flex justify-center">
        <h1 className="text-gray-500">Upload Your Policy File</h1>
      </div>
      <div className="flex justify-center my-4">
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
            id="fileInput"
            name="queryFile"
            defaultValue={inputQuery.queryFile}
            onChange={handleInputChange}
            className="hidden"
            multiple
          />
        </div>
      </div>
      <div className="flex justify-center">{inputQuery.queryFile}</div>
    </Modal>
  );
};

export default PolicyFileUpload;
