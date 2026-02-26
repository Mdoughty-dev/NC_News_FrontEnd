import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useLoadingError from "../hooks/useLoadingError";
import { fetchArticleById, patchArticleVotes } from "../api";
import Comments from "./Comments";

export default function Article({currentUser}) {
  const { article_id } = useParams();


  const { data, isLoading, error } = useLoadingError(fetchArticleById, {
    params: [article_id],
    dependencies: [article_id],
  });

  const [article, setArticle] = useState(null);
  const [err, setErr] = useState(null);


  useEffect(() => {
    if (data?.article) setArticle(data.article);
  }, [data]);

  function handleVote(inc_votes) {
    setErr(null);

    // optimistic update
    setArticle((curr) => (curr ? { ...curr, votes: curr.votes + inc_votes } : curr));

    patchArticleVotes(article_id, inc_votes).catch((e) => {
      // rollback on failure
      setArticle((curr) => (curr ? { ...curr, votes: curr.votes - inc_votes } : curr));
      setErr(e);
    });
  }

 
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong.</p>;
  if (!article) return <p>Article not found.</p>;

  return (
    <div className="results-grid">
      {err && <p>Vote failed. Please try again.</p>}

      <h1>{article.title}</h1>
      <img src={article.article_img_url} alt={article.title} />
      <p>{article.body}</p>
      <p>
        <strong>Written by:</strong> {article.author}
      </p>

      <p>Votes: {article.votes}</p>
      <button onClick={() => handleVote(1)}>👍</button>
      <button onClick={() => handleVote(-1)}>👎</button>

      <div className="result-card">
        <Comments article_id={article_id} currentUser={currentUser}/>
      </div>
    </div>
  );
}