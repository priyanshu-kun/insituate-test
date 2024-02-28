import React, { useState } from "react";
import useGetTemplateList from "./hook/useGetTemplateList";
import Modal from "../../common-component/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const AgentTemplateModal = ({
  setShowTemplateModal = () => {},
  showTemplateModal,
  departmentId,
  onCreateLoading,
  onCreate,
}) => {
  const { templateData = {}, isTemplateLoading } = useGetTemplateList({
    departmentId,
  });
  const { template = [] } = templateData;
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);

  const handleRadioChange = (templateId) => {
    setSelectedTemplateId(templateId);
  };

  return (
    <Modal
      showModal={showTemplateModal}
      closeModal={() => setShowTemplateModal(false)}
    >
      <div className="flex flex-col justify-center items-center">
        <p className="text-3xl text-gray-500">Begin With Templates</p>
        <div className="text-sm text-gray-500 flex">
          You can start your new work space with some pre-made projects.
        </div>
      </div>

      <div className="p-3">
        <div className="relative ">
          <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none"></div>
          <input
            type="text"
            id="input-group-search"
            className="block w-full px-2 py-1 ps-4 text-sm text-gray-900 border border-gray-300 rounded-3xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Search your template"
          />
          <div className="absolute inset-y-0 rtl:inset-r-0 end-0 flex items-center pe-3 pointer-events-none">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>
        </div>
      </div>
      <form onSubmit={(e) => onCreate(selectedTemplateId, e)}>
        {template.map((item) => {
          const { name, tagline, template_id } = item || {};
          return (
            <div className="flex my-2 items-center px-5" key={template_id}>
              <input
                type="radio"
                className="w-5 h-5"
                checked={selectedTemplateId === template_id}
                onChange={() => handleRadioChange(template_id)}
                required
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
            disabled={onCreateLoading}
            className="bg-primary-accent-color hover:bg-button-hover-color text-white rounded-2xl px-12 py-2 mb-4"
          >
            {onCreateLoading ? "Creating..." : "Create"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AgentTemplateModal;
