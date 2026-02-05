import { useState, useEffect, useCallback } from "react";

function useMediaQuery(query: string) {
  const mediaQueryList = window.matchMedia(query);
  const [matches, setMatches] = useState(mediaQueryList.matches);

  const updateMatch = useCallback((e: MediaQueryListEvent) => {
    setMatches(e.matches);
  }, []);

  useEffect(() => {
    mediaQueryList.addEventListener("change", updateMatch);
    return () => {
      mediaQueryList.removeEventListener("change", updateMatch);
    };
  }, [query, updateMatch, mediaQueryList]);

  return matches;
}

export default useMediaQuery;
