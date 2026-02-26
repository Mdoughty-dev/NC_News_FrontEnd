import { useEffect, useState } from "react";
import { fetchAllArticles } from "../api";
import { Link } from "react-router-dom";
import useLoadingError from "../hooks/useLoadingError";

export default function Articles() {


 const { data: articles, isLoading, error: err } =
    useLoadingError(fetchAllArticles);

  if (isLoading) return <p>Loading articles…</p>;
  if (err) return <p>Failed to load articles.</p>;

  return (
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
  );
}