// src/pages/AdminUploadPage.jsx
import React from 'react';
import Sidebar from '../components/common/Sidebar';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import AdminUploadForm from '../components/admin/AdminUploadForm';

const AdminUploadPage = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 bg-gray-100">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-red-700 mb-2">Admin Upload</h1>
            <p className="text-gray-600">Add new books and podcasts to the collection</p>
          </div>
          
          <AdminUploadForm />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default AdminUploadPage;