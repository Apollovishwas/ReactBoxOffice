import React from "react";
import Nav from "./Nav";
import Title from "./Title";

const MainPageLayout = ({ children }) => {
  return (
    <div>
      <Title
        title="Box office"
        subtitile="Are you looking for an actor or video"
      />
      <Nav />

      {children}
    </div>
  );
};

export default MainPageLayout;
