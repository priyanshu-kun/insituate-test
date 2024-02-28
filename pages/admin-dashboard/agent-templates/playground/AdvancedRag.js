import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

const AdvancedRag = ({ ragData, handleSetAdvancedRag }) => {
  const { templates = [] } = ragData || {};
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    setSelectedItem(templates[0]?.id);
    handleSetAdvancedRag(templates[0]?.name);
  }, [templates])

  return (
    <div className="text-gray-500 ">
      <h1>Advanced Rag</h1>
      <div className="text-sm border mt-1 rounded-lg max-h-80 overflow-y-scroll">
        {templates.map((item) => {
          const { id, name, description } = item || {};
          return (
            <div key={id} className="border-b cursor-pointer last:border-none pb-2">
              <div
                className="flex items-center p-2 justify-between"
                onClick={() => {
                  setSelectedItem(selectedItem === id ? null : id);
                    handleSetAdvancedRag(name);
                }}
              >
                <div className="flex">
                  <input
                    type="radio"
                    checked={id === selectedItem}
                    className="cursor-pointer"
                    onChange={() => {}}
                  />
                  <span className="ml-2 text-base">{name}</span>
                </div>
                <FontAwesomeIcon icon={faAngleDown} />
              </div>
              {selectedItem === id ? (
                <div className="px-2 ml-6 opacity-80">{description} </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdvancedRag;
