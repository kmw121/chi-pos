import SettingDetail from "./SettingDetail";
import authCheck from "../../util/authCheck";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Setting() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => {
    return state.user;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    authCheck(dispatch, navigate, user);
  }, []);

  return <SettingDetail />;
}
export default Setting;
