import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { selectAttemptedLogin, selectUser, setCollectionUUID } from '../../redux/slice/slice'
import Loader from '../common/Loader/Loader'
import CollectionCard from '../CollectionCard/CollectionCard'
import Container from '@mui/material/Container'
import CreateCollectionCard from '../CollectionCard/CreateCollectionCard'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import CollectionEditor from '../CollectionEditor/CollectionEditor'

function Collections(props) {
  const [loading, setLoading] = useState(true)
  const [errorText, setErrorText] = useState("")
  const [collections, setCollections] = useState([])
  const [create, setCreate] = useState(false)
  const [editCollection, setEditCollection] = useState(undefined)
  const user = useSelector(selectUser)
  const attemptedLogin = useSelector(selectAttemptedLogin)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setCollectionUUID({ connectionUUID: null }))
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

  const deleteCollection = (uuid) => {
    let i = 0
    for (; i < collections.length; i++) {
      if (collections[i].uuid === uuid) {
        break
      }
    }

    if (i < collections.length) {
      const newCollections = [...collections]
      newCollections.splice(i, 1)
      setCollections(newCollections)
    }
  }

  const addCollection = (collection) => {
    setCollections([...collections, collection])
  }

  const handleCreateCollection = () => {
    setEditCollection(undefined)
    setCreate(true)
  }

  const handleCloseCreateCollection = () => {
    setCreate(false)
  }

  const handleEditCollection = (c) => {
    setEditCollection(c)
    setCreate(true)
  }

  const updateCollection = (c) => {
    const newCollections = [...collections]
    for (let i = 0; i < newCollections.length; i++) {
      if (newCollections[i].uuid === c.uuid) {
        newCollections[i] = {
          ...c
        }
      }
      setCollections(newCollections)
    }
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
                          handleEdit={() => {
                            handleEditCollection(collection)
                          }}
                          deleteCollection={deleteCollection}
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
                    <CollectionEditor
                      collection={editCollection}
                      onClose={handleCloseCreateCollection}
                      addCollection={addCollection}
                      updateCollection={updateCollection}
                    />
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