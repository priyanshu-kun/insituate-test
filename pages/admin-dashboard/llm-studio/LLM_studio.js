import React from "react";
import SecondaryButton from "../../common-component/secondary-button/SecondaryButton";
import useSetFetchLLMStudio from './hooks/useSetFetchLLMStudio';
import LLM_card from './LLM_card';
import PrimaryHeading from '../../common-component/primary-heading/PrimaryHeading';

function LLM_studio() {

  const {
    models,
    isModelLoading,
  } = useSetFetchLLMStudio();


  console.log(models)

  return (
    <div className='pb-20'>
      <div className="mt-0 w-full flex items-center justify-between">
        <PrimaryHeading headingContent={"LLM Studio"} />
        <div className="flex items-center justify-center my-2">
          <p className="text-lg text-gray-500">Volume Used: 334 / 523 GB</p>
          <SecondaryButton text="Expand" styles="ml-8 text-blue-600 hover:bg-blue-100" />
        </div>
      </div>
    <p className='text-xs text-gray-500 -mt-2'>Discover and Integrate New Open-Source Language Models into Your Workflows</p>
        <div className="w-1/2 mt-20 mb-10 mx-auto">
          <input
            type="search"
            // value={searchInput}
            // onChange={handleSearchTermChange}
            required
            className=" w-full p-1 border rounded-xl focus:outline-none focus:border-primary-accent-color placeholder:text-xs px-4 py-2"
            placeholder='Looking for something?'
          />
        </div>
      {
        isModelLoading ? "Loading...": (
          models?.models?.map(({ name, arch, numParameters, datePublished, description, files }) => {
            return <LLM_card name={name} arch={arch} numParameters={numParameters} datePublished={datePublished} description={description} files={files}  />
          })
        )
      }
    </div>
  );
}

export default LLM_studio;
