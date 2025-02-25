// src/components/common/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

const Header = () => {
  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold text-red-700">KOLLERSI</Link>
        <SearchBar />
        <Link to="/admin/upload" className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800">
          Admin Upload
        </Link>
      </div>
    </header>
  );
};

export default Header;