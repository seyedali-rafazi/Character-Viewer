import { EyeIcon } from "@heroicons/react/24/outline";
import { EyeSlashIcon } from "@heroicons/react/24/outline";
import Loader from "./Loader";

function CharacterList({
  charecters,
  isLoading,
  onSelectCharecter,
  slectedId,
}) {
  if (isLoading) {
    return (
      <div className="characters-list">
        <Loader />
      </div>
    );
  }

  return (
    <div className="characters-list">
      {charecters.map((item) => (
        <Character key={item.id} item={item}>
          <button
            className="icon red"
            onClick={() => onSelectCharecter(item.id)}
          >
            {slectedId == item.id ? <EyeSlashIcon /> : <EyeIcon />}
          </button>
        </Character>
      ))}
    </div>
  );
}

export function Character({ item, children }) {
  return (
    <div className="list__item info">
      <img src={item.image} alt={item.name} />
      <ChrecterName item={item} />
      <CharectorInfo item={item} />
      {children}
    </div>
  );
}

export default CharacterList;

function ChrecterName({ item }) {
  return (
    <h3 className="name">
      <span>{item.gender == "Male" ? "👨‍🦱" : "👩‍🦱"}</span>
      <span>{item.name}</span>
    </h3>
  );
}

function CharectorInfo({ item }) {
  return (
    <div className="list-item__info">
      <span className={`status ${item.status == "Dead" ? "red" : ""}`}></span>
      <span> {item.status} </span>
      <span> - {item.species}</span>
    </div>
  );
}
