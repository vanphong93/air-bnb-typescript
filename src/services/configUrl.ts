import axios from "axios";
import { localServ } from "./localServices";
export const BASE_URL = "https://airbnbnew.cybersoft.edu.vn";
export const TOKEN =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAwMSIsIkhldEhhblN0cmluZyI6IjMwLzA5LzIwMzEiLCJIZXRIYW5UaW1lIjoiMTk0ODQ5MjgwMDAwMCIsIm5iZiI6MTYwMTIyNjAwMCwiZXhwIjoxOTQ4NjQwNDAwfQ.4l-eTzlgVnFczfvc2Or7BNPOcaesY3Kwc8RoNm-o-6M";
export const https = axios.create({
  baseURL: BASE_URL,
  headers: {
    tokenCybersoft: TOKEN,
    token: localServ.user.get()?.token,
  },
});
https.interceptors.response.use((response) => response.data);
