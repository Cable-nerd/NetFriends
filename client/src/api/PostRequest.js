/* eslint-disable no-useless-catch */
import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  const profile = localStorage.getItem('profile');
  if (profile) {
    req.headers.Authorization = `Bearer ${JSON.parse(profile).accessToken}`;
  }
  return req;
});
/*
// Response interceptor to handle token expiration
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response && error.response.status === 401 && error.response.data.message === 'Token expired') {
      try {
        const response = await axios.post('http://localhost:5000/auth/refresh-token', {}, { withCredentials: true });
        const newAccessToken = response.data.accessToken;

        localStorage.setItem('profile', JSON.stringify({
          ...JSON.parse(localStorage.getItem('profile')),
          accessToken: newAccessToken
        }));

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
*/
/*
  export const getTimelinePosts = async (id) => {
    try {
      const response = await API.get(`/posts/${id}/timeline`);
      return response.data;
    } catch (error) {
      console.error('Error fetching timeline posts:', error);
      throw error;
    }
  };
*/
export const getTimelinePosts= (id) => API.get(`/posts/${id}/timeline`);

/*
export const likePost = async (id, userId) => {
  try {
   
    const response = await API.put(`posts/${id}/like`, { userId: userId });
    
    return response.data;
  } catch (error) {
   
    throw error;
  }
};
*/
export const likePost=(id, userId) => API.put(`posts/${id}/like`, {userId: userId})
