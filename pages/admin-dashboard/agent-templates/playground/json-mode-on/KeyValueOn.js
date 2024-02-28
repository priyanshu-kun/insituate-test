import React, { useEffect, useState } from "react";

const KeyValueOn = ({
  output_form = {},
  queryData,
  selectedItems,
  setSelectedItems,
  outputKey,
  setOutputKey,
}) => {
  const { fields = [] } = output_form;

  useEffect(() => {
    setOutputKey(fields);
  }, [fields]);

  const handleAddPair = () => {
    setOutputKey([...outputKey, ""]);
  };

  const handleKeyChange = (index, value) => {
    const updatedKeys = [...outputKey];
    updatedKeys[index] = value;
    setOutputKey(updatedKeys);
  };
  const handleCheckboxChange = (index) => {
    const isChecked = selectedItems.includes(index);
    if (isChecked) {
      setSelectedItems(selectedItems.filter((item) => item !== index));
    } else {
      setSelectedItems([...selectedItems, index]);
    }
  };

  return (
    <div className="text-sm text-gray-500">
      <div className="w-full mt-2 m-1  flex">
        <h1 className="w-1/2">Key</h1>
        <h1 className="w-1/2">Value</h1>
      </div>
      <div className="border w-full rounded-xl">
        {(outputKey || []).map((item, index) => {
          return (
            <div className="flex border-b last:border-none w-full">
              <div className="w-1/2 border-r p-1.5 px-2.5 flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="border"
                    onChange={() => handleCheckboxChange(index)}
                    checked={selectedItems.includes(index)}
                  />
                  <input
                    type="text"
                    placeholder="Key"
                    value={item}
                    className="ml-1 px-1 placeholder:text-gray-300"
                    onChange={(e) => handleKeyChange(index, e.target.value)}
                  />
                </div>
              </div>
              <div className="w-1/2 p-1 max-h-24 overflow-y-auto">
                {queryData?.[item] || "--"}
              </div>
            </div>
          );
        })}
        <div className="flex justify-center my-2">
          <button onClick={handleAddPair} className="border rounded px-2 my-2">
            Add Field
          </button>
        </div>
      </div>
    </div>
  );
};

export default KeyValueOn;
