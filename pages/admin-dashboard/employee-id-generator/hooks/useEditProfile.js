import axios from "axios";
import { useState } from "react";
import { useToast } from '../../../context/ToastContext';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;

const useEditProfile = ({ editProfile, getEmployees, setEditName }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();

  const onEditProfile = async (e) => {
    const formData = new FormData();
    formData.append("id", editProfile.id);
    formData.append("name", editProfile.name);
    setIsLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_BASE_URL}/edit_employee`,
        formData
      );

      setIsLoading(false);
      addToast(response?.data?.message, 'success', 5000);
      getEmployees();
      setEditName(false);
    } catch (error) {
      console.log(error, "error");
      addToast(error?.response?.data?.message, 'error', 5000);
    }
    setIsLoading(false);
  };

  return {
    onEditProfile,
    isLoading,
  };
};

export default useEditProfile;
