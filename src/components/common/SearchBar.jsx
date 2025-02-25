// src/components/common/SearchBar.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-1/3">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-full px-4 py-2 w-full"
          placeholder="Type to start searching..."
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full p-2"
        >
          <i className="fas fa-search"></i>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;