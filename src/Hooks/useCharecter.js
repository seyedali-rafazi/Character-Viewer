import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


export default function useCharecter(url,query){
    const [charecters, setCharecters] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const controler = new AbortController();
        const signal = controler.signal;
        async function fetchData() {
          try {
            setIsLoading(true);
            const { data } = await axios.get(
              `${url}=${query}`,
              { signal }
            );
            setCharecters(data.results.slice(0, 5));
            console.log(data.results);
          } catch (err) {
            if (!axios.isCancel()) {
              setCharecters([]);
              toast.error(err.response.data.error);
            }
          } finally {
            setIsLoading(false);
          }
        }
    
        fetchData();
    
        return () => {
          controler.abort();
        };
      }, [query]);

      return{isLoading ,charecters}
}