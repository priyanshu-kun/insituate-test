import React from "react";
import axios from "axios";
import { useState } from "react";
import { useToast } from '../../../../context/ToastContext';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;

const useDeleteFile = ({ workspaceId, slectedProjectId, getFileList }) => {
  const [isDeleteLoaoing, setIsDeleteLoading] = useState(false);
  const { addToast } = useToast();

  const onDelete = async (filename) => {
    setIsDeleteLoading(true);
    const formData = new FormData();
    formData.append("filenames", [filename]);
    formData.append("project_id", slectedProjectId?.project_id);
    formData.append("version_id", slectedProjectId?.version_id);
    formData.append("workspace_id", workspaceId);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/delete_domain_knowledge`,
        formData
      );
      addToast(response?.data?.message, 'success', 5000);
      getFileList();
    } catch (error) {
      console.log(error, "error");
      addToast(error?.response?.data?.message || "Oops Something went wrong !", 'error', 5000);
    }
    setIsDeleteLoading(false);
  };

  return {
    onDelete,
    isDeleteLoaoing,
  };
};

export default useDeleteFile;
