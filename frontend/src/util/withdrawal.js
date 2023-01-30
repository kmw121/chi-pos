import { getCookie } from "./cookie";
import { setEditingPost, setUser } from "../slice/userSlice";
import { toast } from "react-toastify";
import getWithdrawal from "./getWithdrawal";
import deleteAuthCookies from "./deleteAuthCookies";

export default async function withdrawal(dispatch, navigate) {
  if (window.confirm("회원 탈퇴를 하시겠습니까?")) {
    try {
      const widthdrawalRes = await getWithdrawal(getCookie("jwtToken"));
      if (widthdrawalRes.data.code === 1) {
        dispatch(setEditingPost({}));
        deleteAuthCookies();
        dispatch(setUser([]));
        toast.success("회원 탈퇴가 완료되었습니다. 이용해 주셔서 감사합니다.");
        navigate("/");
      } else if (widthdrawalRes.data.code === 2) {
        const nextWithdrawalRes = await getWithdrawal(
          getCookie("refreshToken")
        );
        if (
          nextWithdrawalRes.data.code === 2 ||
          nextWithdrawalRes.data.code === -1
        ) {
          deleteAuthCookies();
          dispatch(setUser([]));
          dispatch(setEditingPost({}));
          toast.error("잘못된 접근입니다.");
          navigate("/");
        } else if (nextWithdrawalRes.data.code === 1) {
          deleteAuthCookies();
          dispatch(setUser([]));
          dispatch(setEditingPost({}));
          toast.success(
            "회원 탈퇴가 완료되었습니다. 이용해 주셔서 감사합니다."
          );
          navigate("/");
        }
      }
    } catch (err) {
      throw new Error(err);
    }
  }
}
