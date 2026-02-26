import { useParams } from "react-router-dom";
import useLoadingError from "../hooks/useLoadingError";
import { fetchArticlesByTopic } from "../api";
import { Link } from "react-router-dom";

export default function ArticlesByTopic() {
  const { topic_slug } = useParams();

  const { data, isLoading, error } = useLoadingError(
    fetchArticlesByTopic,
    {
      params: [topic_slug],
      dependencies: [topic_slug],
    }
  );

  if (isLoading) return <p>Loading articles...</p>;
  if (error) return <p>Something went wrong.</p>;

  const articles = data

  return (
    <div className="results-grid">
        <h1>Articles about {topic_slug}</h1>
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
  );
}