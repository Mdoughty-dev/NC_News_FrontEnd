import { useState } from "react";
import { fetchShowByName } from "../api";
import SearchBar from "./SearchBar";
import {ResultsGrid} from "./ResultsGrid";

function Search({myWatchList, setMyWatchList}) {
  const [searchName, setSearchName] = useState("");
  const [shows, setShows] = useState([]);

  function handleSearch() {
    const trimmed = searchName.trim();
    if (!trimmed) return;

    fetchShowByName(trimmed).then((data) => {
      setShows(data);
    });
  }

  return (
    <>
      <SearchBar
        searchName={searchName}
        setSearchName={setSearchName}
        onSearch={handleSearch}
      />

      <ResultsGrid shows={shows} myWatchList={myWatchList} setMyWatchList={setMyWatchList}/>
    </>
  );
}

export default Search;
