// src/services/api.js
import axios from 'axios';

const API_URL = 'https://gisapi.bwaco.vn/api/ThuVien';

const api = {
  // Content Types
  getContentTypes: async () => {
    try {
      const response = await axios.get(`${API_URL}/ContentTypes`);
      return response.data;
    } catch (error) {
      console.error('Error fetching content types:', error);
      throw error;
    }
  },

  // Categories
  getCategories: async () => {
    try {
      const response = await axios.get(`${API_URL}/Categories`);
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  // Content
  getAllContent: async () => {
    try {
      const response = await axios.get(`${API_URL}/Content`);
      return response.data;
    } catch (error) {
      console.error('Error fetching all content:', error);
      throw error;
    }
  },

  getContentByType: async (typeId) => {
    try {
      const response = await axios.get(`${API_URL}/Content/Type/${typeId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching content by type ${typeId}:`, error);
      throw error;
    }
  },

  getContentByCategory: async (categoryId) => {
    try {
      const response = await axios.get(`${API_URL}/Content/Category/${categoryId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching content by category ${categoryId}:`, error);
      throw error;
    }
  },

  getContentById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/Content/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching content by id ${id}:`, error);
      throw error;
    }
  },

  addContent: async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/Content`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error adding content:', error);
      throw error;
    }
  },

  updateContent: async (id, formData) => {
    try {
      const response = await axios.put(`${API_URL}/Content/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating content ${id}:`, error);
      throw error;
    }
  },

  deleteContent: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/Content/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting content ${id}:`, error);
      throw error;
    }
  },

  // Search
  searchContent: async (searchTerm, contentTypeId) => {
    try {
      let url = `${API_URL}/Search?q=${encodeURIComponent(searchTerm)}`;
      if (contentTypeId) {
        url += `&type=${contentTypeId}`;
      }
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error searching content:', error);
      throw error;
    }
  }
};

export default api;