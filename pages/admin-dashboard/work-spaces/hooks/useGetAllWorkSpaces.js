import axios from "axios";
import { useEffect, useContext, useState } from "react";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;
import { UserContext } from "../../../_app";
import { useToast } from '../../../context/ToastContext';

const useGetAllWorkSpaces = () => {
  const [workSpaceData, setWorkSpaceData] = useState([]);
  const [isWorkSpaceLoading, setIsWorkSpaceLoading] = useState(true);
  const userData = useContext(UserContext);
  const { userDetails } = userData;
  const { addToast } = useToast();

  const getAllWorkSpace = async () => {
    const formData = new FormData();
    formData.append("id", userDetails?.id);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/get_workspaces`,
        formData
      );
      setWorkSpaceData(response.data);
      setIsWorkSpaceLoading(false);
    } catch (error) {
      console.log(error, "error");
      addToast(error?.response?.data?.message, 'error', 5000)
      setIsWorkSpaceLoading(false);
    }
  };
  useEffect(() => {
    if(userDetails?.id) {
      getAllWorkSpace();
    }
  }, [userDetails]);

  return {
    workSpaceData,
    isWorkSpaceLoading,
    getAllWorkSpace,
  };
};

export default useGetAllWorkSpaces;
