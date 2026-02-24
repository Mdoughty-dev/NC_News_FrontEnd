import { Link } from "react-router-dom";

export function Watchlist({ myWatchList , setMyWatchList}) {
 function handleRemoveWatchlist(item) {
  setMyWatchList((prev) => {
    return prev.filter((s) => s.id !== item.id);
  });
}
  return (
    <>
    <h1>My Watchlist!</h1>
    <div className="results-layout">
      <div className="left-container">
        <Link to="/search">
          <button className="watchlistBtn">Back to Search</button>
        </Link>
      </div>

      <div className="right-container">
        <div className="results-grid">
          {myWatchList.map((item) => (
            <div className="result-card" key={item.id}>
              {item.image && (
                <img
                  src={item.image.medium}
                  alt={item.name}
                  className="result-image"
                />
              )}

              <div className="result-info">
                <h2>{item.name}</h2>
                <p>{item.premiered}</p>
                <p>{item.genres.join(", ")}</p>
                <p>{item.rating?.average}</p>
                <button id="addBtn">Add rating!</button>
                <button id="removeBtn" onClick={(()=> handleRemoveWatchlist(item))}>Delete entry</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
