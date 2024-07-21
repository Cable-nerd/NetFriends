// AuthRequest.js
import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });
API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});;

API.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.response.data.message === "Token expired" && !originalRequest._retry) {
      originalRequest._retry = true;
      const profile = JSON.parse(localStorage.getItem('profile'));
      const { data } = await axios.post('http://localhost:5000/refresh-token', { refreshToken: profile.refreshToken });
      localStorage.setItem('profile', JSON.stringify({ ...profile, accessToken: data.accessToken }));
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.accessToken;
      return API(originalRequest);
    }
    return Promise.reject(error);
  }
);
/*
export const logIn= (formData)=> API.post('/auth/login',formData);

export const signUp = (formData) => API.post('/auth/register', formData);
*/


export const logIn = (formData) => async (dispatch) => {
  try {
    dispatch({ type: "AUTH_START" });

    // Make API request to log in user
    const response = await API.post("/auth/login", formData);

    // Dispatch success action
    dispatch({ type: "AUTH_SUCCESS", data: response.data });
  } catch (error) {
    // Dispatch failure action
    dispatch({ type: "AUTH_FAIL" });
    console.error("Error logging in:", error.message);
  }
};


export const signUp = (formData) => async (dispatch) => {
  try {
    dispatch({ type: "AUTH_START" });

    // Make API request to register user
    const response = await API.post("/auth/register", formData);

    // Dispatch success action
    dispatch({ type: "AUTH_SUCCESS", data: response.data });
  } catch (error) {
    // Dispatch failure action
    dispatch({ type: "AUTH_FAIL" });
    console.error("Error signing up:", error.message);
  }
};





