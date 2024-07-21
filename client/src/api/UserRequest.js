import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

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
export const getUser = async (userId) => {
  try {
    console.log(`Fetching user with ID: ${userId}`);
    const response = await API.get(`/user/${userId}`);
    console.log("User data received:", response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID ${userId}:`, error);
    throw error;  // Re-throw the error after logging it
  }
}
*/


export const getUser = (userId) => API.get(`/user/${userId}`);

export const UpdateUser = (id, FormData) => API.put(`/user/${id}`, FormData);

export const getAllUsers = () => API.get("/user");

export const FollowUser =  (id, data) => API.put(`/user/${id}/follow`, data)

export const UnFollowUser = (id, data)=> API.put(`/user/${id}/unfollow`, data)

/*

export const FollowUser = async (id, data)=> {
  try {
    const response = await API.put(`/user/${id}/follow`, data)
    return response;
  } catch (error) {
    console.log(error)
  }
}
*/


/*
export const UpdateUser = async(id, formData)  => {
  try {
   await API.put(`/user/${id}`, formData)
  } catch (error) {
    console.log(error)
  }
}
*/








