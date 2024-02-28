import axios from "axios";
import { useEffect, useState } from "react";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;
import { useToast } from '../../../context/ToastContext';

const useGetEmployees = () => {
  const [employees, setEmployees] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { addToast } = useToast()

  const getEmployees = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/get_employees`);
      setEmployees(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error, "error");
      addToast(error?.response?.data?.message, 'error', 5000)
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return {
    employees,
    isLoading,
    getEmployees,
  };
};

export default useGetEmployees;
