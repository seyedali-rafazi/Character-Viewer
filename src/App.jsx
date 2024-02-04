import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import "./App.css";
import CharectorDetails from "./Components/CharectorDetails";
import CharacterList from "./Components/CharectotList";
import Navbar from "./Components/Navbar";
import { SearchResult, Search, Favourit } from "./Components/Navbar";
import axios from "axios";

function App() {
  const [charecters, setCharecters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [slectedId, setSelectedId] = useState(null);
  const [myFavourit, setMyFavourit] = useState(() => {
    const storedFavourites = localStorage.getItem("FAVOURITS");
    return storedFavourites ? JSON.parse(storedFavourites) : [];
  });

  useEffect(() => {
    const controler = new AbortController();
    const signal = controler.signal;
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/?name=${query}`,
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
    // if (query.length < 3) {
    //   setCharecters([]);
    //   return;
    // }

    fetchData();

    return () => {
      controler.abort();
    };
  }, [query]);

  useEffect(() => {
    try {
      localStorage.setItem("FAVOURITS", JSON.stringify(myFavourit));
    } catch (error) {
      console.log("Error in useEffect:", error);
      toast.error(error.response?.data?.error || "An error occurred");
    }
  }, [myFavourit]);

  const handleSelectCharecter = (id) => {
    setSelectedId((prevId) => (prevId == id ? null : id));
  };
  const handelMyFavourits = (char) => {
    setMyFavourit((preFav) => [...preFav, char]);
  };
  const handelDeleteFavourit = (id) => {
    console.log(id);
    setMyFavourit((preFav) => preFav.filter((fav) => fav.id !== id));
  };

  const addedMyFavourit = myFavourit.map((fav) => fav.id).includes(slectedId);

  return (
    <div className="app">
      <Toaster />
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <SearchResult numOfResult={charecters.length} />
        <Favourit
          myFavourit={myFavourit}
          onDeleteFavourit={handelDeleteFavourit}
        />
      </Navbar>
      <Main charecters={charecters}>
        <CharacterList
          charecters={charecters}
          isLoading={isLoading}
          onSelectCharecter={handleSelectCharecter}
          slectedId={slectedId}
        />
        <CharectorDetails
          slectedId={slectedId}
          setIsLoading={setIsLoading}
          onAddFavourit={handelMyFavourits}
          addedMyFavourit={addedMyFavourit}
        />
      </Main>
    </div>
  );
}

export default App;

function Main({ children }) {
  return <div className="main">{children}</div>;
}
