// src/main/frontend/src/App.js

import React, {useEffect, useState} from 'react';
import axios from 'axios';

function App() {
  const [hello, setHello] = useState('')

  useEffect(() => {
    axios.get('/api/user')
        .then(response => setHello(response.data))
        .catch(error => console.log(error))
  }, []);
  console.log('pengsoo check')
  return (
      <div>
        백엔드에서 가져온 데이터입니다 : {hello.id}
          백엔드에서 가져온 데이터입니다 : {hello.name}
      </div>
  );
}

export default App;