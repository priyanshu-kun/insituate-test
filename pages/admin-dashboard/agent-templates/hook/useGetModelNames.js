import axios from "axios";
import { useEffect, useState } from "react";
import { useToast } from '../../../context/ToastContext';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;

const useGetModelNames = () => {
  const [names, setNames] = useState([]);
  const [isLoadingNames, setIsLoadingNames] = useState(true);
  const { addToast } = useToast();

  const getNames = async () => {
    try {
        const response = await axios.post(`${API_BASE_URL}/get_model_names`);
        if(response) {
            setNames(response.data);
        }
        setIsLoadingNames(false);
    } catch (error) {
      console.log(error, "error");
      addToast(error?.response?.data?.message, 'error', 5000);
      setIsLoadingNames(false);
    }
  };

  useEffect(() => {
    getNames();
  }, []);

  return {
    names,
    isLoadingNames,
  };
};

export default useGetModelNames;
