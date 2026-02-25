import { useEffect, useState } from "react";
import {
  fetchCommentsByArticleId,
  patchCommentVotes,
  postCommentByArticleId, // <-- you'll add this in api.js
} from "../api";

export default function Comments({ article_id }) {
  const [showComments, setShowComments] = useState(false);

  const [comments, setComments] = useState([]);
  const [err, setErr] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  // add comment form state
  const [newCommentBody, setNewCommentBody] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  // Fetch only when showComments is true
  useEffect(() => {
    if (!showComments) return;

    setErr(null);
    setIsLoading(true);

    fetchCommentsByArticleId(article_id)
      .then((data) => setComments(data.comments))
      .catch((e) => setErr(e))
      .finally(() => setIsLoading(false));
  }, [article_id, showComments]);

  function handleVote(comment_id, inc_votes) {
    setErr(null);

    // optimistic update
    setComments((curr) =>
      curr.map((c) =>
        c.comment_id === comment_id ? { ...c, votes: c.votes + inc_votes } : c
      )
    );

    patchCommentVotes(comment_id, inc_votes)
      .then((updatedComment) => {
        setComments((curr) =>
          curr.map((c) => (c.comment_id === comment_id ? updatedComment : c))
        );
      })
      .catch((e) => {
        // revert
        setComments((curr) =>
          curr.map((c) =>
            c.comment_id === comment_id ? { ...c, votes: c.votes - inc_votes } : c
          )
        );
        setErr(e);
      });
  }

  function handleToggleComments() {
    setErr(null);
    setShowComments((curr) => !curr);
  }

  function handleSubmitComment(e) {
    e.preventDefault();
    setErr(null);

    const body = newCommentBody.trim();
    if (!body) return;

    setIsPosting(true);

 
    postCommentByArticleId(article_id, { username: "grumpy19", body })
      .then((createdComment) => {
        // put new comment at top
        setComments((curr) => [createdComment, ...curr]);
        setNewCommentBody("");
        setShowComments(true);
      })
      .catch((e) => setErr(e))
      .finally(() => setIsPosting(false));
  }

  return (
    <div>
      <button onClick={handleToggleComments}>
        {showComments ? "Hide comments" : "Show comments"}
      </button>

      {err && <p>Something went wrong.</p>}

      {showComments && (
        <>
          <h2>Comments</h2>

          <form onSubmit={handleSubmitComment}>
            <textarea
              value={newCommentBody}
              onChange={(e) => setNewCommentBody(e.target.value)}
              placeholder="Write a comment..."
              rows={4}
            />
            <br />
            <button type="submit" disabled={isPosting}>
              {isPosting ? "Posting..." : "Post comment"}
            </button>
          </form>

          {isLoading ? (
            <p>Loading comments...</p>
          ) : comments.length === 0 ? (
            <p>No comments yet.</p>
          ) : (
            comments.map((c) => (
              <div key={c.comment_id}>
                <p>
                  <strong>{c.author}</strong>
                </p>
                <p>{c.body}</p>

                <p>Votes: {c.votes}</p>
                <button onClick={() => handleVote(c.comment_id, 1)}>👍</button>
                <button onClick={() => handleVote(c.comment_id, -1)}>👎</button>

                <hr />
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
}