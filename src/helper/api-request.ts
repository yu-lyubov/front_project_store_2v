import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000/api';

const refreshToken = async () => {
  try {
    const result = await axios.get('/refresh');
    const token = result?.data?.accessToken || '';
    localStorage.setItem('access_token', JSON.stringify(token))
    return token;
  } catch (err) {
    console.log(err);
  }
};

axios.interceptors.request.use(
  async (config) => {
    const token = JSON.parse(localStorage.getItem('access_token') || '{}');

    if (token) {
      config.withCredentials = true;
      config.headers = {
        ...config.headers,
        authorization: `Bearer ${token}`,
      };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error?.config;

    if (error?.response?.status === 401 && !config?._retry) {
      config._retry = true;

      const token = await refreshToken();

      if (token) {
        config.headers = {
          ...config.headers,
          authorization: `Bearer ${token}`,
        };
      }

      return axios(config);
    }
    return Promise.reject(error);
  }
);

export const axiosPrivate = axios;
