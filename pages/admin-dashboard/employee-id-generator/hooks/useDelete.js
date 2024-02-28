import axios from "axios";
import { useState } from "react";
import { useToast } from '../../../context/ToastContext';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;

const useDelete = ({ id, setDeleteId = () => {}, getEmployees }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();

  const onDeleteId = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", id);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/delete_employee`,
        formData
      );
      getEmployees();
      setDeleteId(false);
      setIsLoading(false);
      addToast(response?.data?.message, 'success', 5000)
    } catch (error) {
      console.log(error, "error");
      setIsLoading(false);
      addToast(error?.response?.data?.error, 'error', 5000)
    }
  };

  return {
    isLoading,
    onDeleteId,
  };
};

export default useDelete;
