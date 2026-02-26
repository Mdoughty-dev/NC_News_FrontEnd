import { Link } from "react-router-dom";
import useLoadingError from "../hooks/useLoadingError";
import { fetchTopics } from "../api";

export default function Topics() {
  const { data: topics, isLoading, error: err } =
    useLoadingError(fetchTopics);

  if (isLoading) return <p>Loading topics...</p>;
  if (err) return <p>Something went wrong.</p>;

  return (
    <div>
      <h1>Topics</h1>
      <p>Click on one of our following topics</p>

      {topics.map((topic) => (
        <div className="result-card" key={topic.slug}>
          <Link to={`/topics/${topic.slug}`}>
            <h3>{topic.slug}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
}