import React, { useState } from "react";
import ActorGrid from "../Components/actors/ActorGrid";
import { SearchButtonWrapper, SearchInput } from "../Components/Home.styled";
import MainPageLayout from "../Components/MainPageLayout";
import ShowGrid from "../Components/show/ShowGrid";
import { apiGet } from "../misc/config";
import { useLAstQuery } from "../misc/custom-hooks";
import { RadioInputsWrapper } from "../Components/Home.styled";
import CustomRadio from "../Components/CustomRadio";

const Home = () => {
  const [input, setInput] = useLAstQuery();
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
        <SearchInput
          placeholder="Search for movie"
          type="text"
          onChange={onInputChange}
          value={input}
          onKeyDown={onKeyDown}
        />

        <RadioInputsWrapper>
          <div>
            <CustomRadio
              label="shows"
              id="show-search"
              value="shows"
              checked={isShowsSearch}
              onChange={onRadioChange}
            />
          </div>
          <div>
            <CustomRadio
              label="actors"
              id="actor-search"
              value="people"
              checked={!isShowsSearch}
              onChange={onRadioChange}
            />
          </div>
        </RadioInputsWrapper>

        <SearchButtonWrapper>
          <button type="button" onClick={onSearch}>
            Search
          </button>
        </SearchButtonWrapper>
        {renderResults()}
      </MainPageLayout>
    </div>
  );
};

export default Home;
