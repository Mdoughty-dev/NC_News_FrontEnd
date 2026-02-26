 function fetchAllArticles() {
  return fetch("https://databases-ty2f.onrender.com/api/articles")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((data) => {
      console.log("API response:", data);
      return data.articles;   
    })
    .catch((err) => {
      console.error("Error fetching data:", err);
      throw err; 
    });
}

function fetchArticleById(id)
{
  return fetch(`https://databases-ty2f.onrender.com/api/articles/${id}`)
  .then((res) =>
  {
    if (!res.ok)
    {
      throw new Error("Network response not ok")
    }
    return res.json();
  })
  .then((data) =>
  {
    console.log("single article data", data);
    return data;
  })
  .catch((err) =>
  {
    console.error("Error fetching data", err);
    throw err;
  });
}

function fetchCommentsByArticleId(id)
{
  return fetch(`https://databases-ty2f.onrender.com/api/articles/${id}/comments`)
  .then((res) =>
  {
    if (!res.ok)
    {
      throw new Error("Network response not ok")
    }
    return res.json();
  })
  .then((data) =>
  {
    console.log("comments data", data);
    return data;
  })
  .catch((err) =>
  {
    console.error("Error fetching data", err);
    throw err;
  });
}

function patchCommentVotes(comment_id, inc_votes) {
  return fetch(
    `https://databases-ty2f.onrender.com/api/comments/${comment_id}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inc_votes }),
    }
  )
    .then((res) => {
      if (!res.ok) throw new Error("Failed to patch comment votes");
      return res.json();
    })
    .then((data) => data.comment);
}

function fetchTopics() {
  return fetch("https://databases-ty2f.onrender.com/api/topics")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((data) => {
      console.log("API response:", data);
      return data.topics;   
    })
    .catch((err) => {
      console.error("Error fetching data:", err);
      throw err; 
    });
}
 function patchArticleVotes(article_id, inc_votes) {
  return fetch(
    `https://databases-ty2f.onrender.com/api/articles/${article_id}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inc_votes }),
    }
  )
    .then((res) => {
      if (!res.ok) throw new Error("Failed to patch vote");
      return res.json();
    })
    .then((data) => data.article);
}

function postCommentByArticleId(article_id, newComment) {
  return fetch(
    `https://databases-ty2f.onrender.com/api/articles/${article_id}/comments`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComment), // { username, body }
    }
  )
    .then((res) => {
      if (!res.ok) throw new Error("Failed to post comment");
      return res.json();
    })
    .then((data) => data.comment);
}
 function deleteCommentById(comment_id) {
  return fetch(`https://databases-ty2f.onrender.com/api/comments/${comment_id}`, {
    method: "DELETE",
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to delete comment");
    return; // usually 204 No Content
  });
}
function fetchArticlesByTopic(topic) {
  return fetch(
    `https://databases-ty2f.onrender.com/api/articles?topic=${topic}`
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response not ok");
      }
      return res.json();
    })
    .then((data) => {
      return data.articles;
    });
}
export {fetchAllArticles, fetchArticleById, fetchArticlesByTopic,fetchCommentsByArticleId, deleteCommentById , patchCommentVotes, fetchTopics, postCommentByArticleId, patchArticleVotes}
