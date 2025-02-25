// src/pages/SearchResultsPage.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import ContentGrid from '../components/content/ContentGrid';
import api from '../services/api';

const SearchResultsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('q');
  const typeId = queryParams.get('type');
  
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [contentTypes, setContentTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(typeId || null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        
        // Fetch content types
        const types = await api.getContentTypes();
        setContentTypes(types);
        
        // Search content
        const searchResults = await api.searchContent(searchQuery, selectedType);
        setResults(searchResults);
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load search results. Please try again later.');
        setLoading(false);
        console.error('Error fetching search results:', err);
      }
    };

    if (searchQuery) {
      fetchResults();
    }
  }, [searchQuery, selectedType]);

  const handleTypeChange = (newTypeId) => {
    setSelectedType(newTypeId === 'all' ? null : parseInt(newTypeId));
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 bg-gray-100">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-red-700 mb-2">
              Search Results: "{searchQuery}"
            </h1>
            
            {/* Filter by content type */}
            <div className="flex mb-4">
              <label className="mr-2 text-gray-700">Filter by type:</label>
              <select 
                value={selectedType || 'all'} 
                onChange={(e) => handleTypeChange(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1"
              >
                <option value="all">All types</option>
                {contentTypes.map(type => (
                  <option key={type.ContentTypeId} value={type.ContentTypeId}>
                    {type.Name}
                  </option>
                ))}
              </select>
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
          ) : results.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No results found for "{searchQuery}".
            </div>
          ) : (
            <>
              <div className="mb-4 text-gray-600">
                Found {results.length} results
              </div>
              <ContentGrid items={results} contentTypeId={selectedType} />
            </>
          )}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default SearchResultsPage;