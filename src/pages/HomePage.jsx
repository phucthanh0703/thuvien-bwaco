// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/common/Sidebar';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import ContentGrid from '../components/content/ContentGrid';
import api from '../services/api';

const HomePage = () => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const data = await api.getAllContent();
        setContent(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load content. Please try again later.');
        setLoading(false);
        console.error('Error fetching content:', err);
      }
    };

    fetchContent();
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 bg-gray-100">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-red-700 mb-2">Chào mừng tới Thư viện BWACO</h1>
            <p className="text-gray-600">Your personal library of books and podcasts</p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-700"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 text-red-700 p-4 rounded">
              {error}
            </div>
          ) : (
            <ContentGrid items={content} />
          )}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;