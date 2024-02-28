import axios from "axios";
import { useEffect, useState } from "react";
import { useToast } from '../../../../context/ToastContext';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;

const useGetLogs = ({ workspaceId, slectedProjectId }) => {
  const { project_id, version_id } = slectedProjectId || {};
  const [logs, setLogs] = useState([]);
  const [isLogsLoading, setIsLogsLoading] = useState(true);
  const { addToast } = useToast();

  const getLogs = async () => {
    const formData = new FormData();
    formData.append("workspace_id", workspaceId);
    formData.append("version_id", version_id);
    formData.append("project_id", project_id);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/get_logs_by_version_id`,
        formData
      );
      setLogs(response.data.logs);
      setIsLogsLoading(false);
    } catch (error) {
      console.log(error, "error");
      addToast(error?.response?.data?.message, 'error', 5000);
      setIsLogsLoading(false);
    }
  };

  useEffect(() => {
    getLogs();
  }, []);

  return {
    logs,
    isLogsLoading,
    getLogs,
  };
};

export default useGetLogs;
