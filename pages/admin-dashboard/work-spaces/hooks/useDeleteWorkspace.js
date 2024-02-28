import axios from "axios";
import { useState } from "react";
import { useToast } from '../../../context/ToastContext';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;


const useDeleteWorkspace = () => {

    const [isWorkspaceDeleted, setIsWorkspaceDeleted] = useState(true);
    const { addToast } = useToast();

    const deleteWorkspace = async (id) => {
        try {
            const formData = new FormData();
            formData.append('workspace_id', id);
            await axios.post(`${API_BASE_URL}/delete_workspace`, formData);
            setIsWorkspaceDeleted(false);
            addToast('Workspace Deleted Successfully.', 'success', 5000);
        }
        catch(error) {
            setIsWorkspaceDeleted(false);
            addToast('Something went wrong.', 'error', 5000);
        }
    }

    return {
        isWorkspaceDeleted,
        deleteWorkspace        
    }
}

export default useDeleteWorkspace;