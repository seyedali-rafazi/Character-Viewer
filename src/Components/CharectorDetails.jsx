import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import Loader from "./Loader";

function CharectorDetails({ slectedId, onAddFavourit, addedMyFavourit }) {
  const [character, setCharecter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/${slectedId}`
        );
        setCharecter(data);

        const episodesId = data.episode.map((e) => e.split("/").at(-1));

        const { data: episodeData } = await axios.get(
          `https://rickandmortyapi.com/api/episode/${episodesId}`
        );
        console.log(episodeData);
        setEpisodes([episodeData].flat().slice(0, 6));
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.error);
      } finally {
        setIsLoading(false);
      }
    }

    if (slectedId) fetchData();
  }, [slectedId]);

  if (isLoading) {
    return (
      <div
        style={{
          flex: 1,
          color: "var(--slate-100)",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        <Loader />
      </div>
    );
  }

  if (!character || !slectedId) {
    return (
      <div
        style={{
          flex: 1,
          color: "var(--slate-100)",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Plesse Select A Charector
      </div>
    );
  }

  return (
    <div style={{ flex: 1 }}>
      <CharectorSubInfo
        character={character}
        onAddFavourit={onAddFavourit}
        addedMyFavourit={addedMyFavourit}
      />
      <EpisodList episodes={episodes} />
    </div>
  );
}

export default CharectorDetails;

function CharectorSubInfo({ character, onAddFavourit, addedMyFavourit }) {
  return (
    <div className="character-detail">
      <img
        src={character.image}
        alt={character.name}
        className="character-detail__img "
      />
      <div className="character-detail__info">
        <h3 className="name">
          <span>{character.gender == "Male" ? "🧑" : "👧"} </span>
          <span>&nbsp;{character.name}</span>
        </h3>
        <div className="info">
          <span
            className={`status ${character.status == "Dead" ? "red" : ""}`}
          ></span>
          <span>&nbsp;{character.status}&nbsp;</span>
          <span>-&nbsp;{character.species}</span>
        </div>
        <div className="location">
          <p>Last known location</p>
          <p>{character.location.name}</p>
        </div>
        <div className="actions">
          {addedMyFavourit ? (
            <p>Already added in your favourits ✅</p>
          ) : (
            <button
              className="btn btn--primary"
              onClick={() => onAddFavourit(character)}
            >
              Add To Favorits
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function EpisodList({ episodes }) {
  const [sortedBy, setSortedBy] = useState(true);

  let sortedEpisod;
  if (sortedBy) {
    sortedEpisod = [...episodes].sort(
      (a, b) => new Date(a.created) - new Date(b.created)
    );
  } else {
    sortedEpisod = [...episodes].sort(
      (a, b) => new Date(b.created) - new Date(a.created)
    );
  }
  return (
    <div className="character-episodes">
      <div className="title">
        <h2>List of Episods:</h2>
        <button onClick={() => setSortedBy((is) => !is)}>
          <ArrowUpCircleIcon
            className="icon"
            style={{ rotate: sortedBy ? "0deg" : "180deg" }}
          />
        </button>
      </div>
      <ul>
        {sortedEpisod.map((item, index) => (
          <li key={item.id}>
            <div>
              {String(index + 1).padStart(2, "0")} {item.episode} :{" "}
              <strong>{item.name}</strong>
            </div>
            <div className="badge badge--secondary">{item.air_date}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
