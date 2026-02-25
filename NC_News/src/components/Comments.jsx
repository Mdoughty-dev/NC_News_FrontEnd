import { useEffect, useState } from "react";
import { fetchCommentsByArticleId, patchCommentVotes } from "../api";

export default function Comments({ article_id }) {
  const [comments, setComments] = useState([]);
  const [err, setErr] = useState(null);

  useEffect(() => {
    setErr(null);
    fetchCommentsByArticleId(article_id)
      .then((data) => setComments(data.comments))
      .catch((e) => setErr(e));
  }, [article_id]);

  function handleVote(comment_id, inc_votes) {
    setErr(null);
    setComments((curr) =>
      curr.map((c) =>
        c.comment_id === comment_id ? { ...c, votes: c.votes + inc_votes } : c
      )
    );

    patchCommentVotes(comment_id, inc_votes)
      .then((updatedComment) => {
        setComments((curr) =>
          curr.map((c) =>
            c.comment_id === comment_id ? updatedComment : c
          )
        );
      })
      .catch((e) => {
        setComments((curr) =>
          curr.map((c) =>
            c.comment_id === comment_id ? { ...c, votes: c.votes - inc_votes } : c
          )
        );
        setErr(e);
      });
  }

  if (err) return <p>Something went wrong.</p>;

  return (
    <div>
      <h2>Comments</h2>

      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        comments.map((c) => (
          <div key={c.comment_id}>
            <p><strong>{c.author}</strong></p>
            <p>{c.body}</p>

            <p>Votes: {c.votes}</p>
            <button onClick={() => handleVote(c.comment_id, 1)}>👍</button>
            <button onClick={() => handleVote(c.comment_id, -1)}>👎</button>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}