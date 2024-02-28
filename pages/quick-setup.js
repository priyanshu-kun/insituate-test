import React, { useEffect, useState } from "react";
import PrimaryHeading from "./common-component/primary-heading/PrimaryHeading";
import SelectWrapper from "./common-component/select/Select";
import QuickSetupModal from './QuickSetupModal/QuickSetup'
import useCreateWorkSpace from './admin-dashboard/work-spaces/hooks/useCreateWorkSpace';
import {  useRouter } from 'next/router';

const roleOptions = [
  { value: "CTO", label: "CTO" },
  { value: "Developer", label: "Developer" },
  { value: "Tech Lead", label: "Tech Lead" },
  { value: "CPO", label: "CPO" },
  { value: "Engineering Manager", label: "Engineering Manager" },
];

const departmentsOptions = [
  { value: "departmentaac11c03-649f-4926-b594-01fe18f1a812", label: "Finance" },
  { value: "departmentf2053fe2-53ea-418a-811f-8808b9c31c93", label: "Legal" },
  {
    value: "departmentf2053fe2-53ea-418a-811f-8808b9c31c93",
    label: "Health Care",
  },
  {
    value: "department2396ad9a-0acb-478f-b186-b8154a07db70",
    label: "Real Estate",
  },
  {
    value: "department2396ad9a-0acb-478f-b186-b8154a07db70",
    label: "Education",
  },
  {
    value: "department2396ad9a-0acb-478f-b186-b8154a07db70",
    label: "Maintenance",
  },
  {
    value: "department2396ad9a-0acb-478f-b186-b8154a07db70",
    label: "Telecommunication",
  },
  {
    value: "departmentf2053fe2-53ea-418a-811f-8808b9c31c93",
    label: "Entertainment & Media",
  },
  {
    value: "department2396ad9a-0acb-478f-b186-b8154a07db70",
    label: "Venture Capital",
  },
  {
    value: "department464d0c03-9b8f-42ca-b264-b7c45103e831",
    label: "Information Technology",
  },
  { value: "departmentaa68aeca-6d3c-41cd-b655-4452530a0d29", label: "Product" },
  {
    value: "department2396ad9a-0acb-478f-b186-b8154a07db70",
    label: "Risk Management",
  },
  {
    value: "department15f4cb5f-dcd0-4087-b857-9c5e6acfbc95",
    label: "Strategy & Development",
  },
  {
    value: "departmentaa68aeca-6d3c-41cd-b655-4452530a0d29",
    label: "Customer Service",
  },
  { value: "departmentaa68aeca-6d3c-41cd-b655-4452530a0d29", label: "Sales" },
  {
    value: "department37dd1e4c-03c4-4ba2-9792-c6d01825e85e",
    label: "Compliance",
  },
  { value: "departmentaac11c03-649f-4926-b594-01fe18f1a812", label: "Trading" },
  { value: "department98dc2997-93d6-4fec-a733-886caa582fb8", label: "Audit" },
];


function QuickSetup() {

  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [workspaceName, setWorkspaceName] = useState('');
  // const [workspaceDescription, setWorkspaceDescription] = useState('');
  const router = useRouter();
  const [templateIds, setTemplateId] = useState([]);
  const [departmentId, setDepartmentId] = useState('');
  const { onCreate, isCreateLoading } = useCreateWorkSpace({
    workSpaceName: workspaceName,
    templateIds,
    isChangeRoute: false
  });

  const handleDepartmentChange = (dep) => {
    setDepartmentId(dep?.value);
    setShowTemplateModal(true);
  }

  const handleCreateWorkspace = () => {
    onCreate();
    router.push('/admin-dashboard/admin')
    setTemplateId([]);
    setDepartmentId('');
    setWorkspaceName('');
  }

  return (
    <div className="flex flex-col items-center justify-center p-20 h-screen">
      <PrimaryHeading headingContent={"Quick Setup"} />
      <div className=" w-fit border rounded-lg mt-6 flex flex-col">
        <span className="text-xs pl-3 text-gray-300 mt-2 border-b pb-2 pointer-events-none">
          Select your designation
        </span>
        <SelectWrapper
          options={roleOptions}
          onSelect={() => {}}
          defaultOption={roleOptions[0]}
          width="w-96"
        />
      </div>
      <div className="w-fit border rounded-lg mt-6 flex flex-col">
        <span className="text-xs pl-3 text-gray-300 mt-2 border-b pb-2 pointer-events-none">
          Select your Department
        </span>
        <SelectWrapper
          options={departmentsOptions}
          onSelect={handleDepartmentChange}
          defaultOption={departmentsOptions[0]}
          width="w-96"
        />
      </div>
      <input
        type="text"
        onChange={(e) => setWorkspaceName(e.target.value)}
        style={{ fontSize: "14px" }}
        placeholder="Workspace Name."
        className="w-96 text-gray-500 px-4 py-2 mt-4 border focus:outline-none focus:border-primary-accent-color rounded-xl"
      />
      {/* <textarea
        type="text"
        onChange={(e) => setWorkspaceDescription(e.target.value)}
        style={{ fontSize: "14px" }}
        placeholder="Workspace Description."
        className="w-96 h-40 text-gray-500 px-4 py-2 mt-4 border focus:outline-none focus:border-primary-accent-color rounded-xl"
      /> */}
      <button
        onClick={handleCreateWorkspace}
        className=" disabled:bg-gray-500  bg-primary-accent-color hover:bg-button-hover-color text-white rounded-full px-2 py-2 mb-10 mt-6 text-sm w-96"
      >
        Get Started
      </button>
      <div className="relative">
        <hr className=" border border-gray-200  w-80" />
        <span className="absolute text-xs top-1/2 left-1/2 bg-white w-8 text-center text-gray-400 transform -translate-x-1/2 -translate-y-1/2">
          OR
        </span>
      </div>

      <button
        onClick={() => {}}
        className=" disabled:bg-gray-500  bg-secondary-accent-color hover:bg-blue-200 text-gray-800 rounded-full px-2 py-2 mt-10 text-sm w-96"
      >
        Explore pre made Copilots
      </button>
      {showTemplateModal && (
        <QuickSetupModal
          setShowTemplateModal={setShowTemplateModal}
          showTemplateModal={showTemplateModal}
          departmentId={departmentId}
          setTemplateId={setTemplateId}
          templateIds={templateIds}
        />
      )}
    </div>
  );
}

export default QuickSetup;
