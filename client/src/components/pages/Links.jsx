import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import LinksContainer from '../LinksContainer/LinksContainer'
import { useDispatch, useSelector } from 'react-redux'
import { selectLinks, selectUser, setLinks, setTags } from '../../redux/slice/slice'
import Loader from '../common/Loader/Loader'


function Links(props) {
  const params = useParams()
  const dispatch = useDispatch()
  const links = useSelector(selectLinks)
  const [loading, setLoading] = useState(true)
  const [emptyText, setEmptyText] = useState("Empty")
  const [collectionName, setCollectionName] = useState("")
  const user = useSelector(selectUser)

  useEffect(() => {
    console.log(params.uuid)
    // fetch links to be displayed
    axios.get(params.uuid ? `/user/collections/${params.uuid}` : '/user/links',
      {}, { withCredentials: true }).then(resp => {
        setCollectionName(resp.data.name)
        dispatch(setLinks({ links: resp.data.links }))
        dispatch(setTags({ tags: resp.data.tags }))
        setLoading(false)
        console.log("LINKS: ", resp.data.links)
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
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            fontSize: '2.5rem',
            fontWeight: 'bold'
          }}
        >{collectionName}</div>
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
            <LinksContainer links={links} />
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