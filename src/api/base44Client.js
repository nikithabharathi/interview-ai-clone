// src/api/base44Client.js

import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000", // change later if needed
});

export default API;