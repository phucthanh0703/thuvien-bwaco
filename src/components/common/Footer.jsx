// src/components/common/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p>&copy; {new Date().getFullYear()} KOLLERSI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;