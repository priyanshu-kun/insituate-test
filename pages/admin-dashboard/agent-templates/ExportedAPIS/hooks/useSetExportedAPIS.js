import axios from "axios";
import { useEffect, useState } from "react";
import { useToast } from '../../../../context/ToastContext';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;

const useGetExportedAPISData = () => {
  const [exportedAPIs = [], setExportedAPIs] = useState([]);
  const [isExportedAPISDataLoading, setIsExportedAPISDataLoading] = useState(true);
  const { addToast } = useToast();

  const getExportedAPISData = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/get_all_exported_apis`
      );
      setExportedAPIs(response.data);
      setIsExportedAPISDataLoading(false);
    } catch (error) {
      console.log(error, "error");
      addToast(error?.response?.data?.message, 'error', 5000);
      setIsExportedAPISDataLoading(false);
    }
  };

  useEffect(() => {
    getExportedAPISData();
  }, []);

  return {
    exportedAPIs,
    isExportedAPISDataLoading,
  };
};

export default useGetExportedAPISData;
