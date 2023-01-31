import { getCookie } from "./cookie";
import getWithdrawal from "./getWithdrawal";

export default async function withdrawal(dispatch, navigate) {
  if (window.confirm("회원 탈퇴를 하시겠습니까?")) {
    try {
      await getWithdrawal(getCookie("jwtToken"), dispatch, navigate);
    } catch (err) {
      throw new Error(err);
    }
  }
}
