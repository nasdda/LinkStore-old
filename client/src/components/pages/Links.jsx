import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import LinksContainer from '../LinksContainer/LinksContainer';

function Links(props) {
  const params = useParams()
  const [links, setLinks] = useState([])
  useEffect(() => {
    // fetch links to be displayed
    axios.get(`/user/links/${params.uuid}`, {}, { withCredentials: true }).then(resp => {
      setLinks(resp.data.links)
    }).catch(err => {
      console.log(err)
    })
  }, [])
  return (
    <>
      <LinksContainer links={links} />
    </>
  )
}


export default Links