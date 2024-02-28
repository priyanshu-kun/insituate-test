import React, { useState } from "react";
import Modal from "../../common-component/Modal";
import EmployeeJourney from "./EmployeeJourney";
import useGenerateId from "./hooks/useGenerateId";
import PrimaryHeading from '../../common-component/primary-heading/PrimaryHeading';
import SecondaryHeading from '../../common-component/secondary-heading/SecondaryHeading';

const GenerateIdModal = ({ generateId, setGenerateId, getEmployees }) => {
  const [employeeJourney, setEmployeeJourney] = useState(false);

  const [employeeName, setEmployeeName] = useState("");

  const handleGenerate = () => {
    setEmployeeJourney(true);
    onGenerate();
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setEmployeeName(value);
  };
  const { isLoading, onGenerate, genearatedIdPassword } = useGenerateId({
    employeeName,
    getEmployees,
  });

  return (
    <Modal
      showModal={generateId}
      modalWidth="w-1/3"
      closeModal={() => setGenerateId(false)}
    >
      <SecondaryHeading headingContent={"Start Your Employee's Journey"} position='center' />
      <div className="flex my-4 justify-center items-center">
        <input
          type="text"
          value={employeeName}
          onChange={handleInputChange}
          placeholder="Type employee name"
          required
          className="w-4/5 shadow p-1 border rounded-lg focus:outline-none focus:border-primary-accent-color"
        />
      </div>
      <div className="flex justify-center">
        <button
          disabled={isLoading}
          onClick={handleGenerate}
          className="bg-primary-accent-color hover:bg-button-hover-color text-white rounded-2xl px-8 py-1 mb-4"
        >
          {isLoading ? "Generating..." : "Generate"}
        </button>
      </div>
      {employeeJourney && (
        <EmployeeJourney
          employeeJourney={employeeJourney}
          setEmployeeJourney={setEmployeeJourney}
          setGenerateId={setGenerateId}
          genearatedIdPassword={genearatedIdPassword}
        />
      )}
    </Modal>
  );
};

export default GenerateIdModal;
