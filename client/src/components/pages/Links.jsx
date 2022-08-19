import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import LinksContainer from '../LinksContainer/LinksContainer'
import { useDispatch, useSelector } from 'react-redux'
import { selectLinks, selectUser, setLinks, setTags } from '../../redux/slice/slice'
import { Typography } from '@mui/material'
import Loader from '../common/Loader/Loader'


function Links(props) {
  const params = useParams()
  const dispatch = useDispatch()
  const links = useSelector(selectLinks)
  const [loading, setLoading] = useState(true)
  const [emptyText, setEmptyText] = useState("Empty")
  const user = useSelector(selectUser)
  useEffect(() => {
    // fetch links to be displayed
    axios.get(params.uuid ? `/user/links/${params.uuid}` : '/user/links',
      {}, { withCredentials: true }).then(resp => {
        dispatch(setLinks({ links: resp.data.links }))
        console.log("LINKS: ", resp.data.links)
        dispatch(setTags({ tags: resp.data.tags }))
        setLoading(false)
      }).catch(err => {
        setEmptyText("Please Sign In")
        setLoading(false)
      })
  }, [user])

  const Body = () => {
    return (
      links.length === 0 ?
        <div
          style={{
            fontFamily: `"Roboto","Helvetica","Arial",sans-serif`,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: '2rem',
            fontWeight: 'bold',
            fontSize: '2rem',
            color: 'rgb(196, 196, 196)',
            userSelect: 'none'
          }}
        >
          {emptyText}</div> :
        <LinksContainer links={links} />
    )
  }

  return (
    <>
      {
        loading ? <Loader /> : <Body />
      }
    </>
  )
}


export default Links