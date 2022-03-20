import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { apiGet } from "../misc/config";
import ShowMainData from "../Components/show/ShowMainData";
import Details from "../Components/show/Details";
import Seasons from "../Components/show/Seasons";
import Cast from "../Components/show/Cast";
import { InfoBlock, ShowPageWrapper } from "./Show.styled";

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
    };
  }, [id]);

  if (isLoading) {
    return <div>this is show page</div>;
  }

  if (error) {
    return <div>Error Occured {error}</div>;
  }

  return (
    <ShowPageWrapper>
      <ShowMainData
        image={show.image}
        name={show.name}
        rating={show.rating}
        summary={show.summary}
        tags={show.genres}
      />
      <InfoBlock>
        <h2>Details</h2>
        <Details
          status={show.status}
          network={show.network}
          premiere={show.premiere}
        />
      </InfoBlock>
      <InfoBlock>
        <h2>Seasons</h2>
        <Seasons seasons={show._embedded.seasons} />
      </InfoBlock>

      <InfoBlock>
        <h2>Cast</h2>
        <Cast cast={show._embedded.cast} />
      </InfoBlock>
    </ShowPageWrapper>
  );
};

export default Show;
