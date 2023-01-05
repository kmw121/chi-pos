import { Cookies } from "react-cookie";
const cookies = new Cookies();

export const setCookie = (name, value) => {

  const CookieSetOptions =  {
    path: "/",
    domain: "http://3.39.164.180:8080"
  }
  return cookies.set(name, value,CookieSetOptions);

};

export const getCookie = (name) => {
  return cookies.get(name);
};

export const deleteCookie = (name) => {
  return cookies.remove(name);
};
