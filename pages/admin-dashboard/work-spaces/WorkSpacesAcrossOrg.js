import { useRouter } from "next/router";
import React, { useState } from "react";
import SecondaryHeading from "../../common-component/secondary-heading/SecondaryHeading";
import Avatar from '../../common-component/Avatar/Avatar';

const WorkSpacesAcrossOrg = ({
  publicWorkspaces = [],
  activeId = "",
  setActiveId = () => {},
}) => {
  const router = useRouter();

  const handleRoute = (e) => {
    e.preventDefault();
    if (activeId !== "") {
      router.push({
        pathname: "/admin-dashboard/agent-templates/AgentTemplets",
        query: { activeId: activeId },
      });
    }
  };

  return (
    <div className=" pb-28">
      <SecondaryHeading
        headingContent={"View Workspaces Across your organization"}
      />
      {publicWorkspaces?.map((item) => {
        const { workspace_name, description, id, tagline } = item || {};
        return (
          <div
            key={id}
            onClick={() => {
              setActiveId(id);
            }}
            className={`${
              activeId === id
                ? "border border-primary-accent-color rounded-xl mb-6 py-5 w-4/5 "
                : "border cursor-pointer rounded-xl mb-6 py-5 w-4/5"
            }  shadow-workspace_shadow`}
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
    </div>
  );
};

export default WorkSpacesAcrossOrg;
