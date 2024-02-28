import axios from "axios";
import { useState } from "react";
import { useToast } from '../../../../context/ToastContext';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;

const useGetExportAPIdata = ({
  workspaceId,
  slectedProjectId,
  setExportAPImodal,
}) => {
  const [exportAPIdata, setExportAPIdata] = useState({});
  const [isExportAPIloading, setIsExportAPIloading] = useState(false);
  const [hyperparamSuggestionData, setHyperparamSuggestionData] = useState();
  const { addToast } = useToast();

  const getExportAPIdata = async () => {
    setIsExportAPIloading(true);
    const formData = new FormData();
    formData.append("workspace_id", workspaceId);
    formData.append("project_id", slectedProjectId?.project_id);
    formData.append("version_id", slectedProjectId?.version_id);
    try {
      const response = await axios.post(`${API_BASE_URL}/export_api`, formData);
      addToast(response.data.message || "API exported successfully", 'success', 5000)
      setTimeout(() => {
        setExportAPIdata(response.data);
        setExportAPImodal(true);
      }, 1000);
    } catch (error) {
      console.log(error, "err");
      addToast(error?.response?.data?.message, 'error', 5000)
    }
    setIsExportAPIloading(false);
  };

  const getHyperparamSuggestion = async () => {
    const formData = new FormData();
    formData.append("workspace_id", workspaceId);
    formData.append("project_id", slectedProjectId?.project_id);
    formData.append("version_id", slectedProjectId?.version_id);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/hyperparams_suggestion`,
        formData
      );
      setHyperparamSuggestionData(response.data);
    } catch (error) {
      console.log(error, "err");
      addToast(error?.response?.data?.message, 'error', 5000)
    }
  };

  return {
    getExportAPIdata,
    isExportAPIloading,
    exportAPIdata,
    getHyperparamSuggestion,
    hyperparamSuggestionData,
  };
};

export default useGetExportAPIdata;
