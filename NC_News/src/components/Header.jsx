import { Link } from "react-router-dom";


function Header() {
  return (
    <header id="nav-bar">
       <Link to="/"> Home</Link>
       <Link to="/articles">Articles</Link>
       <Link to="/topics">Topics</Link>
    </header>
  );
}

export default Header;
