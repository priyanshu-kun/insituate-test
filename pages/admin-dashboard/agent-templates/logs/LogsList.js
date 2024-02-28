import React from "react";
import RenderTooltipComponent from "../../../common-component/render-tooltip-component/RenderTooltipComponent";
const SHOW_TOOLTIP_MAX_LENGTH = 8;

const LogsList = ({ logs = [], logsId, setLogsId }) => {
  const handleCheckboxChange = (log_id) => {
    setLogsId((prevSelected) => {
      if (prevSelected.includes(log_id)) {
        return prevSelected.filter((id) => id !== log_id);
      } else {
        return [...prevSelected, log_id];
      }
    });
  };
  return (
    <div className="w-full my-4 py-2 pe-4 text-gray-500">
      <div className="w-full border rounded">
        <div className="w-full flex border-b">
          <h1 className="w-12 p-1.5"></h1>
          <h1 className="w-1/12 p-1.5">Query</h1>
          <h1 className="w-1/12 p-1.5">Files</h1>
          <h1 className="w-1/6 p-1.5">Response</h1>
          <h1 className="w-1/6 p-1.5">Environment</h1>
          <h1 className="w-1/6 p-1.5">Faithfulness</h1>
          <h1 className="w-1/6 p-1.5">Relevancy</h1>
          <h1 className="w-1/6 p-1.5">Guidelines</h1>
        </div>
        {logs.map((item) => {
          const {
            log_id,
            files,
            environment,
            query,
            response_vector = {},
            evaluator_results = {},
          } = item || {};
          const { response = "" } = response_vector;
          const { guideline_vector, faithfulness, relevancy_vector } =
            evaluator_results || {};

          return (
            <div key={log_id} className="w-full flex border-b">
              <h1 className="w-12 p-1.5 flex justify-center">
                <input
                  type="checkbox"
                  className="w-5 h-5"
                  onChange={() => handleCheckboxChange(log_id)}
                  checked={logsId?.includes(log_id)}
                />
              </h1>
              <h1 className="w-1/12 p-1.5">
                <RenderTooltipComponent
                  content={query}
                  maxLength={SHOW_TOOLTIP_MAX_LENGTH}
                  maxWidth={900}
                />
              </h1>
              <h1 className="w-1/12 p-1.5">{files}</h1>
              <h1 className="w-1/6 p-1.5">
                <RenderTooltipComponent
                  content={response}
                  maxLength={SHOW_TOOLTIP_MAX_LENGTH}
                  maxWidth={900}
                />
              </h1>
              <h1 className="w-1/6 p-1.5">{environment || "--"}</h1>
              <h1 className="w-1/6 p-1.5">
                <RenderTooltipComponent
                  content={faithfulness?.feedback}
                  maxLength={24}
                  maxWidth={500}
                />
              </h1>
              <h1 className="w-1/6 p-1.5">
                <RenderTooltipComponent
                  content={relevancy_vector?.feedback}
                  maxLength={20}
                  maxWidth={500}
                />
              </h1>
              <h1 className="w-1/6 p-1.5">
                <RenderTooltipComponent
                  content={guideline_vector?.feedback}
                  maxLength={20}
                  maxWidth={500}
                />
              </h1>
              {/* <h1 className="w-12 p-1.5 flex justify-center">
                <img src="/images/threedot.svg" alt="setting" />
              </h1> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LogsList;
