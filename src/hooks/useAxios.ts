import { useEffect, useState } from "react";
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5215/api/v1/'

const useAxios = ({ url } : {url:string}) => {
    const [response, setResponse] = useState<Object>();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = () => {
            axios
                .get(url)
                .then(res => setResponse(res.data))
                .catch(err => setError(err))
                .finally(() => setLoading(false))
        }
        fetchData();
    }, [url]);
    return { response, error, loading }
};

export default useAxios
