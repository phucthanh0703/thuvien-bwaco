// src/components/common/Sidebar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '../../services/api';

const Sidebar = () => {
  const [contentTypes, setContentTypes] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchContentTypes = async () => {
      try {
        const types = await api.getContentTypes();
        setContentTypes(types);
      } catch (error) {
        console.error('Error fetching content types:', error);
      }
    };

    fetchContentTypes();
  }, []);

  return (
    <div className="bg-red-700 text-white w-16 flex flex-col items-center py-4 space-y-8">
      <i className="fas fa-bars text-2xl"></i>
      
      {contentTypes.map(type => (
        <Link 
          key={type.ContentTypeId} 
          to={`/content/${type.ContentTypeId}`}
          className={location.pathname.includes(`/content/${type.ContentTypeId}`) ? 'text-yellow-300' : ''}
        >
          <i className={`${type.IconClass} text-2xl`}></i>
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;