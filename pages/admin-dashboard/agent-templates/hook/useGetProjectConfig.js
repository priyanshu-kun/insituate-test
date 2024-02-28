import axios from "axios";
import { useEffect, useState } from "react";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;

const useGetProjectConfig = ({ workspaceId, slectedProjectId }) => {
  const [projectConfig, setProjectConfig] = useState({});
  const [configLoading, setConfigLoading] = useState(true);
  const { project_id, version_id } = slectedProjectId || {};

  const getConfig = async () => {
    const formData = new FormData();
    formData.append("workspace_id", workspaceId);
    formData.append("project_id", project_id);
    formData.append("version_id", version_id);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/get_project_configs_by_version_id`,
        formData
      );
      setProjectConfig(response?.data);
      setConfigLoading(false);
    } catch (error) {
      setConfigLoading(false);
      return {};
    }
  };

  useEffect(() => {
    if (project_id !== "" && version_id !== "" && workspaceId !== "" ) {
        getConfig();
    }
  }, [project_id, version_id, workspaceId]);

  return {
    projectConfig,
    configLoading,
    getConfig,
  };
};

export default useGetProjectConfig;
