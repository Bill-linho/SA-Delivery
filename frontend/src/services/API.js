import axios from "axios";

const api_url = import.meta.env.VITE_API_URL

const API = axios.create({
  baseURL: api_url,
});


export default API;