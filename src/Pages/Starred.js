import React, { useState, useEffect } from "react";
import MainPageLayout from "../Components/MainPageLayout";
import ShowGrid from "../Components/show/ShowGrid";
import { apiGet } from "../misc/config";
import { useShows } from "../misc/custom-hooks";

const Starred = () => {
  const [starred] = useShows();

  const [shows, setShows] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (starred && starred.length > 0) {
      const promise = starred.map((showId) => apiGet(`/shows/${showId}`));
      Promise.all(promise)
        .then((apiData) => apiData.map((show) => ({ show })))
        .then((results) => {
          setShows(results);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setIsLoading(true);
        });
    } else {
      setIsLoading(false);
    }
  }, [starred]);

  return (
    <div>
      <MainPageLayout>
        {isLoading && <div>Shows are still loading</div>}{" "}
        {error && <div>Error Occured. Try again</div>}
        {!isLoading && !shows && <div>no shows added</div>}
        {!isLoading && !error && shows && <ShowGrid data={shows}></ShowGrid>}
      </MainPageLayout>
    </div>
  );
};

export default Starred;
