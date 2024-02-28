import React from "react";
import SecondaryButton from "../../common-component/secondary-button/SecondaryButton";
import {
  bytesToGigabytes,
  calculateAndDisplayTimeDifference,
  formatDateTime,
} from "../../utils/utillityFunction";
import RenderTooltipComponent from "../../common-component/render-tooltip-component/RenderTooltipComponent";
import useDownloadModel from './hooks/useDownloadModel';

function LLM_card({
  name,
  arch,
  numParameters,
  datePublished,
  description,
  files,
}) {

  const { isDownloadLoading, startDownload } = useDownloadModel();


  return (
    <div className="w-full min-h-96 max-h-96 shadow-llm_card_shadow rounded-xl border border-solid border-blue-50 p-8 flex mt-8">
      <div className="w-full">
        <div className="flex justify-between items-center w-full">
          <div className=" flex">
            <h1 className="text-xl text-gray-500 font-bold mr-6">
              <RenderTooltipComponent content={name} maxLength={16} />
            </h1>
            <SecondaryButton
              text={`${numParameters} Params`}
              styles="mr-2 text-sm font-bold text-blue-600 hover:bg-blue-100 pointer-events-none"
            />
            <SecondaryButton
              text={`Architecture: ${arch}`}
              styles="text-sm font-bold text-blue-600 hover:bg-blue-100 pointer-events-none"
            />
          </div>
          <h1 className="text-end text-gray-500 mb-3">
            <span className="text-gray-400">Released: </span>{" "}
            {formatDateTime(datePublished)}{" "}
            <span className="text-sm opacity-60">
              ({calculateAndDisplayTimeDifference(datePublished)} ago)
            </span>
          </h1>
        </div>
        <div className="flex items-start justify-between mt-8">
          <div className="">
            <h1 className="text-lg text-gray-500 mb-2">Requires: 8GB</h1>
            <div className=" max-w-xl h-52 overflow-y-auto rounded-xl  text-gray-600 box-border  text-sm bg-gray-50 p-6 text-justify">
              { description }
            </div>
          </div>
          <div className=" w-2/4 ml-16 min-w-500px">
            <h1 className="text-lg text-gray-500 mb-2">Quantization:</h1>
            <div className=" max-w-full overflow-y-auto h-52  max-h-96 border border-gray-300 border-solid text-gray-500 rounded-xl">
              <ul className="w-full h-full">
                {files?.all.map(({ quantization, name, sizeBytes, url }) => {
                  return (
                    <li className="w-full h-12 flex justify-between items-center px-3 border-b border-solid border-gray-300">
                      <span className="text-xs py-1 rounded-sm px-2 border border-solid border-gray-300 w-40 block  text-center mx-2">
                        Quantization {quantization}
                      </span>
                      <RenderTooltipComponent content={name} maxLength={8} styles='text-sm' />
                      <span
                        className={` rounded-md mx-2 bg-gray-100 text-gray-600 text-xs  min-w-20 h-6 flex items-center justify-center truncate `}
                      >
                        {`Size ${bytesToGigabytes(sizeBytes)}GB`}
                      </span>
                      <button
                        type='button'
                        onClick={(e) => {
                          e.preventDefault();
                          startDownload({name, link: url});
                        }}
                        className={`rounded-md py-1 px-4  w-fit text-center transition-all cursor-pointer text-xs text-primary-accent-color flex items-center bg-secondary-accent-color hover:bg-secondary-accent-color/60 mx-2`}
                      >
                        <span>Download</span>
                        <img
                          className="w-5 h-auto ml-2"
                          src="/images/download.svg"
                        />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LLM_card;
