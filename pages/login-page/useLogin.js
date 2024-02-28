'use client';
import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../_app";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";
import { useToast } from '../context/ToastContext';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;

const useLogin = ({ idPassword }) => {
  const [isLoading, setIsLoading] = useState(false);
  const userData = useContext(UserContext);
  const { setUserDetails = () => {} } = userData || {};
  const router = useRouter();
  const { addToast } = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("id", idPassword.id);
    formData.append("password", idPassword.password);

    try {
      const response = await axios.post(`${API_BASE_URL}/login`, formData);
      setUserDetails(response.data);
      router.push("/quick-setup");
      addToast('Welcome to the Insituate.', 'success', 5000)
    } catch (error) {
      addToast(error?.response?.data?.error, 'error', 5000)
    }
    setIsLoading(false);
  };
  return {
    isLoading,
    handleLogin,
  };
};

export default useLogin;
