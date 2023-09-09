import { useMemo, useRef, useState } from "react";
import { searchArtist } from "../services/artists";

export function useArtist({ search, sort }) {
  const [artist, setArtist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const previousSearch = useRef(search);

  const getArtist = useMemo(() => {
    return async ({ search }) => {
      if (search === previousSearch.current) return;
      try {
        setLoading(true);
        setError(null);
        previousSearch.current = search;
        const newArtist = await searchArtist({ search });
        setArtist(newArtist);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
  }, [search]);
  const sortedArtist = useMemo(() => {
    return sort
      ? [...artist].sort((a, b) => a.name.localeCompare(b.name))
      : [...artist].sort((a, b) => a.name.localeCompare(b.name)).reverse();
  }, [sort, artist]);
  return { artist: sortedArtist, getArtist, loading };
}
