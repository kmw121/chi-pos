import React from "react";
import AllRoute from "./Route/AllRoute";
import { getCookie } from "./util/cookie";
function App() {
  const access = getCookie("jwtToken");
  const access2 = getCookie(["jwtToken"]);
  console.log(access);
  console.log(access2);
  return (
    <>
      <AllRoute />
    </>
  );
}

export default App;
