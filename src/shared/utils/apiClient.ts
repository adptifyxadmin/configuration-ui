import axios from "axios";

const API_URL = process.env.REACT_APP_CONFIGURATION_API_URL || "https://hms-configuration-service-dqdfb8bsc4gygze9.eastasia-01.azurewebsites.net/api/config";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
