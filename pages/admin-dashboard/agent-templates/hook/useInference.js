import axios from "axios";
import { useState } from "react";
import { useToast } from '../../../context/ToastContext';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;

const useInference = ({
  workspaceId,
  slectedProjectId,
  inputQuery,
  getConfig,
  progress,
  selectedModel,
  projectInfo,
  updatedInstructions,
}) => {
  const [queryData, setQueryData] = useState(null);
  const [isInferenceLoading, setIsInferenceLoading] = useState(false);
  const { addToast } = useToast();

  const capabilities = {
    text: "True",
    file: "False",
    web_browsing: "False",
  };

  const onRunQuery = async () => {
    setIsInferenceLoading(true);
    const formData = new FormData();
    formData.append("workspace_id", workspaceId);
    formData.append("project_id", slectedProjectId?.project_id);
    formData.append("version_id", slectedProjectId?.version_id);
    formData.append("query", inputQuery?.queryText);
    formData.append("files", inputQuery?.queryFile);
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
      const response = await axios.post(`${API_BASE_URL}/inference`, formData);
      setQueryData(response?.data);
      getConfig();
    } catch (error) {
      console.log(error, "error");
      addToast(error?.response?.data?.message, 'error', 5000)
    }
    setIsInferenceLoading(false);
  };

  return {
    queryData,
    isInferenceLoading,
    onRunQuery,
  };
};

export default useInference;
