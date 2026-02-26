import { useEffect, useState } from "react";
import {
  fetchCommentsByArticleId,
  patchCommentVotes,
  postCommentByArticleId,
  deleteCommentById,
} from "../api";

export default function Comments({ article_id }) {
  const [showComments, setShowComments] = useState(false);

  const [comments, setComments] = useState([]);
  const [err, setErr] = useState(null);

  const [isLoading, setIsLoading] = useState(false);


  const [newCommentBody, setNewCommentBody] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  
  const [deletingIds, setDeletingIds] = useState(() => new Set());


  const currentUser = "grumpy19";

 
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
       
        setComments((curr) =>
          curr.map((c) =>
            c.comment_id === comment_id
              ? { ...c, votes: c.votes - inc_votes }
              : c
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

    postCommentByArticleId(article_id, { username: currentUser, body })
      .then((createdComment) => {
        setComments((curr) => [createdComment, ...curr]);
        setNewCommentBody("");
        setShowComments(true);
      })
      .catch((e) => setErr(e))
      .finally(() => setIsPosting(false));
  }

  function handleDelete(comment_id) {
    setErr(null);

    // ✅ prevent duplicate delete requests
    if (deletingIds.has(comment_id)) return;

    // store comment for rollback
    const deletedComment = comments.find((c) => c.comment_id === comment_id);
    if (!deletedComment) return;

    // mark as deleting (use a new Set so React sees the update)
    setDeletingIds((prev) => new Set(prev).add(comment_id));

    // ✅ optimistic remove from UI
    setComments((curr) => curr.filter((c) => c.comment_id !== comment_id));

    deleteCommentById(comment_id)
      .catch((e) => {
        // rollback on failure
        setComments((curr) => [deletedComment, ...curr]);
        setErr(e);
      })
      .finally(() => {
        setDeletingIds((prev) => {
          const next = new Set(prev);
          next.delete(comment_id);
          return next;
        });
      });
  }

  return (
    <div>
      <button onClick={handleToggleComments}>
        {showComments ? "Hide comments" : "Show comments"}
      </button>

      {err && (
        <p role="alert" aria-live="polite">
          Something went wrong.
        </p>
      )}

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
            comments.map((c) => {
              const canDelete = c.author === currentUser;
              const isDeleting = deletingIds.has(c.comment_id);

              return (
                <div
                  key={c.comment_id}
                  style={{
                    border: "1px solid #ddd",
                    padding: "12px",
                    marginTop: "12px",
                    borderRadius: "8px",
                  }}
                >
                  <p>
                    <strong>{c.author}</strong>
                  </p>
                  <p>{c.body}</p>

                  <p>Votes: {c.votes}</p>

                  {/* basic responsive-friendly action row */}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "8px",
                      alignItems: "center",
                    }}
                  >
                    <button
                      onClick={() => handleVote(c.comment_id, 1)}
                      disabled={isDeleting}
                      aria-disabled={isDeleting}
                    >
                      👍
                    </button>
                    <button
                      onClick={() => handleVote(c.comment_id, -1)}
                      disabled={isDeleting}
                      aria-disabled={isDeleting}
                    >
                      👎
                    </button>

                    {canDelete && (
                      <button
                        onClick={() => handleDelete(c.comment_id)}
                        disabled={isDeleting}
                        aria-disabled={isDeleting}
                        aria-label={
                          isDeleting ? "Deleting comment" : "Delete comment"
                        }
                      >
                        {isDeleting ? "Deleting..." : "Delete"}
                      </button>
                    )}
                  </div>

                  <hr />
                </div>
              );
            })
          )}
        </>
      )}
    </div>
  );
}