import { useEffect, useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import axios from 'axios';

function App() {
  const handleCallbackResponse = async (resp) => {
    resp = await axios.post('/auth/google-login', {}, {
      headers: {Authorization: `Bearer ${resp.credential}`},
      withCredentials: true
    })
    if(resp.data.success) {
      window.location.reload(false);
    }
  }
  
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_CLIENT_ID,
      callback: handleCallbackResponse
    })
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {theme: "outline", size: "large"}
    )
  }, [])

  return (
    <div>
      <NavBar/>
    </div>
  );
}

export default App;
