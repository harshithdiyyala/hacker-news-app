// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login.tsx';
import NewsList from './components/NewsList.tsx';
import NewsDetails from './components/NewsDetails.tsx';
import NavBar from './components/Navbar.tsx';
import { useSelector } from 'react-redux';
import { AppState } from './store/reducers';


const App: React.FC = () => {
  const isAuthenticated = useSelector((state: AppState) => state.auth.isAuthenticated);
  const darkMode = useSelector((state: AppState) => state.theme.darkMode);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <Router>
        {isAuthenticated && <NavBar />}
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/news" /> : <Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/news" element={isAuthenticated ? <NewsList /> : <Navigate to="/login" />} />
          <Route path="/news/:id" element={isAuthenticated ? <NewsDetails /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

