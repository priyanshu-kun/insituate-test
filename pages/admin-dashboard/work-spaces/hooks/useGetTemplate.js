import axios from "axios";
import { useEffect, useState } from "react";
import { useToast } from '../../../context/ToastContext';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;

const useGetTemplate = ({ departmentId }) => {
  const [templateData, setTemplateData] = useState([]);
  const [isTemplateLoading, setIsTemplateLoading] = useState(true);
  const { addToast } = useToast();

  const getAllTemplate = async () => {
    const formData = new FormData();
    formData.append("department_id", departmentId);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/get_templates_by_department_id`,
        formData
      );
      setTemplateData(response.data);
      setIsTemplateLoading(false);
    } catch (error) {
      console.log(error, "error");
      addToast(error?.response?.data?.message, 'error', 5000)
      setIsTemplateLoading(false);
    }
  };
  useEffect(() => {
    getAllTemplate();
  }, []);

  return {
    templateData,
    isTemplateLoading,
  };
};

export default useGetTemplate;
