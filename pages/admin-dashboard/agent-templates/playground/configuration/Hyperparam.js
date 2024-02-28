import {
  faCircleInfo,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Tooltip from "../../../../common-component/Tooltip/Tooltip";

const Hyperparam = ({
  progress,
  hyperparamSuggestionData,
  setProgress = () => {},
}) => {
  const { max_new_tokens, repetition_penalty, temp, top_p, top_k } = progress;
  const handleProgressChange = (e) => {
    const { name, value } = e.target;
    setProgress((prev) => ({ ...prev, [name]: value }));
  };

  const { message = {} } = hyperparamSuggestionData || {};
  const {
    info,
    max_new_tokens: maxNewTokens,
    repetition_penalty: repetitionPenality,
    temp: temperature,
    top_p: topP,
    top_k: topK,
  } = message || {};

  return (
    <div>
      <div className="text-gray-500 text-sm mt-4">
        <div className="flex items-center">
          <h1 className="text-gray-500 text-sm mr-2">Hyperparams</h1>
          <Tooltip content={info} maxWidth={600}>
            <FontAwesomeIcon icon={faCircleInfo} color="rgb(37 99 235)" />
          </Tooltip>
        </div>

        <div className="border my-2 px-4 p-2 rounded-xl">
          <div>
            <div className="flex justify-between">
              <h1>Max new Token</h1>
              <div className="flex items-center">
                {maxNewTokens?.warning === null ||
                maxNewTokens === "" ? null : (
                  <Tooltip content={maxNewTokens?.warning}>
                    <FontAwesomeIcon
                      icon={faExclamationTriangle}
                      className="mr-2"
                      color="#fad102"
                    />
                  </Tooltip>
                )}
                <div className="border px-4 rounded">{max_new_tokens}</div>
              </div>
            </div>
            <div className="flex my-2 items-center">
              <input
                name="max_new_tokens"
                type="range"
                min="0"
                max="4096"
                defaultValue={max_new_tokens}
                onChange={handleProgressChange}
                className="w-full cursor-pointer bg-gray-200 rounded-full"
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between">
              <h1>Temperature</h1>
              <div className="flex items-center">
                {temperature?.warning === null ||
                temperature?.warning === "" ? null : (
                  <Tooltip content={temperature?.warning}>
                    <FontAwesomeIcon
                      className="mr-2"
                      icon={faExclamationTriangle}
                      color="#fad102"
                    />
                  </Tooltip>
                )}
                <div className="border px-4 rounded">{temp}</div>
              </div>
            </div>
            <div className="flex my-2 items-center">
              <input
                name="temp"
                type="range"
                min="0"
                max="1"
                step="0.01"
                defaultValue={temp}
                onChange={handleProgressChange}
                className="w-full cursor-pointer bg-gray-200 rounded-full"
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between">
              <h1>Top P</h1>
              <div className="flex items-center">
                {topP?.warning === null || topP?.warning === "" ? null : (
                  <Tooltip content={topP?.warning}>
                    <FontAwesomeIcon
                      className="mr-2"
                      icon={faExclamationTriangle}
                      color="#fad102"
                    />
                  </Tooltip>
                )}
                <div className="border px-4 rounded">{top_p}</div>
              </div>
            </div>
            <div className="flex my-2 items-center">
              <input
                type="range"
                name="top_p"
                min="0"
                max="1"
                step="0.01"
                defaultValue={top_p}
                onChange={handleProgressChange}
                className="w-full cursor-pointer bg-gray-200 rounded-full"
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between">
              <h1>Top k</h1>
              <div className="flex items-center">
                {topK?.warning === null || topK?.warning === "" ? null : (
                  <Tooltip content={topK?.warning}>
                    <FontAwesomeIcon
                      className="mr-2"
                      icon={faExclamationTriangle}
                      color="#fad102"
                    />
                  </Tooltip>
                )}
                <div className="border px-4 rounded">{top_k}</div>
              </div>
            </div>
            <div className="flex my-2 items-center">
              <input
                name="top_k"
                type="range"
                min="0"
                max="1"
                step="0.01"
                defaultValue={top_k}
                onChange={handleProgressChange}
                className="w-full cursor-pointer bg-gray-200 rounded-full"
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between">
              <h1>Repetition Penalty </h1>
              <div className="flex items-center">
                {repetitionPenality?.warning === null ||
                repetitionPenality?.warning === "" ? null : (
                  <Tooltip content={repetitionPenality?.warning}>
                    <FontAwesomeIcon
                      className="mr-2"
                      icon={faExclamationTriangle}
                      color="#fad102"
                    />
                  </Tooltip>
                )}
                <div className="border px-4 rounded mr-2">
                  {repetition_penalty}
                </div>
              </div>
            </div>
            <div className="flex my-2 items-center">
              <input
                type="range"
                min="0"
                step="0.01"
                name="repetition_penalty"
                max="1"
                defaultValue={repetition_penalty}
                onChange={handleProgressChange}
                className="w-full cursor-pointer bg-gray-200 rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hyperparam;
