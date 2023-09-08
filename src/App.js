import "./App.css";
import React, { useState } from "react";
import Select from "react-select";

function App() {
  const [artistName, setArtistName] = useState("");
  const [type, setType] = useState("");
  const [data, setData] = useState(null);

  const handleArtistNameChange = (e) => {
    setArtistName(e.target.value);
  };

  const handleTypeChange = (selectedType) => {
    if (data) {
      console.log(selectedType);
      const newData = data.filter((item) => item.kind === selectedType.value);
      console.log(newData);
      setData(newData);
    }
    setType(selectedType.value);
  };

  const options = [
    { value: "", label: "All" },
    { value: "song", label: "Music" },
    { value: "book", label: "book" },
    { value: "album", label: "album" },
    { value: "tvShow", label: "TvShow" },
    //  coached-audio, feature-movie, interactive- booklet, music-video, pdf podcast, podcast-episode, software-package, song, tv- episode, artistFor example: song.
  ];

  const fetchData = () => {
    const apiUrl = `https://itunes.apple.com/search?term=${artistName}&entity=${type}`;
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error on network: ${response.status}`);
        }
        return response.json();
      })
      .then((responseData) => {
        console.log(responseData.results);
        setData(responseData.results);
      })
      .catch((error) => {
        console.error(`Error getting data:`, error);
      });
  };

  // const searchNameArtist = async (search) => {
  //   if (search === "") {
  //     return null;
  //   }
  //   try {
  //     const response = await fetch(
  //       `https://itunes.apple.com/search?term=${artistName}`
  //     );
  //     const json = await response.json();
  //     const artists = json.Search;

  //     return artists?.map((artist) => ({
  //       artistName: artist.artistName,
  //       collection: artist.collectionName,
  //       track: artist.trackName,
  //       collectionCensored: artist.collectionCensoredName,
  //       trackCensored: artist.t.rackCensoredName,
  //       type: artist.kind,
  //       image: artist.artworkUrl30,
  //     }));
  //   } catch (e) {
  //     throw new Error("Error searching artist");
  //   }
  // };

  return (
    <div className="App">
      <h1>Search your artist!</h1>
      <input
        type="text"
        placeholder="Name of artist"
        value={artistName}
        onChange={handleArtistNameChange}
      />
      <Select
        options={options}
        value={options.find((option) => option.value === type)}
        onChange={handleTypeChange}
      />
      <button onClick={fetchData}>Search</button>
      {data &&
        data.map((item, index) => (
          <div key={index}>
            <h2>About your artist</h2>
            <p>Name: {item.artistName}</p>
            <p>Song: {item.collectionName}</p>
            <img src={item.artworkUrl100} alt={item.artistName} />
            {item.trackPrice && item.trackPrice.length > 0 ? null : (
              <p>Price: {item.trackPrice}</p>
            )}
          </div>
        ))}
    </div>
  );
}

export default App;
