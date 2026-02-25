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


export {fetchAllArticles, fetchArticleById, fetchCommentsByArticleId, patchCommentVotes}
