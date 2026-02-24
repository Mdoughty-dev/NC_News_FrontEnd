import { Link } from "react-router-dom";
export function ResultsGrid({ shows , setMyWatchList}) 
{
  
  
  function handleAddToWatchlist(show) {
  setMyWatchList((prev) => {
    if (prev.find((s) => s.id === show.id)) return prev;
    return [...prev, show];
  });
}

  return (
    <div className="results-layout">
      

      <div className="left-container">
        <Link to="/myWatchList">
    <button className="watchlistBtn">
      View Watchlist
    </button>
  </Link>
      </div>

      <div className="right-container">
        <div className="results-grid">
          {shows.map((item) => (
            <div className="result-card" key={item.show.id}>
              {item.show.image && (
                <img
                  src={item.show.image.medium}
                  alt={item.show.name}
                  className="result-image"
                />
              )}

              <div className="result-info">
                <h2>{item.show.name}</h2>
                <p>{item.show.premiered}</p>
                <p>{item.show.genres.join(", ")}</p>
                <p>{item.show.rating.average}</p>
               <button
  id="addBtn"
  onClick={() => handleAddToWatchlist(item.show)}
>Add to Watchlist</button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
