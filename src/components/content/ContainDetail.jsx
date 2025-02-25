// src/components/content/ContentDetail.jsx
import React from 'react';

const ContentDetail = ({ content, categories }) => {
  if (!content) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white shadow-md rounded p-6">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Cover Image */}
        <div className="md:w-1/3">
          <img 
            src={content.CoverImageUrl || '/placeholder-image.jpg'} 
            alt={`Cover of ${content.Title}`} 
            className="rounded-lg w-full object-cover" 
          />
        </div>
        
        {/* Content Details */}
        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold mb-2">{content.Title}</h1>
          <h2 className="text-xl text-gray-700 mb-4">{content.Author}</h2>
          
          {/* Categories */}
          {categories && categories.length > 0 && (
            <div className="mb-4">
              <span className="text-gray-600 mr-2">Categories:</span>
              {categories.map((category, index) => (
                <span 
                  key={category.CategoryId} 
                  className="bg-gray-200 rounded-full px-3 py-1 text-sm mr-2"
                >
                  {category.Name}
                </span>
              ))}
            </div>
          )}
          
          {/* Publication Date */}
          <div className="mb-6 text-sm text-gray-500">
            Published: {new Date(content.PublishedDate).toLocaleDateString()}
          </div>
          
          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-800 whitespace-pre-line">{content.Description}</p>
          </div>
          
          {/* Download Link */}
          {content.DownloadLink && (
            <div className="mt-4">
              <a 
                href={content.DownloadLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-700 text-white px-6 py-3 rounded-lg inline-flex items-center hover:bg-red-800"
              >
                <i className="fas fa-download mr-2"></i>
                Download
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentDetail;