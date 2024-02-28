import axios from "axios";
import { useEffect, useState } from "react";
import { useToast } from '../../../context/ToastContext';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;

const useBuilder = ({
  workspaceId,
  slectedProjectId,
  setInputMessage,
  inputMessage,
  messageList = [],
  setMessageList = () => {},
  getConfig = () => {},
}) => {
  const [isMessageLoading, setIsMessageLoading] = useState(false);
  const { addToast } = useToast();

  const formattedMessageList = messageList.map(({ user, builder }) => ({
    user,
    builder,
  }));

  const [ragData, setRagData] = useState([]);

  const onSend = async () => {
    setMessageList([...messageList, { user: inputMessage }]);
    const newInputMessage = inputMessage;
    setInputMessage("");
    setIsMessageLoading(true);
    const formData = new FormData();
    formData.append("user_message", newInputMessage);
    formData.append("project_id", slectedProjectId?.project_id);
    formData.append("version_id", slectedProjectId?.version_id);
    formData.append("workspace_id", workspaceId);
    formData.append("message_list", JSON.stringify(formattedMessageList));

    try {
      const response = await axios.post(
        `${API_BASE_URL}/get_builder_response`,
        formData
      );
      setMessageList([
        ...messageList,
        { user: newInputMessage, builder: response.data.builder_response },
      ]);
      getConfig();
    } catch (error) {
      console.log(error, "error");
      addToast(error?.response?.data?.message || "Oops Something went wrong !", 'error', 5000)
    }
    setIsMessageLoading(false);
  };

  const getRagData = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/get_rag_templates`);
      setRagData(response.data);
    } catch (error) {
      console.log(error, "error");
      addToast(error?.response?.data?.message || "Oops Something went wrong !", 'error', 5000)
    }
  };

  useEffect(() => {
    getRagData();
  }, []);

  return {
    onSend,
    isMessageLoading,
    ragData,
  };
};

export default useBuilder;
