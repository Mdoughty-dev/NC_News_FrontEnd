import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchArticleById } from "../api";
import Comments from "./Comments";

export default function Article(setArticles) {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [err, setErr] = useState(null);
  
  function handleVote(article_id, inc_votes)
  {
    setErr(null);
    setArticle((curr) =>
    ({
      ...curr,
      votes: curr.votes + inc_votes
    }));
      patchArticleVotes(article_id, inc_votes)
    .catch((err) => {
      setArticles((curr) =>
        curr.map((article) =>
          article.article_id === article_id
            ? { ...article, votes: article.votes - inc_votes }
            : article
        )
      );
      setErr(err);
    });
}

  useEffect(() => {
    setErr(null)
    fetchArticleById(article_id)
      .then((data) => {
        setArticle(data.article);
      })
      .catch((e) => setErr(e));
  }, [article_id]);

  if (!article) return <p>Loading...</p>;
  if (err) return <p>Something went wrong.</p>;

  return (
    <div className="results-grid">
      <h1>{article.title}</h1>
      <img src={article.article_img_url} />
      <p>{article.body}</p>
      <p><strong>Written by :</strong>{article.author}</p>
      <p>Votes: {article.votes}</p>
            <button onClick={() => handleVote(article_id, 1)}>👍</button>
            <button onClick={() => handleVote(article_id, -1)}>👎</button>

      <div className="result-card">
      <Comments article_id={article_id}/></div>
    </div>
  );
}