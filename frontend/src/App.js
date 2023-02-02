import React, { useEffect } from "react";
import AllRoute from "./Route/AllRoute";
import { injectStyle } from "react-toastify/dist/inject-style";
import { ToastContainer } from "react-toastify";

function App() {
  useEffect(() => {
    injectStyle();
  }, []);
  const a = "hello world";
  return (
    <>
      <AllRoute />
      <ToastContainer
        autoClose={2000}
        hideProgressBar
        pauseOnHover={false}
        closeOnClick
      />
    </>
  );
}

export default App;
