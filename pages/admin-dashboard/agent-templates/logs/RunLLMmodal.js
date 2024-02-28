import React from "react";
import Modal from "../../../common-component/Modal";
import useRunLLM from "./hook/useRunLLM";
const RunLLMmodal = ({
  showRunLLMmodal,
  setShowRunLLMmodal,
  logsId,
  slectedProjectId,
  esitmatedTime,
}) => {
  const { onRunLLM, isRunLLmLoading } = useRunLLM({ logsId, slectedProjectId });

  return (
    <Modal
      showModal={showRunLLMmodal}
      closeModal={() => setShowRunLLMmodal(false)}
      modalWidth="w-2/5"
    >
      <div className="flex justify-center -mt-4">
        <h1 className="text-gray-500">Run AutoLLM</h1>
      </div>
      <div className="flex justify-center my-6">
        <img src="/images/runLLM.svg" alt="runLLM" />
      </div>
      <div className="flex justify-center my-4">
        <h1 className="text-gray-500">
          This Will take approximately {esitmatedTime?.estimated_time} min to
          Run
        </h1>
      </div>
      <div className="flex justify-center pb-4">
        <button
          onClick={() => setShowRunLLMmodal(true)}
          className="rounded-3xl mr-4 border px-6 hover:text-white  py-1.5 hover:bg-primary-accent-color text-sm bg-gray-100"
        >
          Cancel
        </button>
        <button
          onClick={onRunLLM}
          disabled={isRunLLmLoading}
          className="rounded-3xl disabled:bg-gray-200 disabled:text-black text-white px-6 py-1.5 hover:bg-button-hover-color text-sm bg-primary-accent-color"
        >
          {isRunLLmLoading ? "Loading..." : "Proceed"}
        </button>
      </div>
    </Modal>
  );
};

export default RunLLMmodal;
