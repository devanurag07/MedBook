import { getUserToken } from './authUtils';
import axios from 'axios';
const excludeUrls = ['get-customers', 'check-email-exist', 'check-mobile-exist', 'get-prescriptions', 'check-customer-email-exist','check-customer-mobile-exist']
axios.interceptors.request.use(function (config) {
  const token = getUserToken();
  const skipUrl = excludeUrls.find(r => config.url.includes(r));
  if (!skipUrl) {
    document.body.classList.add('custom-loader')
  }
  if (token) {
    config.headers.Authorization = `JWT ${token}`;
  }
  if (config.url.includes('api/users/update-profile') && (config.method == 'post' || config.method == 'POST')) {
  }
  else {
    config.headers['Content-Type'] = 'application/json';
    config.headers['Accept'] = 'application/json';
  }
  return config;
}, function (error) {
  // Do something with request error
  document.body.classList.remove('custom-loader');
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  //put(setLoadingData(false));
  document.body.classList.remove('custom-loader');
  return response;
}, function (error) {
  //put(setLoadingData(false));
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  document.body.classList.remove('custom-loader');
  return Promise.reject(error);
});

