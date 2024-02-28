import axios from "axios";
import { useState } from "react";
import { useToast } from '../../../../context/ToastContext';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;

const useRunLLM = ({ logsId, slectedProjectId }) => {
  const [isRunLLmLoading, setIsRunLLMloading] = useState(false);
  const { addToast } = useToast();

  const onRunLLM = async () => {
    setIsRunLLMloading(true);
    const formData = new FormData();
    formData.append("list_of_log_id", logsId);
    formData.append("version_id", slectedProjectId?.version_id);

    try {
      const response = await axios.post(`${API_BASE_URL}/auto_llm`, formData);
      addToast(response?.data?.message || "Created Successfully", 'success', 5000);
    } catch (error) {
      console.log(error, "error");
      addToast(error?.response?.data?.message || "Oops Something went wrong !", 'error', 5000);
    }
    setIsRunLLMloading(false);
  };

  return {
    onRunLLM,
    isRunLLmLoading,
  };
};

export default useRunLLM;
