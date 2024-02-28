import axios from "axios";
import { useState } from "react";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;
import { useToast } from "../../../context/ToastContext";

const useDownloadModel = () => {
  const [isDownloadLoading, setIsDownloadLoading] = useState(true);
  const { addToast } = useToast();

  const startDownload = async (payload) => {
    try {
      const formData = new FormData();
      formData.append("name", payload.name);
      formData.append("link", payload.link);
      await axios.post(`${API_BASE_URL}/download_llm`, formData);
      setIsDownloadLoading(false);
      addToast("Download Started Successfully.", "success", 5000);
    } catch (error) {
      console.log(error, "error");
      addToast(error?.response?.data?.message, "error", 5000);
      setIsModelLoading(false);
    }
  };

  return {
    isDownloadLoading,
    startDownload,
  };
};

export default useDownloadModel;
