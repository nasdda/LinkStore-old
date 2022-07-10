import { GoogleLogin, useGoogleLogin, googleLogout } from '@react-oauth/google';
import axios from 'axios';
import React from 'react';
import './App.css';

function App() {
  const login = useGoogleLogin({
    onSuccess: async ({ code }) => {
      const tokens = await axios.post(
        `${process.env.REACT_APP_SERVER}/users/auth/google`,
        {
          code,
        },
      );
      console.log(tokens);
    },
    flow: 'auth-code',
  });

  return (
    <div className="App">
      <button type="button" style={{ marginTop: '100px' }} onClick={() => login()}>
        Register
      </button>
    </div>
  );
}

export default App;
