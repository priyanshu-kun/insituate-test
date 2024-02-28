import React, { useState } from "react";
import Modal from "../../common-component/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import copyTextToClipboard, {
  truncateString,
} from "../../utils/utillityFunction";

const EmployeeJourney = ({
  employeeJourney,
  setGenerateId,
  setEmployeeJourney,
  genearatedIdPassword,
}) => {
  const onClose = () => {
    setEmployeeJourney(false);
    setGenerateId(false);
  };
  const { name, id, password } = genearatedIdPassword || {};
  const [isCopied, setIsCopied] = useState(false);

  return (
    <div>
      <Modal
        showModal={employeeJourney}
        modalWidth="w-2/5"
        closeModal={onClose}
      >
        <h1 className="text-xl text-gray-500 flex justify-center">
          Start Your Employee's Journey
        </h1>
        <h1 className="text-gray-500 flex justify-center my-4 ">{name}</h1>
        <div className="border px-4 w-9/12 m-auto shadow rounded-xl">
          <div className="flex justify-between items-center my-3">
            <p className="text-gray-500 text-sm">Employee id: </p>
            <p className="text-sm text-primary-accent-color">
              {truncateString(id, 6, 6, 10)}
            </p>
            <button
              onClick={() => copyTextToClipboard(id, setIsCopied)}
              className="ml-2 flex items-center hover:text-primary-accent-color"
            >
              <FontAwesomeIcon icon={faCopy} />
              <p className="text-sm ml-1">{isCopied ? "copied" : "copy"}</p>
            </button>
          </div>
          <div className="flex justify-between items-center my-3">
            <p className="text-gray-500 text-sm">Password: </p>
            <p className="text-sm text-primary-accent-color">
              {truncateString(password, 6, 6, 10)}{" "}
            </p>
            <button
              onClick={() => copyTextToClipboard(password, setIsCopied)}
              className="ml-2 flex items-center hover:text-primary-accent-color"
            >
              <FontAwesomeIcon icon={faCopy} />
              <p className="text-sm ml-1">{isCopied ? "copied" : "copy"}</p>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EmployeeJourney;
