// edit_workspace

import axios from "axios";
import { useEffect, useState } from "react";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;
import { useToast } from '../../../context/ToastContext';

const useEditWorkspace = () => {
  const [updatedWorkspace, setUpdatedWorkspace] = useState([]);
  const { addToast } = useToast();
  const [isUpdatedWorkspaceLoading, setIsUpdatedWorkspaceLoading] =
    useState(true);

  const editWorkspace = async ({ workspace_name, description, id, tagline }) => {
    const formData = new FormData();
    formData.append("workspace_name", workspace_name);
    formData.append("tagline", tagline);
    formData.append("description", description);
    formData.append("id", id);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/edit_workspace`,
        formData
      );
      setUpdatedWorkspace(response.data);
      setIsUpdatedWorkspaceLoading(false);
      addToast('Workspace is edited successfully.', 'success', 5000)
    } catch (error) {
      console.log(error, "error");
      addToast(error?.response?.data?.message, 'error', 5000)
      setIsUpdatedWorkspaceLoading(false);
    }
  };

  return {
    updatedWorkspace,
    isUpdatedWorkspaceLoading,
    editWorkspace,
  };
};

export default useEditWorkspace;
