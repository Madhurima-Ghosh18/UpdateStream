import { useState, useEffect } from "react";
import NewsItem from "./NewsItem";

const NewsBoard = ({ category }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`https://updatestream.onrender.com/api/news?category=${category}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setArticles(data.articles || []);
      } catch (error) {
        console.error('Error fetching news:', error.message);
        setArticles([]);
      }
    };

    fetchNews();
  }, [category]);

  return (
    <div>
      <h2 className="text-center">Latest <span className="badge bg-danger">News</span></h2>
      {articles.length > 0 ? (
        articles
          .filter(article => 
            article &&
            article.title &&
            !article.title.includes("[Removed]") &&
            (!article.description || !article.description.includes("[Removed]"))
          )
          .map((news, index) => (
            <NewsItem 
              key={index} 
              title={news.title} 
              description={news.description} 
              src={news.urlToImage} 
              url={news.url}
            />
          ))
      ) : (
        <p>No articles available</p>
      )}
    </div>
  );
};

export default NewsBoard;
