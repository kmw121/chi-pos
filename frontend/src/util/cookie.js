import { Cookies } from "react-cookie";
const cookies = new Cookies();

export const setCookie = (name, value) => {
  console.log("나 실행 됨?");
  return cookies.set(name, value);
};

export const getCookie = (name) => {
  return cookies.get(name);
};

export const deleteCookie = (name) => {
  return cookies.remove(name);
};
