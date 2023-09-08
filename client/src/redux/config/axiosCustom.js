import axios from "axios";
// import { constants } from "contains/contants";
const HOST = "http://localhost:8000/v1";
// export interface IAxiosCustom {
//   method: string,
//   uri: string,
//   params: {} | null,
//   data: {} | null,
// }

// export interface IDataResponse {
//   status: boolean,
//   data: any
// }

async function axiosCustom(config) {
  let response = await axios({
    method: config.method,
    url: HOST + config.uri,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    params: config.params,
    data: config.data,
  })
    .then((res) => {
      const data = {
        status: true,
        data: res.data,
      };
      return data;
    })
    .catch((err) => {
      if (err.response.status === 401) {
        axios({
          method: "POST",
          url: `${HOST}/pub/refresh`,
          data: {
            refreshToken: localStorage.getItem("refreshToken"),
          },
        })
          .then((res) => {
            localStorage.setItem("accessToken", res.data.accessToken);
            localStorage.setItem("refreshToken", res.data.refreshToken);
          })
          .catch((err) => {
            console.log("login Page");
          })
          .finally(() => {
            const data = {
              status: false,
              data: "Vui lòng đăng nhập lại",
            };
            return data;
          });
      } else {
        const data = {
          status: false,
          data: err.response.data,
        };
        return data;
      }
    });
  return response;
}

export default axiosCustom;
