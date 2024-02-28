import React, { useState } from "react";
import {
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LogAccordion from "./LogAccordion";

function AccordionItem({ list, index }) {
  const [expanded, setExpanded] = useState(true);

  const toggleAccordion = () => {
    setExpanded(!expanded);
  };

  return (
    <div
      key={index}
      className={`bg-white box-border py-4 w-11/12 mb-3 mx-auto rounded-lg border border-solid border-gray-200 shadow-sm ${
        expanded ? "h-auto" : "h-14"
      } overflow-hidden`}
    >
      <p onClick={toggleAccordion} className="text-md ml-4 mb-4 text-gray-500 font-black cursor-pointer">
        Iteration {index}
        <span>
          <FontAwesomeIcon
            icon={faChevronDown}
            className={`ml-2 transition-all ${
              expanded
                ? "transform rotate-0"
                : "transform rotate-180"
            }`}
          />
        </span>
      </p>
      {list.map(
        (
          {
            log_id,
            configs: { instructions },
            evaluator_results: { guideline_vector, relevancy_vector },
            query,
            response_vector: { response },
          },
          index
        ) => {
          return (
            <LogAccordion
            index={index}
              log_id={log_id}
              instructions={instructions}
              guideline_vector={guideline_vector}
              relevancy_vector={relevancy_vector}
              query={query}
              response={response}
            />
          );
        }
      )}
    </div>
  );
}

export default AccordionItem;
