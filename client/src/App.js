import { useEffect } from 'react'
import './App.css'
import NavBar from './components/NavBar/NavBar'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { attempted, setUser } from './redux/slice/slice'
import { Routes, Route } from "react-router-dom"
import Links from './components/pages/Links'
import Create from './components/pages/Create'
import Collections from './components/pages/Collections'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import Account from './components/pages/Account'

function App() {
  const dispatch = useDispatch()
  const handleCallbackResponse = async (resp) => {
    resp = await axios.post('/auth/google-login', {}, {
      headers: { Authorization: `Bearer ${resp.credential}` },
      withCredentials: true
    })
    if (resp.data.success) {
      window.location.reload(false)
    }
  }

  useEffect(() => {
    axios.get('/user', {}, { withCredentials: true }).then(resp => {
      dispatch(setUser({ user: resp.data.user }))
    }).finally(() => {
      dispatch(attempted())
    })
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
        <Route path="/" element={<Collections />} />
        <Route path="/create" element={<Create />} />
        <Route path="/create/:uuid" element={<Create />} />
        {/* <Route path="/account" element={<Account />} /> */}
        <Route path="/collections" element={<Collections />} />
        <Route path="/collections/:uuid" element={<Links />} />
      </Routes>
      <ToastContainer
        autoClose={3000}
        hideProgressBar={true}
      />
    </div>
  )
}

export default App


