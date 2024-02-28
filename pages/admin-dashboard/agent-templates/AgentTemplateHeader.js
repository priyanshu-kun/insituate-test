import React, { useState, useEffect } from "react";
import SelectVersions from "./SelectedVersions";
import SelectProjectName from "./SelectProjectName";
import logo from "../../../public/images/logo.svg";
import { useRouter } from "next/router";
import Image from "next/image";
import SelectWrapper from '../../common-component/select/Select';

const AgentTemplateHeader = ({
  workSpaceData,
  workspaceId = "",
  isWorkSpaceLoading = true,
  projects = [],
  slectedProjectId,
  setSelectedProjectId = () => {},
  setSelectedBranchName,
  setShowTemplateCard,
  setWorkspaceId = () => {},
}) => {
  const [activeWorkspace, setActiveWorkspace] = useState({});
  const [workspaceSelectOptions, setWorkspaceSelectOptions] = useState([]);
  const router = useRouter();
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const savedAvatar = localStorage.getItem("userAvatar");
    const savedName = localStorage.getItem("name");
    if (savedAvatar) {
      setAvatar(savedAvatar);
    }
    if (savedName) {
      setName(savedName);
    }
  }, []);

  const handleSelect = (selectedOption) => {
    if (selectedOption.value !== undefined) {
      setWorkspaceId(selectedOption.value);
      router.push({
        pathname: "/admin-dashboard/agent-templates/AgentTemplets",
        query: { activeId: selectedOption.value },
      });
    }
  };

  useEffect(() => {
    if (!isWorkSpaceLoading) {
      setActiveWorkspace(
        workSpaceData?.private_workspaces?.find(
          (workspace) => workspace.id === workspaceId
        )
      );
      setWorkspaceSelectOptions(
        workSpaceData?.private_workspaces?.map((workspace) => {
          return {
            value: workspace.id,
            label: workspace.workspace_name,
          };
        })
      );
    }
  }, [workSpaceData]);

  const handleProjectSelect = (selectedOption) => {
    setSelectedProjectId({
      project_id: selectedOption?.project_id,
      version_id: selectedOption?.latest_version,
      versions: selectedOption?.versions,
      project_name: selectedOption?.project_name,
    });
  };

  const handleSelectVersions = (selectedOption) => {
    setSelectedProjectId((prev) => ({
      ...prev,
      version_id: selectedOption?.id,
    }));
    setSelectedBranchName(selectedOption?.branch_name);
  };

  return (
    <div className="bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 py-1">
        <div className="flex items-center">
          <div
            onClick={() => router.push("/admin-dashboard/admin")}
            className="flex flex-col items-center z-10 cursor-pointer"
          >
            <Image src={logo} width={90} height={90} />
          </div>

          <div className="ml-6">
            <SelectWrapper
              options={workspaceSelectOptions}
              placeholder={activeWorkspace?.workspace_name}
              onSelect={handleSelect}
            />
          </div>

          <span className=" ml-4 mr-8 opacity-20">/</span>

          <SelectProjectName
            options={projects}
            onSelect={handleProjectSelect}
            width="w-72"
            setShowTemplateCard={setShowTemplateCard}
            defaultOption={projects[projects.length - 1]}
          />

          <SelectVersions
            options={slectedProjectId?.versions}
            defaultOption={
              slectedProjectId?.versions?.[
                slectedProjectId?.versions?.length - 1
              ]
            }
            onSelect={handleSelectVersions}
            width="w-36"
          />
        </div>

        {/* <div>Work Space</div> */}
        <div className="flex items-center">
          <h1>{name ? name : "Dieder Sachs"}</h1>
          <div className="text-xs ml-2 h-10 w-10 rounded-full bg-primary-accent-color text-white flex items-center justify-center flex-col">
            {avatar ? (
              <img
                src={avatar}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <>
                <p className="mx-1">Dieder</p>
                <div className="flex justify-center">Sachs</div>
              </>
            )}
          </div>
        </div>
      </div>
      <hr></hr>
    </div>
  );
};

export default AgentTemplateHeader;
