import { useEffect, useState } from "react";
import { fetchAllArticles } from "../api";
import { Link } from "react-router-dom";

export default function Articles({articles, setArticles, articleId, setArticleId }) {

  useEffect(() => {
    fetchAllArticles().then((data) => {
      setArticles(data);
    });
  }, []);
  if (!articles) return <p>Loading...</p>;

  return (
    <div className="results-grid">
      {articles.map((article) => (
        <div className="result-card" key={article.article_id}>
          <div className="result-info">
            <h1>{article.title}</h1>
            <img src={article.article_img_url}/>
            <p><strong>Topic: </strong>{article.topic}</p>
            <p><strong>Votes: </strong>{article.votes}</p>
            <p><strong>Written by :</strong>{article.author}</p>
            <Link to={`/article/${article.article_id}`}>
  <button>Click to Read More!</button>
</Link>
          </div>
        </div>
      ))}
    </div>
  );
}