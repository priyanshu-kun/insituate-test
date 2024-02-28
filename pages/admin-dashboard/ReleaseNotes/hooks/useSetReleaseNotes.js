import { useEffect, useState } from 'react'
import axios from "axios";
import { useToast } from '../../../context/ToastContext';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;

const useSetReleaseNotes = () => {

    const [notes, setNotes] = useState([]);
    const [isNotesLoading, setIsNotesLoading] = useState(true);
    const { addToast } = useToast();

    const getReleaseNotes = async () => {
        try {
            const response = await axios.post(`${API_BASE_URL}/get_release_notes`, {});
            setNotes(response.data);
            setIsNotesLoading(false);
        }
        catch(error) {
            addToast("Something went wrong.", 'error', 5000);
            setIsNotesLoading(false);
        }
    }

    return {
        getReleaseNotes, notes, isNotesLoading
    }
}

export default useSetReleaseNotes;