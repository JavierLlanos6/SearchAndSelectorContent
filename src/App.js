import "./App.css";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Select from "react-select";
import { useArtist } from "./hooks/useArtist";
import { Artist } from "./components/Artist";

function useSearch() {
  const [search, updateSearch] = useState("");
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === "";
      return;
    }

    if (search === "") {
      setError("You can not search for empty artists");
      return;
    }

    if (search.match(/^\d+$/)) {
      setError("You can not search for an artist with a number");
      return;
    }

    if (search.length < 3) {
      setError("Search must be at least 3 characters");
      return;
    }
    setError(null);
  }, [search]);
  return { search, updateSearch, error };
}

function App() {
  const [sort, setSort] = useState(false);
  const [type, setType] = useState("");
  const { search, updateSearch, error } = useSearch();
  const { artist, loading, getArtist } = useArtist({ search, sort });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await getArtist({ search, type });
  };

  const handleSort = () => {
    setSort(!sort);
  };

  const handleChange = (event) => {
    const newSearch = event.target.value;
    updateSearch(newSearch);
  };

  const handleSelectChange = (selectedOption) => {
    setType(selectedOption.value);
  };

  const options = [
    { value: "", label: "All" },
    { value: "song", label: "Music" },
    { value: "book", label: "book" },
    { value: "album", label: "album" },
    { value: "coached-audio", label: "coached-audio" },
    { value: "feature-movie", label: "feature-movie" },
    { value: "interactive-booklet", label: "interactive-booklet" },
    { value: "music-video", label: "music-video" },
    { value: "pdf podcast", label: "pdf podcast" },
    { value: "podcast-episode", label: "podcast-episode" },
    { value: "software-package", label: "software-package" },
    { value: "tv-episode", label: "tv-episode" },
    { value: "artistFor", label: "artistFor" },
  ];

  return (
    <div className="page">
      <header>
        <h1>Search your artist!</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
            style={{
              border: "1px solid transparent",
              borderColor: error ? "red" : "transparent",
            }}
            onChange={handleChange}
            value={search}
            name="query"
            placeholder="Name of artist"
          />
          <Select
            className="display1"
            options={options}
            value={options.find((option) => option.value === type)}
            onChange={(selectedOption) => setType(selectedOption.value)}
          />
          <input type="checkbox" onChange={handleSort} checked={sort} />
          <button type="submit"> Search </button>
        </form>
        {error && <p style={{ color: "red" }}> {error}</p>}
      </header>

      <main>
        {loading ? (
          <p>Loading... </p>
        ) : artist && artist.length > 0 ? (
          <Artist artists={artist} />
        ) : (
          search.length > 0 && <p>No results found</p>
        )}
      </main>
    </div>
  );
}

export default App;
