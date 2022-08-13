import { useEffect, useState } from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, setUser } from './redux/slice/slice'
import { Routes, Route, Link } from "react-router-dom";
import Links from './components/pages/Links';
import Home from './components/pages/Home';
import Create from './components/pages/Create';

function App() {
  const user = useSelector(selectUser)
  const handleCallbackResponse = async (resp) => {
    resp = await axios.post('/auth/google-login', {}, {
      headers: { Authorization: `Bearer ${resp.credential}` },
      withCredentials: true
    })
    if (resp.data.success) {
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
      { theme: "outline", size: "medium" }
    )
  }, [])

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/links/:uuid" element={<Links />} />
        <Route path="/create" element={<Create />} />
      </Routes>

    </div>
  );
}

export default App;


