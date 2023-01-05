import React from "react";
import AllRoute from "./Route/AllRoute";
import { getCookie } from "./util/cookie";
function App() {
  const access_token = getCookie("jwtToken");
  const refresh_token = getCookie("refreshToken");
  console.log("access : ", access_token, "refresh : ", refresh_token);
  return (
    <>
      <AllRoute />
    </>
  );
}

export default App;
