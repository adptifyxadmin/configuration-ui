import axios from "axios";

const API_URL = 'https://app.adptifyx.com/configuration-service/api/config';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
