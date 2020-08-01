import {useState, useEffect} from 'react';
import { API } from '../api-service';
import { useCookies } from 'react-cookie';

// eslint-disable-next-line
function useFetch() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [token] = useCookies(['mr-token']) // movie rater token = name of cookie


    useEffect(() => {
        async function fetchData() {
            setLoading(true); // set loading 
            setError(); // refresh errors
            const data = await API.getMovies(token['mr-token']).catch(err => setError(error)) 
            setData(data)
            setLoading(false)
        }

        fetchData();
    }, []);
    return [data, loading, error]
}

export {useFetch}