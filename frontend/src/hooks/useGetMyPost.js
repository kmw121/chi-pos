import axios from "axios";
import { API_URL } from "../util/API_URL";
import { getCookie, setCookie } from "../util/cookie";
import { useEffect, useState } from "react";
import { setUser } from "../slice/userSlice";
import deleteAuthCookies from "../util/deleteAuthCookies";
import wrongRequest from "../util/wrongRequest";
import { toast } from "react-toastify";
import {
  accessTokenValidate,
  refreshTokenValidate,
} from "../util/tokenValidation";

export default function useGetMyPost(dispatch, navigate) {
  const [post, setPost] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(API_URL + "/myPost", {
          headers: {
            Authorization: `${getCookie("jwtToken")}`,
          },
        });
        const {
          accessValid,
          accessExpired,
          accessInvalid,
        } = accessTokenValidate(res);
        if (accessValid) {
          setPost(res.data.data);
          return;
        }
        if (accessInvalid) {
          wrongRequest(dispatch, navigate);
          return;
        }
        if (accessExpired) {
          const nextRes = await axios.get(API_URL + "/myPost", {
            headers: { Authorization: `${getCookie("refreshToken")}` },
          });
          const {
            refreshValid,
            refreshExpired,
            refreshInvalid,
          } = refreshTokenValidate(nextRes);
          if (refreshExpired || refreshInvalid) {
            deleteAuthCookies();
            dispatch(setUser([]));
            toast.error("잘못된 접근입니다. 다시 로그인 해주세요.");
            navigate("/");
            return;
          }
          if (refreshValid) {
            setCookie("jwtToken", nextRes.data.data);
            setCookie();
            const response = await axios.get(API_URL + "/myPost", {
              headers: {
                Authorization: `${nextRes.data.data}`,
              },
            });
            const isNewAccessTokenValid = response.data.code === 1;
            if (!isNewAccessTokenValid) {
              deleteAuthCookies();
              dispatch(setUser([]));
              toast.error("잘못된 접근입니다. 다시 로그인 해주세요.");
              navigate("/");
              return;
            }
            if (isNewAccessTokenValid) {
              setPost(res.data.data);
              return;
            }
          }
          return;
        }
      } catch (err) {
        toast.error(err);
      }
    }
    fetchData();
  }, []);
  return { post, setPost };
}
