import { useEffect, useState } from "react"
import { fetchCommentsByArticleId } from "../api";

export default function Comments({article_id})
{
    const [comments, setComments] = useState([]);
    useEffect(() =>
    {
        fetchCommentsByArticleId(article_id)
         .then((data) => {
        setComments(data.comments);
      });
    }, [article_id]);
    
return (
    <div>
      <h2>Comments</h2>

      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        comments.map((comment) => (
          <div key={comment.comment_id}>
            <p><strong>{comment.author}</strong></p>
            <p>{comment.body}</p>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}