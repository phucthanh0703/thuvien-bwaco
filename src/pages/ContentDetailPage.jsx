// src/pages/ContentDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import ContentDetail from '../components/content/ContainDetail';
import api from '../services/api';

const ContentDetailPage = () => {
  const { typeId, id } = useParams();
  const [content, setContent] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [contentType, setContentType] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Get content details
        const response = await api.getContentById(id);
        setContent(response.Content);
        setCategories(response.Categories || []);
        
        // Get content type info
        if (typeId) {
          const types = await api.getContentTypes();
          const type = types.find(t => t.ContentTypeId === parseInt(typeId));
          setContentType(type);
        }
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load content details. Please try again later.');
        setLoading(false);
        console.error('Error fetching content details:', err);
      }
    };

    fetchData();
  }, [id, typeId]);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 bg-gray-100">
          {/* Navigation breadcrumb */}
          <div className="mb-6">
            <div className="flex items-center text-sm text-gray-600">
              <Link to="/" className="hover:text-red-700">Home</Link>
              <span className="mx-2">/</span>
              
              {contentType && (
                <>
                  <Link 
                    to={`/content/${typeId}`} 
                    className="hover:text-red-700"
                  >
                    {contentType.Name}
                  </Link>
                  <span className="mx-2">/</span>
                </>
              )}
              
              <span className="text-gray-800 font-medium">
                {content ? content.Title : 'Loading...'}
              </span>
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
            <>
              <ContentDetail content={content} categories={categories} contentType={contentType} />
              
              {/* Back button */}
              <div className="mt-8">
                <Link 
                  to={`/content/${typeId}`}
                  className="inline-flex items-center px-4 py-2 bg-gray-200 rounded-md text-gray-800 hover:bg-gray-300 transition duration-150"
                >
                  <i className="fas fa-arrow-left mr-2"></i>
                  Back to {contentType ? contentType.Name : 'list'}
                </Link>
              </div>
            </>
          )}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default ContentDetailPage;