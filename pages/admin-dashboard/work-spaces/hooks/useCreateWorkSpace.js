import React, { useContext } from "react";
import axios from "axios";
import { useState } from "react";
import { UserContext } from "../../../_app";
import { useRouter } from "next/router";
import { useToast } from '../../../context/ToastContext';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;

const useCreateWorkSpace = ({ workSpaceName, templateIds, isChangeRoute = true }) => {
  const router = useRouter();
  const [isCreateLoading, setIsCreateLoading] = useState(false);
  const user = useContext(UserContext);
  const { userDetails } = user || {};
  const { id, name } = userDetails || {};
  const { addToast } = useToast();
  const handleRoute = (workspace_id) => {
    if (workspace_id !== "") {
      router.push({
        pathname: "/admin-dashboard/agent-templates/AgentTemplets",
        query: { activeId: workspace_id },
      });
    }
  };

  const onCreate = async () => {
    setIsCreateLoading(true);
    const formData = new FormData();
    formData.append("template_ids", templateIds);
    formData.append("workspace_name", workSpaceName);
    formData.append("created_by_id", id);
    formData.append("created_by_name", name);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/create_workspace`,
        formData
      );
      addToast(response?.data?.message || "Created Successfully", 'success', 5000);
      if(isChangeRoute) {
        setTimeout(() => {
          handleRoute(response?.data?.workspace_id);
        }, 1000);
      }
    } catch (error) {
      console.log(error, "error");
      addToast(error?.response?.data?.message || "Oops Something went wrong!", 'error', 5000);
    }
    setIsCreateLoading(false);
  };

  return {
    onCreate,
    isCreateLoading,
  };
};

export default useCreateWorkSpace;
