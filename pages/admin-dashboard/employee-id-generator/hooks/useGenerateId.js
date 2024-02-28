import axios from "axios";
import { useState } from "react";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;
import { useToast } from '../../../context/ToastContext';

const useGenerateId = ({ employeeName, getEmployees }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [genearatedIdPassword, setGenerateIdPassword] = useState({});
  const { addToast } = useToast();

  const onGenerate = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", employeeName);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/generate_id`,
        formData
      );
      setGenerateIdPassword(response.data);
      setIsLoading(false);
      addToast(response?.data?.message || "Id generated successfully", 'success', 5000);
      getEmployees();
    } catch (error) {
      console.log(error, "error");
      addToast(error?.response?.data?.message, 'error', 5000);
    }
    setIsLoading(false);
  };
  return {
    isLoading,
    onGenerate,
    genearatedIdPassword,
  };
};

export default useGenerateId;
