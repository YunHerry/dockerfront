import axios from "axios";

const service = axios.create({
  baseURL: '',
  withCredentials: true,
  timeout: 5000, // request timeout
});
export default service;
