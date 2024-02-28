import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../_app";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import Modal from "../../common-component/Modal";
import useEditWorkspace from "./hooks/useEditWorkspace";
import useDeleteWorkspace from "./hooks/useDeleteWorkspace";
import SecondaryHeading from "../../common-component/secondary-heading/SecondaryHeading";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";
import Avatar from '../../common-component/Avatar/Avatar';

const PersonalWorkSpaces = ({
  privateWorkspaces = [],
  activeId = "",
  setActiveId = () => {},
  getAllWorkSpace,
}) => {
  const userData = useContext(UserContext);
  const { userDetails } = userData || {};
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [confirmDeleteMessage, setConfirmDeleteMessage] = useState("");
  const [modalContent, setModalContent] = useState({});
  const [modalState, setModalState] = useState({});
  const [isWorkspaceDeleting, setIsWorkspaceDeleting] = useState(false);
  // const { workspace_avatar } = ;

  useEffect(() => {
    setModalState({
      workspace_name: modalContent.workspace_name,
      tagline: modalContent.tagline,
      description: modalContent.description,
    });
  }, [modalContent]);

  const { editWorkspace } =
    useEditWorkspace(modalState);

  const { deleteWorkspace } = useDeleteWorkspace();

  const handleRoute = (e) => {
    e.preventDefault();
    if (activeId !== "") {
      router.push({
        pathname: "/admin-dashboard/agent-templates/AgentTemplets",
        query: { activeId: activeId },
      });
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const payload = { ...modalState, id: modalContent.id };
    editWorkspace(payload);
    setModalState({});
    getAllWorkSpace();
    setModal(false);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setModalState((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeleteWorkspace = (e) => {
    e.preventDefault();
    const id = modalContent?.id;
    const workspace_name = modalContent?.workspace_name.trim();
    const entered_workspace_name = confirmDeleteMessage.trim();
    if (id && workspace_name === entered_workspace_name) {
      deleteWorkspace(id);
      setConfirmDeleteMessage("");
      setModalContent({});
      setDeleteModal(false);
      getAllWorkSpace();
    }
  };

  return (
    <div>
      <SecondaryHeading
        headingContent={`${
          `${capitalizeFirstLetter(userDetails?.name)}'s` || "Insituate"
        } Work Spaces`}
      />
      {privateWorkspaces?.map((item) => {
        const { workspace_name, description, id, tagline } = item || {};
        return (
          <div
            key={id}
            onClick={() => {
              setActiveId(id);
            }}
            className={`
              ${
                activeId === id
                  ? "border border-primary-accent-color rounded-xl mb-6 py-5 w-4/5"
                  : "border cursor-pointer rounded-xl mb-6 py-5 w-4/5"
              }
               shadow-workspace_shadow 
              `}
          >
            <div className="pl-6 flex w-full justify-between relative">
              <Avatar seed={id} />
              <div className="w-full">
                <h1
                  className={
                    activeId === id
                      ? "text-primary-accent-color text-lg"
                      : "text-gray-500 text-lg"
                  }
                >
                  {workspace_name || "--"}
                  {activeId === id && (
                    <FontAwesomeIcon
                      onClick={() => {
                        setModal(true);
                        setModalContent(item);
                      }}
                      icon={faEdit}
                      className="text-sm  ml-2 opacity-60 text-gray-400 cursor-pointer"
                    />
                  )}
                </h1>
                <p
                  className={
                    activeId === id
                      ? "text-primary-accent-color  w-4/5 -mt-1"
                      : " text-gray-500  w-4/5 -mt-1"
                  }
                >
                  {tagline ? (
                    <span className="text-sm text-gray-500">{tagline}</span>
                  ) : (
                    <span className="text-sm text-gray-500">Edit tagline.</span>
                  )}
                </p>
              </div>
              {activeId === id ? (
                <div className="mr-8 flex items-center justify-center -mt-4">
                  <button
                    onClick={handleRoute}
                    className="disabled:bg-gray-500 bg-primary-accent-color hover:bg-button-hover-color text-white rounded-xl px-4 py-1 mr-6"
                  >
                    Enter
                  </button>
                  <FontAwesomeIcon
                    onClick={() => {
                      setDeleteModal(true);
                      setModalContent(item);
                    }}
                    icon={faTrash}
                    className="text-sm  opacity-60 text-red-400 cursor-pointer"
                  />
                </div>
              ) : null}
            </div>
            {activeId === id ? (
              <div className=" pl-7 mt-3  pr-12 text-justify border-primary-accent-color">
                <p className="text-primary-accent-color text-sm">
                  {description ? (
                    <span className="text-xs text-gray-400">{description}</span>
                  ) : (
                    <span className="text-xs text-gray-400">
                      Edit description
                    </span>
                  )}
                </p>
              </div>
            ) : null}
          </div>
        );
      })}
      <Modal
        showModal={modal}
        closeModal={() => {
          setModal(false);
          setModalContent({});
        }}
      >
        <h2 className="text-2xl  text-gray-500 text-center mb-6">
          Edit Workspace
        </h2>
        <form
          onSubmit={handleEditSubmit}
          className="flex flex-col  w-4/5 mx-auto"
        >
          <label className="mb-2">
            <p className="text-xs text-gray-400 ml-3">Enter heading</p>
            <input
              name="workspace_name"
              onChange={handleEditChange}
              className="w-full p-1 border rounded-xl focus:outline-none focus:border-primary-accent-colo0 px-4 py-2 mb-2 text-gray-500"
              value={modalState?.workspace_name}
            />
          </label>
          <label className="mb-2">
            <p className="text-xs text-gray-400 ml-3">Enter Tagline</p>
            <input
              name="tagline"
              onChange={handleEditChange}
              className="w-full p-1 border rounded-xl focus:outline-none focus:border-primary-accent-colo-indigo-500 px-4 py-2 mb-2 text-gray-500"
              value={modalState?.tagline}
              placeholder="Insert tagline"
            />
          </label>
          <label className="mb-2">
            <p className="text-xs text-gray-400 ml-3">Enter Description</p>
            <textarea
              name="description"
              onChange={handleEditChange}
              className="w-full p-1 border rounded-xl focus:outline-none focus:border-primary-accent-colo0 px-4 py-2 mb-2 text-gray-500"
              value={modalState?.description}
              placeholder="Insert description"
            />
          </label>
          <button
            type="submit"
            className="disabled:bg-gray-500  bg-primary-accent-color hover:bg-button-hover-color text-white rounded-xl px-4 py-1 mb-4 mx-auto block"
          >
            Submit
          </button>
        </form>
      </Modal>
      <Modal
        showModal={deleteModal}
        closeModal={() => {
          setDeleteModal(false);
          setConfirmDeleteMessage("");
          setModalContent({});
        }}
        modalWidth="w-1/3"
      >
        <h2 className="text-2xl  text-gray-500 text-center mb-6 ">
          Delete Workspace
        </h2>
        <form
          onSubmit={handleDeleteWorkspace}
          className="flex flex-col  w-full mx-auto"
        >
          <label className="mb-2">
            <p className="text-xs text-gray-400 ml-3 cursor-not-allowed select-none">
              Enter your workspace name "
              {modalContent?.workspace_name || "Name"}"
            </p>
            <input
              onChange={(e) => {
                setConfirmDeleteMessage(e.target.value);
                if (e.target.value === modalContent?.workspace_name) {
                  setIsWorkspaceDeleting(true);
                } else {
                  setIsWorkspaceDeleting(false);
                }
              }}
              className="w-full p-1 border rounded-xl focus:outline-none focus:border-primary-accent-colo0 px-4 py-2 mb-2 text-gray-500"
              value={confirmDeleteMessage}
              placeholder={modalContent?.workspace_name || "Name"}
            />
          </label>
          <button
            type="submit"
            className={`disabled:bg-gray-500 mx-auto block hover:bg-red-600 text-white rounded-xl px-4 py-1 mb-4 ${
              isWorkspaceDeleting
                ? "bg-red-500"
                : "bg-gray-200 text-gray-800 hover:bg-gray-200 cursor-not-allowed"
            }`}
          >
            Delete
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default PersonalWorkSpaces;
