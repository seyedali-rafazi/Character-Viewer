import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useLocalStorage(key,initialState){
    const [value, setValue] = useState(() => {
        const storedFavourites = localStorage.getItem(key);
        return storedFavourites ? JSON.parse(storedFavourites) : initialState;
      });
    
      useEffect(() => {
        try {
          localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
          console.log("Error in useEffect:", error);
          toast.error(error.response?.data?.error || "An error occurred");
        }
      }, [value]);

      return[value ,setValue]
}