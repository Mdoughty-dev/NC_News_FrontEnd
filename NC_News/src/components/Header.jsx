import { Link } from "react-router-dom";


function Header() {
  return (
    <header id="nav-bar">
       <Link to="/"> Home</Link>
       <Link to="/articles">Articles</Link>
    </header>
  );
}

export default Header;
