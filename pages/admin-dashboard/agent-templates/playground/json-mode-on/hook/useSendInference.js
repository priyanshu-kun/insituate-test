import axios from "axios";
import { useState } from "react";
import { useToast } from '../../../../../context/ToastContext';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;

const useSendInference = ({
  workspaceId,
  slectedProjectId,
  getConfig,
  progress,
  selectedModel,
  projectInfo,
  updatedInstructions,
  inputQuery,
  // isToggleOn,
  // isQueryToggleOn,
  isResponseToggleOn,
  isInputToggleOn,
  keyValuePairs,
  selectedIndices,
  selectedItems,
  outputKey,
  cached
}) => {
  const [queryData, setQueryData] = useState(null);
  const [isInferenceLoading, setIsInferenceLoading] = useState(false);
  const { addToast } = useToast();

  const capabilities = {
    text: "True",
    file: "False",
    web_browsing: "False",
  };

  const onSendQuery = async () => {
    setIsInferenceLoading(true);
    const formData = new FormData();
    const selectedPairs = keyValuePairs.filter((_, index) =>
      selectedIndices.includes(index)
    );
    if (isInputToggleOn) {
      selectedPairs.forEach((item) => {
        const key = item.key;
        const value = item.value;
        formData.append(key, value);
      });
    } else {
      if (inputQuery?.queryText !== "") {
        formData.append("query", inputQuery?.queryText);
      }
      if (inputQuery?.queryFile instanceof File) {
        formData.append("files", inputQuery?.queryFile);
      }
    }
    const selectedOutputField = outputKey.filter((_, index) =>
      selectedItems.includes(index)
    );
    if (selectedOutputField.length > 0 && isResponseToggleOn) {
      formData.append("output_field", selectedOutputField);
    }

    formData.append("workspace_id", workspaceId);
    formData.append("project_id", slectedProjectId?.project_id);
    formData.append("version_id", slectedProjectId?.version_id);
    formData.append("source", "testing");
    formData.append("model_name", selectedModel);
    formData.append("project_desc", projectInfo?.project_desc);
    formData.append("project_name", projectInfo?.project_name);
    formData.append("instructions", updatedInstructions);
    formData.append("temp", progress?.temp);
    formData.append("max_new_tokens", progress?.max_new_tokens);
    formData.append("top_p", progress?.top_p);
    formData.append("top_k", progress?.top_k);
    formData.append("input_json_mode", isInputToggleOn);
    formData.append("output_json_mode", isResponseToggleOn);
    formData.append("repetition_penalty", progress?.repetition_penalty);
    formData.append("domain_knowledge", true);
    formData.append("capabilities", JSON.stringify(capabilities));
    formData.append("cache", cached);

    try {
      const response = await axios.post(`${API_BASE_URL}/inference`, formData);
      setQueryData(response?.data);
      getConfig();
    } catch (error) {
      console.log(error, "error");
      addToast(error?.response?.data?.message || "Oops somthing went wrong!", 'error', 5000);
    }
    setIsInferenceLoading(false);
  };

  return {
    queryData,
    isInferenceLoading,
    onSendQuery,
  };
};

export default useSendInference;
