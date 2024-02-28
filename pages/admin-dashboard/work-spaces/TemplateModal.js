import React, { useState } from "react";
import Modal from "../../common-component/Modal";
import useGetTemplate from "./hooks/useGetTemplate";
import useCreateWorkSpace from "./hooks/useCreateWorkSpace";
import PrimaryHeading from '../../common-component/primary-heading/PrimaryHeading';

const TemplateModal = ({
  setShowTemplateModal = () => {},
  showTemplateModal,
  workSpaceName,
  departmentId,
}) => {
  const onClose = () => {
    setShowTemplateModal(false);
  };
  const { templateData = {}, isTemplateLoading } = useGetTemplate({
    departmentId,
  });
  const { template = [] } = templateData;
  const [templateIds, setTemplateId] = useState([]);

  const handleCheckboxChange = (templateId) => {
    setTemplateId((prevSelected) => {
      if (prevSelected.includes(templateId)) {
        return prevSelected.filter((id) => id !== templateId);
      } else {
        return [...prevSelected, templateId];
      }
    });
  };

  const { onCreate, isCreateLoading } = useCreateWorkSpace({
    workSpaceName,
    templateIds,
  });
  return (
    <Modal showModal={showTemplateModal} closeModal={onClose}>
      <div className="flex flex-col justify-center items-center">
        <PrimaryHeading headingContent={"Begin With Copilots"} position="center" />
        <div className="text-sm text-gray-500 flex">
          You can start your new work space with some pre-made copilots.
        </div>
      </div>
      <div className="flex my-8 justify-center items-center">
        <input
          type="search"
          // value={searchInput}
          // onChange={handleSearchTermChange}
          required
          className="w-7/12 shadow p-1 border rounded-xl focus:outline-none focus:border-indigo-500"
        />
      </div>
      {template.map((item) => {
        const { name, tagline, template_id } = item || {};
        return (
          <div className="flex my-2 items-center px-5" key={template_id}>
            <input
              type="checkbox"
              className="w-5 h-5"
              checked={templateIds?.includes(template_id)}
              onChange={() => handleCheckboxChange(template_id)}
            />
            <div className="ml-4">
              <p className="text-gray-600">{name}</p>
              <p className="text-gray-500 text-sm">{tagline}</p>
              <hr className="my-1"></hr>
            </div>
          </div>
        );
      })}

      <div className="flex justify-center">
        <button
          onClick={onCreate}
          disabled={isCreateLoading}
          className="bg-primary-accent-color hover:bg-button-hover-color text-white rounded-2xl px-12 py-2 mb-4"
        >
          {isCreateLoading ? "Creating..." : "Create"}
        </button>
      </div>
    </Modal>
  );
};

export default TemplateModal;
