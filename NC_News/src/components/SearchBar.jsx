function SearchBar({ searchName, setSearchName, onSearch }) {
  function handleSubmit(e) {
    e.preventDefault();
    onSearch();
  }
  
  return (
    <form id="search-bar" onSubmit={handleSubmit}>
      <label htmlFor="searchInput">Enter name of Show: </label>

      <input
        id="searchInput"
        type="text"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
      />

      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
