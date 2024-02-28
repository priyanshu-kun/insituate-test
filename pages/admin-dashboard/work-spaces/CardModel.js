import React, { useState } from "react";
import TemplateModal from "./TemplateModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import SecondaryHeading from '../../common-component/secondary-heading/SecondaryHeading';

const CardModel = ({ setShowCard = () => {}, workSpaceName }) => {
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [departmentId, setDepartmentId] = useState(
    "department464d0c03-9b8f-42ca-b264-b7c45103e831"
  );

  return (
    <div className="w-full">
      <div className="flex px-4 border-b text-gray-500 justify-between items-center">
        <div>
          <button
            className="border rounded-xl px-2 py-0.5"
            onClick={() => setShowCard(false)}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Back
          </button>
        </div>
        <div className="flex items-center flex-col">
          <SecondaryHeading headingContent={"Select Your Sphere"} position='center' />
          <div className="m-1 text-sm text-gray-500 flex">
            Launch AI-Driven Efficiency with Ready-to-Use Templates!
          </div>
        </div>
        <div>
          <button
            className="border rounded-xl px-4 py-0.5"
            onClick={() => {
              setShowTemplateModal(true);
              // setShowCard(false);
            }}
          >
            Skip <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
          </button>
        </div>
      </div>

      <div className="flex justify-around mx-14 mt-6">
        <img
          src="/images/orgs/Finance.png"
          alt="it"
          className="w-64 cardAnimation cursor-pointer"
          onClick={() => {
            setDepartmentId("departmentaac11c03-649f-4926-b594-01fe18f1a812");
            setShowTemplateModal(true);
          }}
        />
        <img
          src="/images/orgs/Legal.png"
          alt="product"
          className="w-64 cardAnimation cursor-pointer"
          onClick={() => {
            setDepartmentId("departmentf2053fe2-53ea-418a-811f-8808b9c31c93");
            setShowTemplateModal(true);
          }}
        />
        <img
          src="/images/orgs/Health.png"
          alt="risk"
          className="w-64 cardAnimation cursor-pointer"
          onClick={() => {
            setDepartmentId("departmentf2053fe2-53ea-418a-811f-8808b9c31c93");
            setShowTemplateModal(true);
          }}
        />
      </div>
      <div className="flex justify-around mx-14 mt-6">
        <img
          src="/images/orgs/Real.png"
          alt="real"
          className="w-64 cardAnimation cursor-pointer"
          onClick={() => {
            setDepartmentId("department2396ad9a-0acb-478f-b186-b8154a07db70");
            setShowTemplateModal(true);
          }}
        />
        <img
          src="/images/orgs/Education.png"
          alt="product"
          className="w-64 cardAnimation cursor-pointer"
          onClick={() => {
            setDepartmentId("department2396ad9a-0acb-478f-b186-b8154a07db70");
            setShowTemplateModal(true);
          }}
        />
        <img
          src="/images/orgs/Maintenance.png"
          alt="risk"
          className="w-64 cardAnimation cursor-pointer"
          onClick={() => {
            setDepartmentId("department2396ad9a-0acb-478f-b186-b8154a07db70");
            setShowTemplateModal(true);
          }}
        />
      </div>
      <div className="flex justify-around mx-14 mt-6">
        <img
          src="/images/orgs/telecommunication.png"
          alt="real"
          className="w-64 cardAnimation cursor-pointer"
          onClick={() => {
            setDepartmentId("department2396ad9a-0acb-478f-b186-b8154a07db70");
            setShowTemplateModal(true);
          }}
        />
        <img
          src="/images/orgs/Entertainment.png"
          alt="product"
          className="w-64 cardAnimation cursor-pointer"
          onClick={() => {
            setDepartmentId("departmentf2053fe2-53ea-418a-811f-8808b9c31c93");
            setShowTemplateModal(true);
          }}
        />
        <img
          src="/images/orgs/Venture.png"
          alt="risk"
          className="w-64 cardAnimation cursor-pointer"
          onClick={() => {
            setDepartmentId("department2396ad9a-0acb-478f-b186-b8154a07db70");
            setShowTemplateModal(true);
          }}
        />
      </div>

      <div className="flex items-center flex-col">
        <p className="text-xl text-gray-500">.</p>
        <p className="text-xl text-gray-500">
          Automate across multiple departments
        </p>
        <div className="m-1 text-sm text-gray-500 flex">
          Launch AI-Driven Efficiency with Ready-to-Use Templates!
        </div>
      </div>

      <div className="flex justify-around mx-14 mt-6">
        <img
          src="/images/departments/IT.png"
          alt="it"
          className="m-2 w-64 cardAnimation cursor-pointer"
          onClick={() => {
            setDepartmentId("department464d0c03-9b8f-42ca-b264-b7c45103e831");
            setShowTemplateModal(true);
          }}
        />
        <img
          src="/images/departments/Product.png"
          alt="product"
          className="m-2 w-64 cardAnimation cursor-pointer"
          onClick={() => {
            setDepartmentId("departmentaa68aeca-6d3c-41cd-b655-4452530a0d29");
            setShowTemplateModal(true);
          }}
        />
        <img
          src="/images/departments/Risk.png"
          alt="risk"
          className="m-2 w-64 cardAnimation cursor-pointer"
          onClick={() => {
            setDepartmentId("department2396ad9a-0acb-478f-b186-b8154a07db70");
            setShowTemplateModal(true);
          }}
        />
      </div>
      <div className="flex mx-14 mt-4 justify-around">
        <img
          src="/images/departments/Strategy.png"
          alt="Strategy"
          className="m-2 w-64 cardAnimation cursor-pointer"
          onClick={() => {
            setShowTemplateModal(true);
            setDepartmentId("department15f4cb5f-dcd0-4087-b857-9c5e6acfbc95");
          }}
        />
        <img
          src="/images/departments/Customer.png"
          alt="customer"
          className="m-2 w-64 cardAnimation cursor-pointer"
          onClick={() => {
            setShowTemplateModal(true);
            setDepartmentId("departmentaa68aeca-6d3c-41cd-b655-4452530a0d29");
          }}
        />
        <img
          src="/images/departments/Sales.png"
          alt="sales"
          className="m-2 w-64 cardAnimation cursor-pointer"
          onClick={() => {
            setShowTemplateModal(true);
            setDepartmentId("departmentaa68aeca-6d3c-41cd-b655-4452530a0d29");
          }}
        />
      </div>
      <div className="flex mx-14  mt-4 justify-around pb-4">
        <img
          src="/images/departments/Compliance.png"
          alt="compliance"
          className="m-2 w-64 cardAnimation cursor-pointer"
          onClick={() => {
            setShowTemplateModal(true);
            setDepartmentId("department37dd1e4c-03c4-4ba2-9792-c6d01825e85e");
          }}
        />
        <img
          src="/images/departments/Trading.png"
          alt="trading"
          className="m-2 w-64 cardAnimation cursor-pointer"
          onClick={() => {
            setDepartmentId("departmentaac11c03-649f-4926-b594-01fe18f1a812");
            setShowTemplateModal(true);
          }}
        />
        <img
          src="/images/departments/Audit.png"
          alt="audit"
          className="m-2 w-64 cardAnimation cursor-pointer"
          onClick={() => {
            setShowTemplateModal(true);
            setDepartmentId("department98dc2997-93d6-4fec-a733-886caa582fb8");
          }}
        />
      </div>

      {showTemplateModal && (
        <TemplateModal
          setShowTemplateModal={setShowTemplateModal}
          showTemplateModal={showTemplateModal}
          workSpaceName={workSpaceName}
          departmentId={departmentId}
        />
      )}
    </div>
  );
};

export default CardModel;
