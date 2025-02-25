// src/components/admin/AdminUploadForm.jsx
import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const AdminUploadForm = () => {
  const [contentTypes, setContentTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  
  const [formData, setFormData] = useState({
    contentTypeId: '',
    title: '',
    author: '',
    description: '',
    downloadLink: '',
    coverImage: null,
    categoryIds: []
  });

  // Fetch content types and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const types = await api.getContentTypes();
        setContentTypes(types);
        
        if (types.length > 0) {
          setFormData(prev => ({
            ...prev,
            contentTypeId: types[0].ContentTypeId
          }));
        }
        
        const cats = await api.getCategories();
        setCategories(cats);
      } catch (error) {
        console.error('Error fetching data:', error);
        setMessage({ text: 'Failed to load content types and categories', type: 'error' });
      }
    };
    
    fetchData();
  }, []);
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Handle file selection
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      coverImage: e.target.files[0]
    });
  };
  
  // Handle category selection
  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    const categoryId = parseInt(value);
    
    if (checked) {
      setFormData({
        ...formData,
        categoryIds: [...formData.categoryIds, categoryId]
      });
    } else {
      setFormData({
        ...formData,
        categoryIds: formData.categoryIds.filter(id => id !== categoryId)
      });
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: '', type: '' });
    
    try {
      // Create form data object for API
      const apiFormData = new FormData();
      apiFormData.append('ContentTypeId', formData.contentTypeId);
      apiFormData.append('Title', formData.title);
      apiFormData.append('Author', formData.author);
      apiFormData.append('Description', formData.description);
      apiFormData.append('DownloadLink', formData.downloadLink);
      
      if (formData.coverImage) {
        apiFormData.append('CoverImage', formData.coverImage);
      }
      
      if (formData.categoryIds.length > 0) {
        apiFormData.append('CategoryIds', formData.categoryIds.join(','));
      }
      
      // Submit to API
      await api.addContent(apiFormData);
      
      // Show success message
      setMessage({ text: 'Content uploaded successfully!', type: 'success' });
      
      // Reset form
      setFormData({
        contentTypeId: formData.contentTypeId,
        title: '',
        author: '',
        description: '',
        downloadLink: '',
        coverImage: null,
        categoryIds: []
      });
      
      // Reset file input
      document.getElementById('coverImage').value = '';
      
    } catch (error) {
      console.error('Error uploading content:', error);
      setMessage({ text: 'Failed to upload content. Please try again.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="bg-white shadow-md rounded p-6">
      <h2 className="text-xl font-bold mb-4">Upload Content</h2>
      
      {message.text && (
        <div className={`p-3 mb-4 rounded ${
          message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {message.text}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Content Type</label>
            <select
              name="contentTypeId"
              value={formData.contentTypeId}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            >
              {contentTypes.map(type => (
                <option key={type.ContentTypeId} value={type.ContentTypeId}>
                  {type.Name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Author</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            rows="4"
          ></textarea>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Download Link</label>
          <input
            type="text"
            name="downloadLink"
            value={formData.downloadLink}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="https://example.com/download"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Cover Image</label>
          <input
            type="file"
            id="coverImage"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
            accept="image/*"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Categories</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-2 border rounded max-h-48 overflow-y-auto">
            {categories.map(category => (
              <div key={category.CategoryId} className="flex items-center">
                <input
                  type="checkbox"
                  id={`category-${category.CategoryId}`}
                  value={category.CategoryId}
                  checked={formData.categoryIds.includes(category.CategoryId)}
                  onChange={handleCategoryChange}
                  className="mr-2"
                />
                <label htmlFor={`category-${category.CategoryId}`}>
                  {category.Name}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-6">
          <button
            type="submit"
            className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800 disabled:bg-red-300"
            disabled={isLoading}
          >
            {isLoading ? 'Uploading...' : 'Upload Content'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminUploadForm;