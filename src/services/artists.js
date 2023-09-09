export const searchArtist = async ({ search, type }) => {
  console.log("search and type", search, type);
  if (search === "") return [];

  try {
    const response = await fetch(
      `https://itunes.apple.com/search?term=${search}&entity=${type}`
    );

    const json = await response.json();

    console.log("API Response:", json);
    const artist = json.results || [];
    console.log("try to error");

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
