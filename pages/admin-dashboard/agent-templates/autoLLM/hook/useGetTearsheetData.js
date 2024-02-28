import axios from "axios";
import { useEffect, useState } from "react";
import { useToast } from '../../../../context/ToastContext';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;

const useGetTearsheetData = () => {

  const [tearsheetData, setTearsheetData] = useState([]);
  const [isTearsheetDataLoading, setIsTearsheetDataLoading] = useState(true);
  const { addToast } = useToast();

  const getTearsheetData = async ({ log_id, iteration_id, version_id, session_id }) => {
    const formData = new FormData();
    formData.append("log_id", log_id);
    formData.append("iteration_id", iteration_id);
    formData.append("version_id", version_id);
    formData.append("session_id", session_id);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/get_auto_llm_tearsheet_by_session_id`,
        formData
      );
      setTearsheetData(response.data);
      console.log(response.data)
      setIsTearsheetDataLoading(false);
    } catch (error) {
      console.log(error, "error");
      addToast(error?.response?.data?.message, 'error', 5000);
      setIsTearsheetDataLoading(false);
    }
  };

  return {
    tearsheetData,
    isTearsheetDataLoading,
    getTearsheetData
  };

}


export default useGetTearsheetData;