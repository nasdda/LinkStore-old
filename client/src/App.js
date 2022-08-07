import { useEffect, useState } from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, setUser } from './redux/slice/slice'


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
      <button onClick={async () => {
        await axios.post(`/user/link`, {
          link: {
            url: 'https://stackoverflow.com/questions/33049707/push-items-into-mongo-array-via-mongoose',
            title: "stack overflow"
          }
        }, { withCredentials: true })
      }}>
        Post
      </button>
    </div>
  );
}

export default App;
