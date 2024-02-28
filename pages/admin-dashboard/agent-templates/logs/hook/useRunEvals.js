import axios from "axios";
import { useState } from "react";
import { useToast } from '../../../../context/ToastContext';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;

const useRunEvals = ({ getLogs, logsId, slectedProjectId }) => {
  const [isRunEvalLoading, setIsEvalsloading] = useState(false);
  const { addToast } = useToast();

  const onRunEvals = async () => {
    setIsEvalsloading(true);
    const formData = new FormData();
    formData.append("list_of_log_id", logsId);
    formData.append("version_id", slectedProjectId?.version_id);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/run_evals_by_version_id`,
        formData
      );

      addToast(response?.data?.message || "Data Fetched Successfully", 'success', 5000);
      getLogs();
    } catch (error) {
      console.log(error, "error");
      addToast(error?.response?.data?.message || "Oops Something went wrong !", 'error', 5000);
    }
    setIsEvalsloading(false);
  };

  return {
    onRunEvals,
    isRunEvalLoading,
  };
};

export default useRunEvals;
