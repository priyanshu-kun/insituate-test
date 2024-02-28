import React, { useState } from "react";
import copyTextToClipboard, {
  formatDateTime,
} from "../../../utils/utillityFunction";
import RenderTooltipComponent from "../../../common-component/render-tooltip-component/RenderTooltipComponent";
import { faCheck, faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const SHOW_TOOL_TIP_MAX_LENGTH = 16;

function Card({ api_id, project_name, created_on, version_id, version_name }) {
  const [copy, setCopy] = useState(false);

  const handleCopyClick = (id) => {
    copyTextToClipboard(id);
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 2000)
  };

  return (
    <div className=" p-4 md:max-w-none max-w-80 h-96 rounded-xl relative overflow-hidden border border-solid border-gray-100 shadow-llm_card_shadow flex flex-col justify-between">
      <div className="">
        <h1 className=" font-black text-gray-600 text-xl relative z-20">
          {project_name}
        </h1>
        <svg
          className="absolute transform rotate-140  -top-28  -left-28 opacity-10 block w-96"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className=' fill-primary-accent-color'
            d="M40.4,-25.7C48,-10.1,47,8.2,38.8,26.5C30.6,44.7,15.3,63,0.3,62.8C-14.8,62.7,-29.6,44.1,-39.3,25C-49,5.8,-53.7,-13.9,-46.3,-29.4C-38.9,-44.9,-19.5,-56.1,-1.5,-55.3C16.4,-54.4,32.8,-41.4,40.4,-25.7Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>
      <div>
        <div className="border-b-2 mb-2 text-gray-500 border-solid border-black/10 text-sm flex items-center justify-between">
          <div className="flex">
            <span className="font-black mr-1">API Id:</span>
            <RenderTooltipComponent
              content={api_id}
              maxLength={SHOW_TOOL_TIP_MAX_LENGTH}
              maxWidth={900}
              styles={"opacity-80"}
            />
          </div>
          {!copy ? (
            <FontAwesomeIcon
              onClick={() => {
                handleCopyClick(api_id);
              }}
              icon={faCopy}
              className="mr-2 cursor-pointer"
            />
          ) : (
            <FontAwesomeIcon
              icon={faCheck}
              className="mr-2 cursor-pointer pointer-events-none opacity-60"
            />
          )}
        </div>
        <div className="border-b-2 mb-2 text-gray-500 border-solid border-black/10 text-sm flex items-center">
          <span className="font-black mr-1">Workspace:</span>
          <RenderTooltipComponent
            content={"Health Care"}
            maxLength={SHOW_TOOL_TIP_MAX_LENGTH}
            maxWidth={900}
            styles={"opacity-80"}
          />
        </div>
        <div className="border-b-2 mb-2 text-gray-500 border-solid border-black/10 text-sm flex items-center">
          <span className="font-black mr-1">Version:</span>
          <RenderTooltipComponent
            content={version_name}
            maxLength={SHOW_TOOL_TIP_MAX_LENGTH}
            maxWidth={900}
            styles={"opacity-80"}
          />
        </div>
        <div className="mb-2 text-gray-500 text-sm flex items-center">
          <span className="font-black mr-1">Created on:</span>
          <RenderTooltipComponent
            content={formatDateTime(created_on)}
            maxLength={SHOW_TOOL_TIP_MAX_LENGTH}
            maxWidth={900}
            styles={"opacity-80"}
          />
        </div>
      </div>
    </div>
  );
}

export default Card;
