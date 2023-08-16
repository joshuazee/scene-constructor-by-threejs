import axios from "axios";

const request = axios.create({
  // baseURL: "/api",
  // headers: {
  //   "X-Access-Token":
  //     "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODEyODE4MDQsInZlcnNpb24iOiIxNjY4MDQ0NDc1MzQ0IiwidXNlcm5hbWUiOiJ6aG9uZ2h1YWppYW4ifQ.ofjNYxs7Bsph2dbSUeHgGDpEdnW8jcZOKwNP_hCpCq8"
  // }
});

request.interceptors.request.use((config) => {
  //请求拦截器
  return config;
});

request.interceptors.response.use((response) => {
  //响应拦截器
  return response;
});

export default request;
