import axios from "axios";
import { API_URL } from "./API_URL";
import { getCookie, deleteCookie, setCookie } from "./cookie";

export const instance = axios.create({
  baseURL: API_URL,
  headers: { Authorization: `${getCookie("jwtToken")}` },
});

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    try {
      const errResponseStatus = error.response.status;
      const errResponseData = error.response.data;
      const prevRequest = error.config;
      if (errResponseData.code === 2) {
        const refreshToken = getCookie("refreshToken");
        if (refreshToken) {
          async function regenerateToken() {
            return await axios
              .get(API_URL + "/user/3", {
                headers: { Authorization: refreshToken },
              })
              .then(async (res) => {
                const helloAccessToken = res.data.data;
                setCookie("jwtToken", helloAccessToken);
                prevRequest.headers.Authorization = helloAccessToken;
                return await axios(prevRequest);
              })
              .catch((e) => {
                console.log(e);
              });
          }
          return await regenerateToken();
        } else {
          throw new Error("hello world");
        }
      }
    } catch (e) {
      throw new Error(e);
    }
  }
);
