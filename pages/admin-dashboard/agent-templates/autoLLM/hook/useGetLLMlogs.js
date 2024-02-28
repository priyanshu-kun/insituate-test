import axios from "axios";
import { useEffect, useState } from "react";
import { useToast } from '../../../../context/ToastContext';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;

const useGetLLMlogs = ({ workspaceId, slectedProjectId }) => {
  const [logsResult, setLogsResult] = useState([]);
  const [isLogsResultLoading, setIsLogsResultLoading] = useState(true);
  const [isFileDownloadLoading, setIsFileDownloadLoading] = useState(false);
  const { addToast } = useToast();

  const { project_id, version_id } = slectedProjectId || {};
  const getProject = async () => {
    const formData = new FormData();
    formData.append("project_id", project_id);
    formData.append("version_id", version_id);
    formData.append("workspace_id", workspaceId);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/get_auto_llm_results_by_version_id`,
        formData
      );
      setLogsResult(response.data);
      setIsLogsResultLoading(false);
    } catch (error) {
      console.log(error, "error");
      addToast(error?.response?.data?.message, 'error', 5000);
      setIsLogsResultLoading(false);
    }
  };

  const onDownLoadFile = async (session_id) => {
    // window.open(session_id);
    setIsFileDownloadLoading(true);
    const formData = new FormData();
    // formData.append("project_id", project_id);
    // formData.append("version_id", version_id);
    // formData.append("workspace_id", workspaceId);
    formData.append("session_id", session_id);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/get_auto_llm_csv_by_session_id`,
        formData
      );
      addToast(response?.data?.message || "File downloaded successfully", 'success', 5000);
    } catch (error) {
      console.log(error, "error");
      addToast(error?.response?.data?.message, 'error', 5000);
    }
    setIsFileDownloadLoading(false);
  };

  useEffect(() => {
    getProject();
  }, []);

  return {
    logsResult,
    isLogsResultLoading,
    onDownLoadFile,
    isFileDownloadLoading,
  };
};

export default useGetLLMlogs;



// download_llm
// payload: {
//   name: <modal_name>,
//   link: <modal_url>
// }