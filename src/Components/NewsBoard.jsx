import { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import defaultImage from "../assets/news.jpg";

const NewsBoard = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;
        const response = await fetch(url);

        if (response.status === 429) {
          throw new Error('Too many requests. Please try again later.');
        }

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (data.articles && data.articles.length > 0) {
          setArticles(data.articles);
          setError(null);
        } else {
          throw new Error('No articles found');
        }
      } catch (error) {
        console.error('Error fetching news:', error.message);
        setError(error.message);
        setArticles([]);
      }
    };

    fetchNews();
  }, [category, apiKey]);

  return (
    <div>
      <h2 className="text-center">Latest <span className="badge bg-danger">News</span></h2>
      {error && <p className="text-danger">{error}</p>}
      {articles.length > 0 ? (
        articles
          .filter(article =>
            article &&
            article.title &&
            !article.title.includes("[Removed]") &&
            (!article.description || !article.description.includes("[Removed]"))
          )
          .map((news) => (
            <NewsItem
              key={news.url}
              title={news.title}
              description={news.description}
              src={news.urlToImage || defaultImage}
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