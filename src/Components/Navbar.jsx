import React, { useState } from "react";
import Modal from "./Modal";
import { Character } from "./CharectotList";
import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";

function Navbar({ children }) {
  return (
    <nav className="navbar">
      <Lego />
      {children}
    </nav>
  );
}

export default Navbar;

function Lego() {
  return <div className="navbar__logo">LOGO</div>;
}

export function Search({ query, setQuery }) {
  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      type="text"
      className="text-field "
      placeholder="Search..."
    />
  );
}

export function SearchResult({ numOfResult }) {
  return <div className="navbar__result">Found {numOfResult} Character</div>;
}

export function Favourit({ myFavourit, onDeleteFavourit }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
      <Modal onOpen={setIsOpen} open={isOpen} title="List Of Favourits">
        {myFavourit.map((item) => (
          <Character key={item.id} item={item}>
            <button
              className="icon red"
              onClick={() => onDeleteFavourit(item.id)}
            >
              <TrashIcon />
            </button>
          </Character>
        ))}
      </Modal>
      <button className="heart" onClick={handleClick}>
        <HeartIcon className="icon" />
        <span className="badge">{myFavourit.length}</span>
      </button>
    </>
  );
}
