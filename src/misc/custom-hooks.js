import { useReducer, useEffect, useState } from "react";
function showsReducer(prev, action) {
  switch (action.type) {
    case "ADD": {
      return [...prev, action.showId];
    }
    case "REMOVE": {
      return prev.filter((showId) => showId !== action.showId);
    }
    default:
      return prev;
  }
}
export function usePersistedReducer(reducer, initialState, key) {
  const [state, dispatch] = useReducer(reducer, initialState, (initial) => {
    const persisted = localStorage.getItem(key);
    return persisted ? JSON.parse(persisted) : initial;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, dispatch];
}

export function useShows(key = "shows") {
  return usePersistedReducer(showsReducer, [], key);
}

export function useLAstQuery(key = "lastQuery") {
  const [input, setInput] = useState(() => {
    const persisted = localStorage.getItem(key);
    return persisted ? JSON.parse(persisted) : "";
  });
  const setPersistedInput = (newState) => {
    setInput(newState);
    sessionStorage.setItem(key, JSON.stringify(newState));
  };
  return [input, setPersistedInput];
}
