import React from "react";

const Query = ({ queryData = {} }) => {
  return (
    <div className="">
      <h1 className="text-gray-500 mt-2">Response</h1>
      <div className="flex w-full items-center">
        <textarea
          defaultValue={queryData?.response}
          readOnly
          className="w-full h-24 px-2 mr-3 border focus:outline-none focus:border-primary-accent-color rounded-xl"
        />
      </div>
    </div>
  );
};

export default Query;
