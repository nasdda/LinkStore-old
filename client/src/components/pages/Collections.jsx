import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import LinksContainer from '../LinksContainer/LinksContainer'
import { useDispatch, useSelector } from 'react-redux'
import { selectAttemptedLogin, selectLinks, selectUser, setLinks, setTags } from '../../redux/slice/slice'
import Loader from '../common/Loader/Loader'
import CollectionCard from '../CollectionCard/CollectionCard'
import Container from '@mui/material/Container'
import CreateCollectionCard from '../CollectionCard/CreateCollectionCard'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import CollectionEditor from '../CollectionEditor/CollectionEditor'

function Collections(props) {
  const dispatch = useDispatch()
  const links = useSelector(selectLinks)
  const [loading, setLoading] = useState(true)
  const [errorText, setErrorText] = useState("")
  const [collections, setCollections] = useState([])
  const [create, setCreate] = useState(false)
  const user = useSelector(selectUser)
  const attemptedLogin = useSelector(selectAttemptedLogin)

  useEffect(() => {
    if (attemptedLogin) {
      if (user) {
        axios.get('/user/collections',
          {}, { withCredentials: true }).then(resp => {
            setCollections(resp.data.collections)
            setErrorText("")
          }).catch(err => {
            console.log('jererere')
            if (err.response.status === 401) {
              setErrorText("Please Sign In")
            }
          }).finally(() => {
            setLoading(false)
          })
      } else {
        setErrorText("Please Sign In")
        setLoading(false)
      }
    }
  }, [user, attemptedLogin])

  const handleCreateCollection = () => {
    setCreate(true)
  }

  const handleCloseCreateCollection = () => {
    setCreate(false)
  }

  const Body = () => {
    return (
      <>
        {
          errorText.length > 0 ? <div
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
          > {errorText} </div> :
            <div>
              <Container
                maxWidth="xl"
                sx={{
                  marginTop: "2rem",
                }}
              >
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  {
                    collections.map(collection => (
                      <div style={{ marginRight: '10px', marginBottom: '10px' }} key={collection.uuid}>
                        <CollectionCard
                          name={collection.name}
                          createdAt={collection.createdAt}
                          uuid={collection.uuid}
                        />
                      </div>
                    ))
                  }
                  <CreateCollectionCard onClick={handleCreateCollection} />
                </div>
                <Modal
                  open={create}
                  onClose={handleCloseCreateCollection}
                >
                  <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 'fit-content',
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                  }}>
                    <div>
                      <CollectionEditor onClose={handleCloseCreateCollection} />
                    </div>
                  </Box>
                </Modal>
              </Container>
            </div>
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


export default Collections