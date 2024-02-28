import React from "react";

const Metadata = ({ projectConfig = {} }) => {
  const {
    model_name,
    project_name,
    project_desc,
    instructions,
    hyperparams = {},
  } = projectConfig;
  const { repetition_penalty, max_new_tokens, temp } = hyperparams;
  return (
    <div className="mx-4">
      <div className="flex text-gray-600 mt-6 mb-2 justify-between">
        <h1>{project_name}</h1>
        <h1>{model_name}</h1>
      </div>
      <em><h1 className="text-sm text-gray-400">{project_desc}</h1></em>
      <div className="my-4">
        <h1 className="text-primary-accent-color border-b w-fit border-primary-accent-color">
          System Instructions
        </h1>
        <em><h1 className="text-sm my-2 text-gray-400">{instructions}</h1></em>
        {/* <h1 className="text-sm my-2 text-gray-500">
          Informed and Accurate: Base your responses on the specific details,
          figures, and data available in the company's documents.
          Cross-reference with existing policies or guidelines whenever
          applicable. ...
        </h1> */}
      </div>
      <div className="my-4">
        <div className="flex justify-between">
          <div>
            {/* <h1 className="text-blue-400 border-b mb-4 w-fit border-blue-400">
              Domain knowledge ingested
            </h1> */}
            <div>
              {/* <h1 className="text-blue-400 border-b w-fit border-blue-400">
                Indexings
              </h1>
              <h1 className="text-gray-400">Tiktoken</h1> */}
            </div>
            <div>
              {/* <h1 className="text-blue-400 border-b w-fit border-blue-400">
                Retriever
              </h1> */}
              {/* <h1 className="text-gray-400">Retriever</h1> */}
            </div>
            <div>
              {/* <h1 className="text-blue-400 border-b w-fit border-blue-400">
                Query Engine
              </h1>
              <h1 className="text-gray-400">Query Engine</h1> */}
            </div>
          </div>
          <div>
            <h1 className="text-primary-accent-color border-b w-fit border-primary-accent-color">
              Hyperparams
            </h1>
            <div className="mt-4 text-sm text-gray-400">
              <h1>Temperature : {temp}</h1>
              <h1>Repetition Penalty : {repetition_penalty}</h1>
              <h1>Max New Tokens : {max_new_tokens}</h1>
            </div>
            <div className="mt-4 text-sm text-gray-400">
              {/* <h1>Input JSON : On name,</h1>
              <h1>age, gender</h1>
              <h1>Output JSON : Off</h1> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Metadata;
