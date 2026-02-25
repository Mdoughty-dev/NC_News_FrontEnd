import { useState, useEffect } from "react";
import { fetchTopics } from "../api";

export default function Topics() {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setErr(null);

    fetchTopics()
      .then((data) => {
        setTopics(data);
      })
      .catch((error) => {
        setErr(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading topics...</p>;
  if (err) return <p>Something went wrong.</p>;

  return (
    <div>
      <h1>Topics</h1>
      <p>Click on one of our following topics</p>

      {topics.map((topic) => (
        <div className="result-card" key={topic.slug}>
          <h3>{topic.slug}</h3>
        </div>
      ))}
    </div>
  );
}