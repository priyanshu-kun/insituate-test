import axios from "axios";
import { useEffect, useState } from "react";
import { useToast } from '../../../../context/ToastContext';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;

const useGetDomainKnowledge = ({ workspaceId, slectedProjectId }) => {
  const [fileList, setFileList] = useState([]);
  const [isFileListLoading, setIsFileListLoading] = useState(true);
  const { addToast } = useToast();

  const getFileList = async () => {
    const formData = new FormData();
    formData.append("workspace_id", workspaceId);
    formData.append("project_id", slectedProjectId?.project_id);
    formData.append("version_id", slectedProjectId?.version_id);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/get_domain_knowledge`,
        formData
      );
      setFileList(response.data);
      setIsFileListLoading(false);
    } catch (error) {
      console.log(error, "error");
      addToast(error?.response?.data?.message, 'error', 5000);
      setIsFileListLoading(false);
    }
  };

  useEffect(() => {
    getFileList();
  }, [slectedProjectId.project_id, slectedProjectId.version_id]);

  return {
    fileList,
    isFileListLoading,
    getFileList,
  };
};

export default useGetDomainKnowledge;
