import axios from "axios";
import { useState } from "react";
import { useToast } from '../../../../context/ToastContext';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;

const useUploadFile = ({ slectedProjectId, workspaceId, getFileList }) => {
  const [isUplaodLoading, setIsUploadLoading] = useState(false);
  const { addToast } = useToast();

  const handleFileUpload = async (e) => {
    let selectedFile = e.target.files[0];
    setIsUploadLoading(true);
    const formData = new FormData();
    formData.append("files", selectedFile);
    formData.append("project_id", slectedProjectId?.project_id);
    formData.append("version_id", slectedProjectId?.version_id);
    formData.append("workspace_id", workspaceId);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/add_domain_knowledge`,
        formData
      );
      getFileList();
      addToast(response?.data?.message, 'success', 5000);
    } catch (error) {
      console.log(error, "error");
      addToast(error?.response?.data?.message || "Please upload valid file !", 'error', 5000);
    }
    setIsUploadLoading(false);
  };

  return {
    handleFileUpload,
    isUplaodLoading,
  };
};

export default useUploadFile;
