import { useEffect, useState } from "react";
import './App.css'
import Header from "./components/Header";
import  Home  from "./components/Home";
import Articles from "./components/Articles";
import Article from "./components/Article";
import Topics from "./components/Topics";
import { Routes, Route } from "react-router-dom";


export default function App() {
  const [articles, setArticles] = useState([]);
  const [articleId, setArticleId] = useState();
 
  
  
  return(
  <>
  < Header/>
  <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<Articles articles={articles}  setArticles={setArticles} articleId={articleId} setArticleId={setArticleId}/>} />
       <Route path="/article/:article_id" element={<Article  setArticles={setArticles}/>} />
       <Route path="/topics" element={<Topics />} />
      </Routes>
  </>
  )
}





