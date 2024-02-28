import React from "react";

const ResponseJsonModeOff = ({ queryData }) => {
  return (
    <div className="mx-4">
      <div className="flex w-full items-center">
        <textarea
          defaultValue={queryData?.response}
          readOnly
          className="w-full h-24 p-4 text-sm text-gray-600 border focus:outline-none focus:border-primary-accent-color rounded-xl "
        />
      </div>
    </div>
  );
};

export default ResponseJsonModeOff;
