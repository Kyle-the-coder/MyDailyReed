import axios from "axios";
import { getAuth } from "firebase/auth";

// Set your base URL
const API_BASE_URL = "https://mydailyreed.web.app/api/blogs"; // Change to your deployed URL in production

// Function to get authentication headers if user is signed in
export const getAuthHeaders = async () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    return {}; // No headers if user isn't signed in
  }

  const token = await user.getIdToken();
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Public route for fetching all blogs
export const getBlogs = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    console.log("res", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    throw error;
  }
};

// Public route for fetching a blog by ID
export const getBlogById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`); // No need for auth headers here
    return response.data;
  } catch (error) {
    console.error("Failed to fetch blog:", error);
    throw error;
  }
};

// Private route to create a new blog (requires authentication)
export const postBlog = async (blogData) => {
  const config = await getAuthHeaders(); // Will include auth headers if signed in
  try {
    const response = await axios.post(API_BASE_URL, blogData, config);
    return response.data;
  } catch (error) {
    console.error("Failed to post blog:", error);
    throw error;
  }
};

// Private route to update a blog (requires authentication)
export const updateBlog = async (id, blogData) => {
  const config = await getAuthHeaders(); // Will include auth headers if signed in
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, blogData, config);
    return response.data;
  } catch (error) {
    console.error("Failed to update blog:", error);
    throw error;
  }
};

// Private route to delete a blog (requires authentication)
export const deleteBlog = async (id) => {
  const config = await getAuthHeaders(); // Will include auth headers if signed in
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`, config);
    return response.data;
  } catch (error) {
    console.error("Failed to delete blog:", error);
    throw error;
  }
};
