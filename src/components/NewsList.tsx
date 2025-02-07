import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNews, setNews } from '../store/actions.ts';
import { fetchNews } from '../api/newsApi.ts';
import { AppState } from '../store/reducers.ts';
import { NewsItem } from '../types/index.ts';
import { useNavigate } from 'react-router-dom';
import loadingGif from "../assets/Loading.gif"

const NewsList: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const news = useSelector((state: AppState) => state.news.news);
  const [page, setPage] = useState(0);
  const [hitsPerPage, setHitsPerPage] = useState(20);
  const loader = useRef<HTMLDivElement | null>(null);

  const loadNews = useCallback(async () => {
    try {
      const data = await fetchNews(page, hitsPerPage);
      if (page === 0) {
        dispatch(setNews(data.hits));
      } else {
        dispatch(addNews(data.hits));
      }
    } catch (error) {
      console.error('Error fetching news', error);
    }
  }, [page, hitsPerPage, dispatch]);

  useEffect(() => {
    loadNews();
  }, [loadNews]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );
    if (loader.current) {
      observer.observe(loader.current);
    }
    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, []);

  const handleHitsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHitsPerPage(Number(e.target.value));
    setPage(0);
    dispatch(setNews([]));
  };

  const handleNewsClick = (item: NewsItem) => {
    navigate(`/news/${item.objectID}`);
  };

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className = "container mx-auto px-10">
      <div className="mb-4 flex justify-end items-center">
        <label htmlFor="hitsPerPage" className="mr-2 text-gray-900 dark:text-gray-100 font-bold">
          Results per page :
        </label>
        <input
          id="hitsPerPage"
          type="number"
          value={hitsPerPage}
          onChange={handleHitsChange}
          className="active:border p-1 text-gray-900 dark:text-gray-100 dark:bg-gray-700 rounded-md w-[50px]"
        />
      </div>
      <div className="flex justify-center items-center gap-4 flex-wrap">
        {news.map((item) => (
          <div
          key={item.objectID}
          onClick={() => handleNewsClick(item)}
          className="p-4 rounded-md cursor-pointer hover:shadow-md bg-white dark:bg-gray-800 min-w-[300px] max-w-[300px] min-h-[200px] max-h-[200px] flex flex-col justify-between transform transition-transform duration-300 hover:scale-105"
        >
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">{item.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 self-end text-right">
            {item.author} - {new Date(item.created_at).toDateString()}
          </p>
        </div>
        
        ))}
      </div>

      <div ref={loader} className=" mx-auto flex justify-center">
        
        <img src = {loadingGif} height = "100px" width = "100px"/>
      </div>
      </div>
    </div>
  );
};

export default NewsList;
