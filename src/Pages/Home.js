import React, { useState } from "react";
import ActorGrid from "../Components/actors/ActorGrid";
import MainPageLayout from "../Components/MainPageLayout";
import ShowGrid from "../Components/show/ShowGrid";
import { apiGet } from "../misc/config";

const Home = () => {
  const [input, setInput] = useState("");
  const [res, setRes] = useState(null);
  const [searchOption, setSearchOption] = useState("shows");

  const isShowsSearch = searchOption === "shows";

  const onInputChange = (ev) => {
    setInput(ev.target.value);
  };

  const onSearch = () => {
    //https://api.tvmaze.com/search/shows?q=girls
    apiGet(`/search/${searchOption}?q=${input}`).then((result) => {
      setRes(result);
    });
  };

  const onKeyDown = (ev) => {
    if (ev.keyCode === 13) {
      onSearch();
    }
  };

  const renderResults = () => {
    if (res && res.length === 0) {
      return <div>No results</div>;
    }

    if (res && res.length > 0) {
      return res[0].show ? <ShowGrid data={res} /> : <ActorGrid data={res} />;
    }
    return null;
  };

  const onRadioChange = (ev) => {
    setSearchOption(ev.target.value);
  };

  return (
    <div>
      <MainPageLayout>
        <input
          placeholder="Search for movie"
          type="text"
          onChange={onInputChange}
          value={input}
          onKeyDown={onKeyDown}
        />

        <div>
          <label>
            Shows
            <input
              htmlFor="shows-search"
              type="radio"
              value="shows"
              checked={isShowsSearch}
              onChange={onRadioChange}
            />
          </label>

          <label>
            actors
            <input
              htmlFor="actor-search"
              type="radio"
              value="people"
              checked={!isShowsSearch}
              onChange={onRadioChange}
            />
          </label>
        </div>
        <button type="button" onClick={onSearch}>
          Search
        </button>
        {renderResults()}
      </MainPageLayout>
    </div>
  );
};

export default Home;
