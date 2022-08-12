import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import LinksContainer from '../components/LinksContainer/LinksContainer';

function Links(props) {
  const params = useParams()
  const [links, setLinks] = useState([])
  console.log(params)
  useEffect(() => {
    // fetch links to be displayed
    axios.get(`/user/links/${params.uuid}`, {}, { withCredentials: true }).then(resp => {
      setLinks(resp.data.links)
    })
  }, [])
  return (


    <>
      <LinksContainer links={links} />
      {/* <button onClick={async () => {
        await axios.post(`/user/link`, {
          link: {
            url: 'https://stackoverflow.com/questions/33049707/push-items-into-mongo-array-via-mongoose',
            title: "stack overflow"
          }
        }, { withCredentials: true })
      }}>
        Post button
      </button> */}
    </>
  )
}


export default Links