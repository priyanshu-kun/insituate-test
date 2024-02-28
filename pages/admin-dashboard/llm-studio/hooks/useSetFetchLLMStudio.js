// fetch_llm_studio
import axios from "axios";
import { useEffect, useState } from "react";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;
import { useToast } from '../../../context/ToastContext';

const useSetFetchLLMStudio = () => {
  const [models, setModels] = useState({});
  const [isModelLoading, setIsModelLoading] = useState(true);
  const { addToast } = useToast()

  const getLLMStudio = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/fetch_llm_studio`);
      setModels(response.data);
      setIsModelLoading(false);
    } catch (error) {
      console.log(error, "error");
      addToast(error?.response?.data?.message, 'error', 5000);
      setIsModelLoading(false);
    }
  };

  useEffect(() => {
    getLLMStudio();
  }, [])

  return {
    models,
    isModelLoading,
  };
};

export default useSetFetchLLMStudio;
