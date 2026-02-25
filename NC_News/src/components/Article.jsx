import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchArticleById } from "../api";
import Comments from "./Comments";

export default function Article() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetchArticleById(article_id)
      .then((data) => {
        setArticle(data.article);
      });
  }, [article_id]);

  if (!article) return <p>Loading...</p>;

  return (
    <div className="results-grid">
      <h1>{article.title}</h1>
      <img src={article.article_img_url} />
      <p>{article.body}</p>
      <p><strong>Written by :</strong>{article.author}</p>
      <div className="result-card">
      <Comments article_id={article_id}/></div>
    </div>
  );
}