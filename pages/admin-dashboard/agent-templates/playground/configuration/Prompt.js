import React, { useState } from "react";
import {
  faAngleDown,
  faAngleUp,
  faCaretDown,
  faCaretUp,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import copyTextToClipboard from "../../../../utils/utillityFunction";

const Prompt = ({ prompt_list }) => {
  const [showMore, setShowMore] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const [isCopied, setIsCopied] = useState(null);

  return (
    <div className="bg-white shadow rounded-lg me-3 p-2">
      <div className="flex mb-2 justify-between">
        <h1 className="text-gray-500">Prompts </h1>
        <button
          onClick={() => setCollapse((prev) => !prev)}
          className="border px-2 rounded cursor-pointer bg-primary-accent-color text-white hover:bg-button-hover-color"
        >
          {collapse ? (
            <FontAwesomeIcon icon={faCaretDown} />
          ) : (
            <FontAwesomeIcon icon={faCaretUp} />
          )}
        </button>
      </div>
      <div className="border rounded text-sm text-gray-500">
        <div className="flex  border-b">
          <div className="border-r p-1 w-1/12">Score</div>
          <div className="m-auto">
            <h1>Prompts</h1>
          </div>
        </div>
        {prompt_list.map((item) => {
          const { score, content, s_no } = item || {};
          return (
            <div
              className={
                collapse ? "hidden" : "flex relative cursor-pointer border-b"
              }
            >
              <div className="border-r px-5 py-2 w-1/12 flex justify-center">
                {score}
              </div>
              <div
                className={
                  isCopied === s_no
                    ? "flex w-9/12 items-center justify-between"
                    : "flex w-10/12 items-center justify-between"
                }
              >
                {showMore === s_no ? (
                  <span className="ms-2 my-2 text-justify">{content}</span>
                ) : (
                  <span className="ms-2">
                    {`${content.substring(0, 64)}...`}
                  </span>
                )}
              </div>
              <div className="flex right-0 absolute mt-2 ms-4">
                <button
                  onClick={() =>
                    copyTextToClipboard(content, setIsCopied, s_no)
                  }
                  className="me-2 hover:text-primary-accent-color"
                >
                  {isCopied === s_no ? (
                    <span className="text-green-500">Copied </span>
                  ) : (
                    <FontAwesomeIcon icon={faCopy} />
                  )}
                </button>
                <button
                  onClick={() => setShowMore(showMore === s_no ? null : s_no)}
                  className="me-2 hover:text-primary-accent-color"
                >
                  <FontAwesomeIcon
                    icon={showMore === s_no ? faAngleUp : faAngleDown}
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Prompt;
