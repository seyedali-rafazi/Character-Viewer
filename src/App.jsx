import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import "./App.css";
import CharectorDetails from "./Components/CharectorDetails";
import CharacterList from "./Components/CharectotList";
import Navbar from "./Components/Navbar";
import { SearchResult, Search, Favourit } from "./Components/Navbar";
import useCharecter from "./Hooks/useCharecter";
import useLocalStorage from "./Hooks/useLocalStorage";

function App() {
  const [query, setQuery] = useState("");
  const { isLoading, charecters } = useCharecter(
    "https://rickandmortyapi.com/api/character/?name",
    query
  );
  const [slectedId, setSelectedId] = useState(null);
  const [myFavourit, setMyFavourit] = useLocalStorage("FAVOURITS", []);

  // const [myFavourit, setMyFavourit] = useState(() => {
  //   const storedFavourites = localStorage.getItem("FAVOURITS");
  //   return storedFavourites ? JSON.parse(storedFavourites) : [];
  // });

  // useEffect(() => {
  //   try {
  //     localStorage.setItem("FAVOURITS", JSON.stringify(myFavourit));
  //   } catch (error) {
  //     console.log("Error in useEffect:", error);
  //     toast.error(error.response?.data?.error || "An error occurred");
  //   }
  // }, [myFavourit]);

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
