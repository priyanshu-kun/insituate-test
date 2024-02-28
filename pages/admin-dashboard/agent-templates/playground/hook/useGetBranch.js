import axios from "axios";
import { useState } from "react";
import { useToast } from '../../../../context/ToastContext';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;

const useGetBranch = ({
  workspaceId,
  slectedProjectId,
  branchName,
  progress,
  selectedModel,
  projectInfo,
  updatedInstructions,
  getProject,
  setShowBranchModal,
}) => {
  const [onCreateLoading, setOncreateLoading] = useState(false);
  const capabilities = {
    text: "True",
    file: "False",
    web_browsing: "False",
  };
  const { addToast } = useToast();

  const onBranchCreate = async (e) => {
    e.preventDefault();
    setOncreateLoading(true);
    const formData = new FormData();

    formData.append("project_id", slectedProjectId?.project_id);
    formData.append("workspace_id", workspaceId);
    formData.append("branch_name", branchName);

    formData.append("source", "testing");
    formData.append("model_name", selectedModel);
    formData.append("project_desc", projectInfo?.project_desc);
    formData.append("project_name", projectInfo?.project_name);
    formData.append("instructions", updatedInstructions);
    formData.append("temp", progress?.temp);
    formData.append("max_new_tokens", progress?.max_new_tokens);
    formData.append("top_p", progress?.top_p);
    formData.append("top_k", progress?.top_k);
    formData.append("repetition_penalty", progress?.repetition_penalty);
    formData.append("domain_knowledge", true);
    formData.append("capabilities", JSON.stringify(capabilities));

    try {
      const response = await axios.post(
        `${API_BASE_URL}/branch_version`,
        formData
      );
      if (response) {
        addToast(response.data.message || "Branch created Successfully", 'success', 5000);
      }
      setTimeout(() => {
        getProject(workspaceId);
        setShowBranchModal();
      }, [1000]);
    } catch (error) {
      console.log(error, "error");
      addToast(error?.response?.data?.message || "Oops Somthing went wrong", 'error', 5000);
    }
    setOncreateLoading(false);
  };

  return {
    onCreateLoading,
    onBranchCreate,
  };
};

export default useGetBranch;
