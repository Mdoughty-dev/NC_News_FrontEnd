import { Link, useSearchParams } from "react-router-dom";
import useLoadingError from "../hooks/useLoadingError";
import { fetchAllArticles } from "../api";

export default function Articles() {
  const [searchParams, setSearchParams] = useSearchParams();

  const sort_by = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";

  const { data: articles = [], isLoading, error: err } = useLoadingError(
    fetchAllArticles,
    {
      params: [{ sort_by, order }],         
      dependencies: [sort_by, order],        
    }
  );

  function handleSortChange(e) {
    setSearchParams({ sort_by: e.target.value, order });
  }

  function handleOrderToggle() {
    setSearchParams({ sort_by, order: order === "asc" ? "desc" : "asc" });
  }

  if (isLoading) return <p>Loading articles…</p>;
  if (err) return <p>Failed to load articles.</p>;

  return (
    <div>
      {/* Sorting UI */}
      <div className="sort-controls">
        <label htmlFor="sort_by">Sort by:</label>

        <select id="sort_by" value={sort_by} onChange={handleSortChange}>
          <option value="created_at">Date</option>
          <option value="comment_count">Comment count</option>
          <option value="votes">Votes</option>
        </select>

        <button onClick={handleOrderToggle}>
          {order === "asc" ? "Ascending ↑" : "Descending ↓"}
        </button>
      </div>

      {/* Articles */}
      <div className="results-grid">
        {articles.length === 0 ? (
          <p>No articles found.</p>
        ) : (
          articles.map((article) => (
            <div className="result-card" key={article.article_id}>
              <div className="result-info">
                <h2>{article.title}</h2>

                {article.article_img_url && (
                  <img src={article.article_img_url} alt={article.title} />
                )}

                <p><strong>Topic:</strong> {article.topic}</p>
                <p><strong>Votes:</strong> {article.votes}</p>
                <p><strong>Written by:</strong> {article.author}</p>

                <Link to={`/article/${article.article_id}`}>
                  <button>Click to Read More!</button>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}