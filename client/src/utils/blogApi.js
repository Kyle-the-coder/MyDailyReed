// src/api/blogApi.js
import axios from "axios";
import { auth } from "../firebaseConfig";

// Set your base URL
const API_BASE_URL = import.meta.env.VITE_API; // Change to your deployed URL in production

const getAuthHeaders = async () => {
  const currentUser = auth.currentUser;
  if (!currentUser) throw new Error("No user is signed in");

  const token = await currentUser.getIdToken();
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const postBlog = async (blogData) => {
  const config = await getAuthHeaders();
  return axios.post(API_BASE_URL, blogData, config);
};

export const getBlogs = async () => {
  const config = await getAuthHeaders();
  return axios.get(API_BASE_URL, config);
};

export const getBlogById = async (id) => {
  const config = await getAuthHeaders();
  return axios.get(`${API_BASE_URL}/${id}`, config);
};

export const updateBlog = async (id, blogData) => {
  const config = await getAuthHeaders();
  return axios.put(`${API_BASE_URL}/${id}`, blogData, config);
};

export const deleteBlog = async (id) => {
  const config = await getAuthHeaders();
  return axios.delete(`${API_BASE_URL}/${id}`, config);
};
