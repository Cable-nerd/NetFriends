import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).accessToken}`;
  }
  return req;
});

/*
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401 && error.response.data.message === 'Token expired') {
      const originalRequest = error.config;
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

export const UploadImage = (data) => API.post("/upload/", data);




/*
export const UploadImage = (data) => async (dispatch) => {
  try {
   
    const response = await API.post("/upload/", data);
    return response.data;
  } catch (error) {
    console.error(error);
    dispatch({ type: "UPLOAD_FAIL" });
    
  }
};
*/
export const UploadPost = (data) => API.post("/posts", data);
/*
export const UploadPost = async (data) => {
  try {
    const response = await API.post('/posts', data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error so the calling function can handle it
  }
};
*/
