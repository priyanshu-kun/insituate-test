import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import LogsList from "./LogsList";
import useGetLogs from "./hook/useGetLogs";
import RunLLMmodal from "./RunLLMmodal";
import useRunEvals from "./hook/useRunEvals";
import useResultLLMtime from "./hook/useResultLLMtime";
import Loader from "../../../common-component/loader/loader";

const Logs = ({ workspaceId, slectedProjectId }) => {
  const { logs, getLogs } = useGetLogs({ workspaceId, slectedProjectId });
  const [showRunLLMmodal, setShowRunLLMmodal] = useState(false);
  // const [showRunEvalsModal, setShowRunEvalsModal] = useState(false);
  const [logsId, setLogsId] = useState([]);
  const { onRunEvals, isRunEvalLoading } = useRunEvals({
    getLogs,
    logsId,
    slectedProjectId,
  });

  const { onRun, isRunLoading, esitmatedTime } = useResultLLMtime({
    logsId,
    slectedProjectId,
  });

  const handleRun = () => {
    onRun();
    setShowRunLLMmodal(true);
  };

  return (
    <div>
      <div className="flex w-full text-gray-500 items-center">
        <h1>Logs</h1>
        <div className="w-1/2 bg-white">
          <div className="p-3">
            <div className="relative">
              <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none"></div>
              <input
                type="text"
                id="input-group-search"
                className="block w-full px-2 py-1 ps-4 text-sm text-gray-900 border border-gray-300 rounded-3xl bg-gray-50 focus:ring-primary-accent-color focus:border-primary-accent-color"
                placeholder="Search Input and Output"
              />
              <div className="absolute inset-y-0 rtl:inset-r-0 end-0 flex items-center pe-3 pointer-events-none">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </div>
            </div>
          </div>
        </div>
        {/* <button className="flex border items-center px-2 py-0.5 rounded">
          <FontAwesomeIcon icon={faPlus} className="mr-1" /> Filter
        </button> */}
        <button
          onClick={handleRun}
          disabled={isRunLoading}
          className="rounded-3xl text-white px-4 py-1 hover:bg-button-hover-color text-sm bg-primary-accent-color w-28 h-8 flex items-center justify-center"
        >
          {isRunLoading ? <Loader /> : "Run AutoLLM"}
        </button>
        <button
          disabled={isRunEvalLoading}
          onClick={onRunEvals}
          className="rounded-3xl ml-4  disabled:text-black border hover:text-white py-1 hover:bg-button-hover-color text-sm flex items-center justify-center  w-24 h-8"
        >
          {isRunEvalLoading ? <Loader /> : "Run Evals"}
        </button>
      </div>
      <LogsList logs={logs} logsId={logsId} setLogsId={setLogsId} />
      {setShowRunLLMmodal ? (
        <RunLLMmodal
          showRunLLMmodal={showRunLLMmodal}
          setShowRunLLMmodal={setShowRunLLMmodal}
          logsId={logsId}
          slectedProjectId={slectedProjectId}
          esitmatedTime={esitmatedTime}
        />
      ) : null}
    </div>
  );
};

export default Logs;
