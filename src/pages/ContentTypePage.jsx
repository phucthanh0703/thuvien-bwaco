// src/pages/ContentTypePage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import ContentGrid from '../components/content/ContentGrid';
import api from '../services/api';

const ContentTypePage = () => {
  const { typeId } = useParams();
  const [content, setContent] = useState([]);
  const [contentType, setContentType] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch content type info
        const types = await api.getContentTypes();
        const currentType = types.find(t => t.ContentTypeId === parseInt(typeId));
        setContentType(currentType);
        
        // Fetch content by type
        const contentData = await api.getContentByType(typeId);
        setContent(contentData);
        
        // Fetch categories
        const categoriesData = await api.getCategories();
        setCategories(categoriesData);
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load content. Please try again later.');
        setLoading(false);
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, [typeId]);

  const handleCategoryFilter = async (categoryId) => {
    try {
      setLoading(true);
      setSelectedCategory(categoryId);
      
      if (categoryId) {
        const filteredContent = await api.getContentByCategory(categoryId);
        // Further filter by content type
        setContent(filteredContent.filter(item => item.ContentTypeId === parseInt(typeId)));
      } else {
        const allContent = await api.getContentByType(typeId);
        setContent(allContent);
      }
      
      setLoading(false);
    } catch (err) {
      setError('Failed to filter content. Please try again later.');
      setLoading(false);
      console.error('Error filtering content:', err);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 bg-gray-100">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-red-700 mb-2">
              {contentType ? contentType.Name : 'Loading...'}
            </h1>
            
            {/* Category Filter */}
            <div className="flex space-x-2 overflow-x-auto py-2">
              <button
                onClick={() => handleCategoryFilter(null)}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedCategory === null 
                    ? 'bg-red-700 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All
              </button>
              
              {categories.map(category => (
                <button
                  key={category.CategoryId}
                  onClick={() => handleCategoryFilter(category.CategoryId)}
                  className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                    selectedCategory === category.CategoryId 
                      ? 'bg-red-700 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {category.Name}
                </button>
              ))}
            </div>
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
            <ContentGrid items={content} contentTypeId={typeId} />
          )}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default ContentTypePage;