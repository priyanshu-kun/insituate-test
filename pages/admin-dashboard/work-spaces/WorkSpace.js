import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import PersonalWorkSpaces from "./PersonalWorkSpaces";
import WorkSpacesAcrossOrg from "./WorkSpacesAcrossOrg";
import WorkSpaceModal from "./WorkSpaceModal";
import useGetAllWorkSpaces from "./hooks/useGetAllWorkSpaces";
import CardModel from "./CardModel";
import Walkthrough from "../walkthrough";
import PrimaryHeading from '../../common-component/primary-heading/PrimaryHeading';

const WorkSpace = () => {
  const [showWorkSpaceModal, setShowWorkSpaceModal] = useState(false);
  const { workSpaceData, isWorkSpaceLoading, getAllWorkSpace } =
    useGetAllWorkSpaces();
  const [activeId, setActiveId] = useState(null);
  const [showCard, setShowCard] = useState(false);
  const [workSpaceName, setWorkSpaceName] = useState("");

  const { private_workspaces, public_workspaces } = workSpaceData || {};

  if (showCard) {
    return (
      <div className="-ml-12">
        <CardModel setShowCard={setShowCard} workSpaceName={workSpaceName} />
      </div>
    );
  }

  return (
    <div className="w-full relative">
      <div className="">
        <PrimaryHeading headingContent={"Work Spaces"} />
        <div className="text-sm text-gray-500 flex">
          Use a new project for every task to solve with an
          <p className=" text-primary-accent-color ml-1">LLM</p>
        </div>
      </div>
      <div className="mt-6 mb-2 flex w-full">
        <div className="w-1/2">
          <input
            type="search"
            // value={searchInput}
            // onChange={handleSearchTermChange}
            required
            className=" w-full p-1 border rounded-xl focus:outline-none focus:border-primary-accent-color"
          />
        </div>
        <div className="mx-8">
          <button
            onClick={() => setShowWorkSpaceModal(true)}
            className=" disabled:bg-gray-500  bg-primary-accent-color hover:bg-button-hover-color text-white rounded-xl px-2 py-1 mb-4"
          >
            Create New
          </button>
        </div>
      </div>
      <PersonalWorkSpaces
        privateWorkspaces={private_workspaces}
        activeId={activeId}
        setActiveId={setActiveId}
        getAllWorkSpace={getAllWorkSpace}
      />
      {private_workspaces?.length === 0 ? (
        <div className="flex items-center mt-16 mb-24 opacity-60 font-light justify-center text-3xl">
          <p className="text-gray-500 border-b">Create your first project</p>
          <FontAwesomeIcon icon={faPlus} className="ml-2 text-gray-500" />
        </div>
      ) : null}
      <WorkSpacesAcrossOrg
        publicWorkspaces={public_workspaces}
        activeId={activeId}
        setActiveId={setActiveId}
      />

      {showWorkSpaceModal ? (
        <WorkSpaceModal
          WorkSpaceModal={WorkSpaceModal}
          setShowWorkSpaceModal={setShowWorkSpaceModal}
          showCard={showCard}
          setShowCard={setShowCard}
          workSpaceName={workSpaceName}
          setWorkSpaceName={setWorkSpaceName}
        />
      ) : null}
      <Walkthrough />
    </div>
  );
};

export default WorkSpace;
