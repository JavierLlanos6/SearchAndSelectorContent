function ListOfArtist({ artists }) {
  return (
    <ul className="artists">
      {artists &&
        artists.map((artists, index) => (
          <li className="artist" key={index}>
            <p>Name: {artists.name}</p>
            <p>Song: {artists.song}</p>
            <img src={artists.image} alt={artists.name} />
            {artists.price && artists.price !== 0 ? (
              <p>Price: {artists.price}</p>
            ) : null}
          </li>
        ))}
    </ul>
  );
}

function NoArtistResult() {
  return <p> There are not results for your search about your artist </p>;
}

export function Artist({ artists }) {
  const hasArtist = artists?.length > 0;
  return hasArtist ? <ListOfArtist artists={artists} /> : <NoArtistResult />;
}
