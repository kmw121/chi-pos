import React, { useEffect } from "react";
import AllRoute from "./Route/AllRoute";
import { injectStyle } from "react-toastify/dist/inject-style";
function App() {
  useEffect(() => {
    injectStyle();
  }, []);
  return (
    <>
      <AllRoute />
    </>
  );
}

export default App;
