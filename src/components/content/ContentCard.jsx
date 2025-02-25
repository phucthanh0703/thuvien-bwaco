// src/components/content/ContentCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ContentCard = ({ item, contentType }) => {
  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <Link to={`/content/${contentType}/${item.ContentItemId}`}>
        <img 
          src={item.CoverImageUrl || '/placeholder-image.jpg'} 
          alt={`Cover of ${item.Title}`} 
          className="rounded-lg mb-4 w-full h-48 object-cover" 
        />
        <div className="text-lg font-semibold">{item.Title}</div>
      </Link>
      
      <div className="text-gray-700 mb-1">{item.Author}</div>
      
      <div className="text-gray-600 mb-2 text-sm line-clamp-2">
        {item.Description}
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-gray-500 text-xs">
          {formatDate(item.PublishedDate)}
        </div>
        
        {item.DownloadLink && (
          <a 
            href={item.DownloadLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-red-700 hover:text-red-900 text-sm"
          >
            <i className="fas fa-download mr-1"></i>
            Download
          </a>
        )}
      </div>
    </div>
  );
};

export default ContentCard;