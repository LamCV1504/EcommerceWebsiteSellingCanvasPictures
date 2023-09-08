import axios from "axios";

// api public
export const APIPUBLIC = axios.create({
  baseURL: "http://localhost:8000/v1",
});

// api admin
export const APIV1 = axios.create({ baseURL: "http://localhost:8000/v1" });

APIV1.interceptors.request.use((req) => {
  if (localStorage.getItem("auth")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("auth")).accessToken
    }`;
  }
  return req;
});

// // api employee
// export const APIV2 = axios.create({ baseURL: "http://localhost:5000/" });
// APIV2.interceptors.request.use((req) => {
//   if (localStorage.getItem("adminUser")) {
//     req.headers.Authorization = `Bearer ${
//       JSON.parse(localStorage.getItem("adminUser")).accessToken
//     }`;
//   }
//   return req;
// });
