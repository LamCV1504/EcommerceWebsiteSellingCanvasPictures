import axios from "axios";

// api public
export const APIPUBLIC = axios.create({
  baseURL: "http://localhost:8000/v1",
});

// api user
export const APIV1 = axios.create({ baseURL: "http://localhost:8000/v1" });

APIV1.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("user")).accessToken
    }`;
  }
  return req;
});
