import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import LinksContainer from '../LinksContainer/LinksContainer'
import { useDispatch, useSelector } from 'react-redux'
import { selectLinks, selectUser, setCollectionUUID, setLinks, setTags } from '../../redux/slice/slice'
import Loader from '../common/Loader/Loader'
import Container from '@mui/material/Container'
import { Typography } from '@mui/material'


function Links(props) {
  const params = useParams()
  const dispatch = useDispatch()
  const links = useSelector(selectLinks)
  const [loading, setLoading] = useState(true)
  const [emptyText, setEmptyText] = useState("Empty")
  const [collectionName, setCollectionName] = useState("")
  const [editable, setEditable] = useState(false)
  const user = useSelector(selectUser)

  useEffect(() => {
    dispatch(setCollectionUUID({ collectionUUID: params.uuid }))
    // fetch links to be displayed
    axios.get(params.uuid ? `/user/collections/${params.uuid}` : '/user/links',
      {}, { withCredentials: true }).then(resp => {
        setCollectionName(resp.data.name)
        dispatch(setLinks({ links: resp.data.links }))
        dispatch(setTags({ tags: resp.data.tags }))
        setEditable(resp.data.userID === user.uuid)
        setLoading(false)
      }).catch(err => {
        if (err.response.status === 403) {
          setEmptyText("Private Collection")
        } else if (err.response.status === 401) {
          setEmptyText("Please Sign In")
        } else {
          setEmptyText("Collection Does Not Exist")
        }
        setLoading(false)
      })
  }, [user, params.uuid])
  const Body = () => {
    return (
      <>
        <Container maxWidth='sm' >
          <Typography sx={{
            width: 'inherit',
            display: 'flex',
            justifyContent: 'center',
            fontSize: '2rem',
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: '10px'
          }}>{collectionName}</Typography>
        </Container>
        {
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
            <LinksContainer
              links={links}
              editable={editable}
            />
        }
      </>
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