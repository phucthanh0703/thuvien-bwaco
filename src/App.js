// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ContentTypePage from './pages/ContentTypePage';
import ContentDetailPage from './pages/ContentDetailPage';
import SearchResultsPage from './pages/SearchResultsPage';
import AdminUploadPage from './pages/AdminUploadPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/content/:typeId" element={<ContentTypePage />} />
        <Route path="/content/:typeId/:id" element={<ContentDetailPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/admin/upload" element={<AdminUploadPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;