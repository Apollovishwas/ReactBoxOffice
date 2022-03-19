import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { apiGet } from "../misc/config";

const initialState = {
  show: null,
  isLoading: true,
  error: null,
};

const reducer = (prev, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return { isLoading: false, show: action.show, error: null };
    case "FETCH_FAILED":
      return { ...prev, isLoading: false, error: action.error };
    default:
      return prev;
  }
};
const Show = () => {
  const [{ show, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  //to ccllect the param id from URL
  const { id } = useParams();

  //using the event listeners
  useEffect(() => {
    let isMount = true;
    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then((results) => {
        if (isMount) {
          console.log("The munt");
          dispatch({ type: "FETCH_SUCCESS", show: results });
        }
      })
      .catch((err) => {
        if (isMount) {
          dispatch({ type: "FETCH_FAILED", error: err });
        }
      });

    return () => {
      isMount = false;
      console.log(show, isLoading, error);
    };
  }, [id]);

  console.log(show);

  if (isLoading) {
    return <div>this is show page</div>;
  }

  if (error) {
    return <div>Error Occured {error}</div>;
  }

  return <div>{show.summary}</div>;
};

export default Show;
