import React,{useState,useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../store/reducers.ts';
import { updateVote } from '../store/actions.ts';

const NewsDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const news = useSelector((state: AppState) => state.news.news);
  const newsItem = news.find((item) => item.objectID === id);

  const [activeTab, setActiveTab] = useState('content');


  useEffect(() => {
    if (newsItem) {
      setActiveTab(newsItem.url ? 'article' : 'content');
    }
  }, [newsItem]);

  if (!newsItem) {
    return <div className="p-4 text-gray-900 dark:text-gray-100">News not found.</div>;
  }

  const handleVote = (voteType: 'upvote' | 'downvote') => {
    dispatch(updateVote(newsItem.objectID, voteType));
  };


  return (
    <div className = " bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto p-4">
    <div className="p-4  text-gray-900 dark:text-gray-100">
      
      <div className="flex items-center space-x-4 justify-between">
        <div className = "">
        <button onClick={() => navigate(-1)} className=" text-blue-500 hover:text-blue-600 hover:font-bold">
        Back
      </button>
        </div>
        <div className="flex items-center space-x-4">
        <button
          onClick={() => handleVote('upvote')}
          className={`bg-green-500 text-white p-2 rounded ${newsItem.voteStatus === 'upvote' ? 'opacity-80' : ''}`}
        >
          Upvote ({newsItem.upvotes || 0})
        </button>
        <button
          onClick={() => handleVote('downvote')}
          className={`bg-red-500 text-white p-2 rounded ${newsItem.voteStatus === 'downvote' ? 'opacity-80' : ''}`}
        >
          Downvote ({newsItem.downvotes || 0})
        </button>
      </div>
      </div>
      <h2 className="text-2xl font-bold mb-2">{newsItem.title}</h2>
      <p className="mb-4">
        By {newsItem.author} on {new Date(newsItem.created_at).toLocaleString()}
      </p>
          
          <div className="mb-4">
        <div className="flex  mb-2">
          {newsItem.url && (
            <button
              onClick={() => setActiveTab('article')}
              className={`py-2 px-4 ${
                activeTab === 'article'
                  ? 'border-b-2 border-blue-500 text-blue-500'
                  : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              Article
            </button>
          )}
          <button
            onClick={() => setActiveTab('content')}
            className={`py-2 px-4 ${
              activeTab === 'content'
                ? 'border-b-2 border-blue-500 text-blue-500'
                : 'text-gray-600 dark:text-gray-300'
            }`}
          >
            Content
          </button>
        </div>
        <div className="tab-content">
          {activeTab === 'article' && newsItem.url ? (
            <iframe
              src={newsItem.url}
              title="Article Content"
              className="w-full h-96 rounded-md"
            />
          ) : activeTab === 'content' && newsItem.content ? (
            <div
              dangerouslySetInnerHTML={{ __html: newsItem.content }}
              className="prose dark:prose-dark"
            />
          ) : (
            <p>No content available for this article.</p>
          )}
        </div>
      </div>
      <div>
        <a target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500  mb-4 block"> Link to the Article &#8599;</a>
      </div>
  
    </div>
    </div>
    </div>
  );
};

export default NewsDetails;
