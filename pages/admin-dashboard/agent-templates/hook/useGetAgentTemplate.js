import axios from "axios";
import { useEffect, useState } from "react";
import { useToast } from '../../../context/ToastContext';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;

const useGetAgentTemplate = () => {
  const [projects, setProjects] = useState([]);
  const [isProjectLoading, setIsProjectLoading] = useState(true);
  const { addToast } = useToast();

  const getProject = async (workspaceId) => {
    const formData = new FormData();
    formData.append("workspace_id", workspaceId);
    try {
      if (workspaceId !== undefined) {
        const response = await axios.post(
          `${API_BASE_URL}/get_projects_by_workspace_id`,
          formData
        );
        setProjects(response.data);
        setIsProjectLoading(false);
      }
    } catch (error) {
      console.log(error, "error");
      addToast(error?.response?.data?.message, 'error', 5000)
      setIsProjectLoading(false);
    }
  };

  return {
    projects,
    isProjectLoading,
    getProject,
  };
};

export default useGetAgentTemplate;
