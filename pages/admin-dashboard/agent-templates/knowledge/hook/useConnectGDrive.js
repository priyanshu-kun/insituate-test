import axios from "axios";
import { useState } from "react";
import { useToast } from '../../../../context/ToastContext';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;


const useConnectGDrive = () => {

    const [isUploading, setIsUploading] = useState(true);
    const { addToast } = useToast();

    const connectWithGDrive = async ({ credentials_path, token_path, pydrive_creds_path, folder_id, project_id  }) => {
        try {
            const formData = new FormData();
            formData.append('credentials_path', credentials_path);
            formData.append('token_path', token_path);
            formData.append('pydrive_creds_path', pydrive_creds_path);
            formData.append('folder_id', folder_id);
            formData.append('project_id', project_id);
            await axios.post(`${API_BASE_URL}/load-data-from-google-drive`, formData);
            addToast("Google Drive data uploaded successfully.", 'success', 5000);
            setIsUploading(false);
        }
        catch(error) {
            console.log(error, "error");
            addToast(error?.response?.data?.message, 'error', 5000);
            setIsUploading(false);
        }
    }

    return {
        isUploading,
        connectWithGDrive
    }
}

export default useConnectGDrive;