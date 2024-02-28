import React, { useState } from "react";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function LogAccordion({
  log_id,
  instructions,
  guideline_vector,
  relevancy_vector,
  query,
  response,
  index,
}) {
  const [logExpanded, setLogExpanded] = useState(false);

  const toggleAccordion = () => {
    setLogExpanded(!logExpanded);
  };

  return (
    <div
      onClick={toggleAccordion}
      key={index}
      className={`ml-8 border-box rounded-xl w-4/5 bg-white border border-solid border-gray-200 mb-2 hover:bg-blue-50 cursor-pointer py-4 overflow-hidden ${logExpanded ? 'h-auto': 'h-20'} `}
    >
      <div className="text-sm pb-2 pl-6 text-gray-600 flex justify-between items-center w-full">
        <div className="flex flex-col justify-between items-start">
          <span className="text-lg font-bold text-primary-accent-color mb-1">Query</span>
          <span className="text-gray-500">{query}</span>
        </div>
        <span className="mr-6">
          <FontAwesomeIcon icon={faChevronRight} 
            className={`ml-2 transition-all ${
              logExpanded
                ? "transform rotate-90"
                : "transform rotate-0"
            }`}
           />
        </span>
      </div>
      <div className="text-sm pt-2 pb-2 pl-6 text-gray-600 w-full">
        <p className=" text-lg font-bold text-primary-accent-color mb-1">Instructions</p>
        <span className="text-gray-500">{instructions}</span>
      </div>
      <div className="text-sm pt-2 pb-2 pl-6 text-gray-600 w-full">
        <p className=" text-lg font-bold text-primary-accent-color mb-1">Response Vector</p>
        <span className="text-gray-500">{response}</span>
      </div>
      <div className="text-sm pt-2 pb-2 pl-6 text-gray-600 w-full">
        <p className=" text-lg font-bold text-primary-accent-color mb-1">
          Guideline Vector
        </p>
        <span className="text-gray-500">{guideline_vector.feedback}</span>
      </div>
      <div className="text-sm pt-2 pl-6 text-gray-600 w-full">
        <p className=" text-lg font-bold text-primary-accent-color mb-1">
          Relevancy Vector
        </p>
        <span className="text-gray-500">{relevancy_vector.feedback}</span>
      </div>
    </div>
  );
}

export default LogAccordion;
