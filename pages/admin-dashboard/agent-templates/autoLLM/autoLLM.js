import React from "react";
import useGetLLMlogs from "./hook/useGetLLMlogs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { formatDateTime } from "../../../utils/utillityFunction";


const AutoLLM = ({ workspaceId, slectedProjectId, setDrawer, drawer, getTearsheetData  }) => {

  const {
    logsResult,
    isLogsResultLoading,
    onDownLoadFile,
    isFileDownloadLoading,
  } = useGetLLMlogs({
    workspaceId,
    slectedProjectId,
  });


  const { results = [] } = logsResult || {};

  const handleTearSheet = async (payload) => {
    if(!drawer) {
      getTearsheetData(payload)    
    }
    setDrawer(!drawer);
  }

  return (
    <div  className="w-full text-gray-500 ">
        <div className="w-full flex py-3">
          <h1 className="w-1/4 p-1.5"> Serial No.</h1>
          <h1 className="w-1/4 p-1.5">Session Id</h1>
          <h1 className="w-1/4 p-1.5">Created On</h1>
          <h1 className="w-1/4 p-1.5">CSV Result</h1>
        </div>
      <div  className="w-full h-full">
        {results.map((item, index) => {
          const { created_on, results_csv, session_id, download_url } =
            item || {};
          return (
            <div key={session_id} onClick={() => {
              handleTearSheet({
                log_id: null,
                iteration_id: 0,
                version_id: slectedProjectId.version_id,
                session_id,
              })
            }} className="w-full flex border hover:bg-secondary-accent-color cursor-pointer rounded">
              <h1 className="w-1/4 p-1.5">{index + 1}</h1>
              <h1 className="w-1/4 p-1.5">{session_id}</h1>
              <h1 className="w-1/4 p-1.5">
                {created_on === "In Progress"
                  ? created_on
                  : formatDateTime(created_on)}
              </h1>
              <h1 className="w-1/4 p-1.5">
                {results_csv}
                <button
                  className="ms-2"
                  onClick={() => window.open(download_url)}
                  disabled={isFileDownloadLoading}
                >
                  <FontAwesomeIcon icon={faDownload} />
                </button>
              </h1>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AutoLLM;
