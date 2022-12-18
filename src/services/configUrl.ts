import axios, { AxiosError, AxiosResponse } from "axios";
import { localServ } from "./localServices";
export const BASE_URL = "https://airbnbnew.cybersoft.edu.vn";
export const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOb2RlanMgMjUiLCJIZXRIYW5TdHJpbmciOiIxNS8wNS8yMDIzIiwiSGV0SGFuVGltZSI6IjE2ODQxMDg4MDAwMDAiLCJuYmYiOjE2NjY3MTcyMDAsImV4cCI6MTY4NDI1NjQwMH0.vdVVhPEIB7ZV9oEaVDyxq430wfBgJgeYqiM5JTcdwqo";
export const https = axios.create({
  baseURL: BASE_URL,
  headers: {
    tokenCybersoft: TOKEN,
    token: localServ.user.get()?.token,
  },
});
https.interceptors.response.use((response) => response.data);
