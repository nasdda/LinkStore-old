import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  useEffect(() => {
    axios.get('http://localhost:8080/auth/login/success', { withCredentials: true }).then((resp) => {
      console.log(resp);
      setToken(resp.data.jwt);
    });
  }, []);
  const login = () => {
    window.open('http://localhost:8080/auth/google', '_self');
  };

  const getProfile = () => {
    console.log(`Bearer ${token}`);
    axios.get('http://localhost:8080/profile/hey', {
      headers: {
        withCredentials: true,
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      console.log(resp);
    });
  };

  return (
    <div className="App">
      <button type="button" style={{ marginTop: '100px' }} onClick={login}>
        Register
      </button>
      <button type="button" onClick={getProfile}>
        Profile
      </button>
    </div>
  );
}

export default App;
