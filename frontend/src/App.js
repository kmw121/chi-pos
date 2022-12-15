// src/main/frontend/src/App.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import AllRoute from "./components/Route/AllRoute";
function App() {
  // const [hello, setHello] = useState("");

  useEffect(() => {
    axios
      .get("/api/user")
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      <AllRoute />
    </>
  );
}

export default App;
