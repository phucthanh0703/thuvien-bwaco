// src/components/content/ContentGrid.jsx
import React from 'react';
import ContentCard from './ContentCard';

const ContentGrid = ({ items, contentTypeId }) => {
  if (!items || items.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No content found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map(item => (
        <ContentCard 
          key={item.ContentItemId} 
          item={item} 
          contentType={contentTypeId} 
        />
      ))}
    </div>
  );
};

export default ContentGrid;