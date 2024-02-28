import axios from "axios";
import { useState } from "react";
import { useToast } from '../../../../context/ToastContext';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;

const useResultLLMtime = ({ logsId, slectedProjectId }) => {
  const [isRunLoading, setIsRunloading] = useState(false);
  const [esitmatedTime, setEstimatedTime] = useState({});
  const { addToast } = useToast();

  const onRun = async () => {
    setIsRunloading(true);
    const formData = new FormData();
    formData.append("list_of_log_id", logsId);
    formData.append("version_id", slectedProjectId?.version_id);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/get_auto_llm_time`,
        formData
      );
      setEstimatedTime(response.data);
    } catch (error) {
      console.log(error, "error");
      addToast(error?.response?.data?.message || "Oops Something went wrong !", 'error', 5000);
    }
    setIsRunloading(false);
  };

  return {
    onRun,
    isRunLoading,
    esitmatedTime,
  };
};

export default useResultLLMtime;
