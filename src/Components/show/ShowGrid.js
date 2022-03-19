import React from "react";
import ShowCard from "./ShowCard";
import IMAGE_NOT_FOUNT from "../../image/not-found.png";

const ShowGrid = ({ data }) => {
  return (
    <div>
      {data.map(({ show }) => {
        return (
          <ShowCard
            key={show.id}
            id={show.id}
            name={show.name}
            image={show.image ? show.image.medium : IMAGE_NOT_FOUNT}
            summary={show.summary}
          />
        );
      })}
    </div>
  );
};

export default ShowGrid;
