import axios from 'axios';

export const BASE_URL = 'http://wlcrmapp.it/index.php/wp-json/wlcrmapp/v1'; // process.env.API_BASE_URL;
export const BASE_HEADER_PARAM = 'XWlcrm-Token';

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data"
  },
  // withCredentials: true
});


let store
export const injectStore = _store => {
  store = _store
}

axiosPrivate.interceptors.request.use(
  config => {

    if (!config.headers[BASE_HEADER_PARAM]) {
      config.headers[BASE_HEADER_PARAM] = `Bearer ${store.getState().auth.accessToken}`;
    }

    return config;
  }, (error) => Promise.reject(error))