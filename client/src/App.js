import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import GoogleLogin from 'react-google-login';
import './App.css';
import NavBar from './components/navbar';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  useEffect(() => {
  }, []);

  const getProfile = () => {
    axios.get('/profile/hey', {
      headers: {
        withCredentials: true,
      },
    }).then((resp) => {
      console.log(resp);
    });
  };

  const googleLoginSuccess = async (googleData) => {
    const res = await fetch('/auth/google-login', {
      method: 'POST',
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  const googleLoginFailure = (result) => {
    console.log('FAILED TO LOGIN TO GOOGLE');
  };

  return (
    <>
      <NavBar />
      <div className="App">
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}
          buttonText="Login"
          onSuccess={googleLoginSuccess}
          onFailure={googleLoginFailure}
          cookiePolicy="single_host_origin"
        />
        <button type="button" onClick={getProfile}>
          Profile
        </button>
      </div>
    </>

  );
}

export default App;
