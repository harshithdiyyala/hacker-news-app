import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/actions.ts';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      dispatch(login(username));
      navigate('/news');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-md">
        <h2 className ="text-3xl mb-4  text-gray-900 dark:text-gray-100 text-center uppercase">Hacker News</h2>
        <h2 className="text-2xl mb-4 text-gray-900 dark:text-gray-100 text-left">Login</h2>
        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 mb-2 w-full text-gray-900 dark:text-gray-200 dark:bg-gray-700 active:border  active: border-slate-300 transition-all delay-300 rounded-md"
        />
        <p className = "text-red-400 p-2 mb-4 ">Type Some Random Name to Login!</p>
        <button type="submit" className="bg-blue-500 text-white p-2  w-full rounded-md">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
