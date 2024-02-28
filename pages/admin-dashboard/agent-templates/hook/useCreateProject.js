import axios from "axios";
import { useState } from "react";
import { useToast } from '../../../context/ToastContext';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;

const useCreateProject = ({
  getConfig = () => {},
  projectInfo = {},
  workspaceId,
  setShowTemplateCard,
  setSelectedProjectId,
  getProject,
}) => {
  const [onCreateLoading, setOncreateLoading] = useState(false);
  const { addToast } = useToast();

  const onCreate = async (departmentId, e) => {
    e.preventDefault();
    setOncreateLoading(true);
    const formData = new FormData();
    if (departmentId !== "skip") {
      formData.append("template_id", departmentId);
    }
    formData.append("workspace_id", workspaceId);
    if (projectInfo.projectName !== "") {
      formData.append("project_name", projectInfo?.projectName);
      formData.append("project_desc", projectInfo?.projectDesc);
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/create_project_by_workspace_id`,
        formData
      );
      if (response) {
        addToast(response.data.message || "Project created Successfully", 'success', 5000)
      }
      setSelectedProjectId((prev) => ({
        ...prev,
        project_id: response.data.project_id,
        version_id: response.data.version_id,
      }));

      setTimeout(() => {
        getProject();
        setShowTemplateCard(false);
      }, 2000);
    } catch (error) {
      console.log(error, "error");
      addToast(error?.response?.data?.message || "Oops Somthing went wrong", 'error', 5000)
    }
    setOncreateLoading(false);
  };

  return {
    onCreateLoading,
    onCreate,
  };
};

export default useCreateProject;
