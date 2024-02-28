import axios from "axios";
import { useState } from "react";
import { useToast } from '../../../context/ToastContext';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;

const useEnhance = ({ workspaceId, slectedProjectId, setShowPrompt }) => {
  const [promptList, setPromplist] = useState({});
  const [isPromptLoading, setIsPromptLoading] = useState(false);
  const { addToast } = useToast();

  const handleEnhance = async () => {
    setIsPromptLoading(true);
    const formData = new FormData();
    formData.append("workspace_id", workspaceId);
    formData.append("project_id", slectedProjectId?.project_id);
    formData.append("version_id", slectedProjectId?.version_id);

    try {
      const response = await axios.post(`${API_BASE_URL}/enhance`, formData);
      setPromplist(response?.data);
      setShowPrompt(true);
    } catch (error) {
      console.log(error, "error");
      addToast(error?.response?.data?.message, 'error', 5000)
    }
    setIsPromptLoading(false);
  };

  return {
    promptList,
    isPromptLoading,
    handleEnhance,
  };
};

export default useEnhance;
