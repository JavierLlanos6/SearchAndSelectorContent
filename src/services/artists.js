export const searchArtist = async ({ search, type }) => {
  if (search === "") return null;

  try {
    const response = await fetch(
      `https://itunes.apple.com/search?term=${search}&entity=song`
    );
    const json = await response.json();
    console.log("API Response:", json);
    const artist = json.results;

    return artist?.map((artists) => ({
      name: artists.artistName,
      song: artists.collectionName,
      image: artists.artworkUrl100,
      price: artists.trackPrice,
    }));
  } catch (e) {
    console.error("Error searching artist:", e);
    throw new Error("Error searching artist");
  }
};
