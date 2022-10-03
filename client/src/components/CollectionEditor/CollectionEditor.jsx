import * as React from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'

import axios from 'axios'

import Container from '@mui/material/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { toast } from 'react-toastify'


function CollectionEditor({ collection, onClose, addCollection, updateCollection }) {
  const [name, setName] = React.useState("")
  const [visibility, setVisibility] = React.useState('private')
  React.useEffect(() => {
    if (collection) {
      setName(collection.name)
      setVisibility(collection.public ? 'public' : 'private')
    }
  }, [collection])

  const onFormSubmit = e => {
    e.preventDefault()
    axios.post('/user/collections', {
      name: name,
      public: visibility === 'public'
    }, { withCredentials: true }).then((resp) => {
      toast.success("Collection created", {
        position: toast.POSITION.BOTTOM_RIGHT,
      })
      addCollection(resp.data.collection)
    }).catch(err => {
      toast.error("Failed to create collection", {
        position: toast.POSITION.BOTTOM_RIGHT,
      })
    }).finally(() => {
      onClose()
    })
  }

  const onUpdateSubmit = e => {
    e.preventDefault()
    axios.patch(`/user/collection`, {
      uuid: collection.uuid,
      name: name,
      public: visibility === 'public'
    }, { withCredentials: true }).then(resp => {
      updateCollection({
        uuid: collection.uuid,
        name: name,
        public: visibility === 'public',
        createdAt: collection.createdAt
      })
      toast.success("Collection updated", {
        position: toast.POSITION.BOTTOM_RIGHT,
      })
    }).catch(err => {
      toast.error("Failed to update collection", {
        position: toast.POSITION.BOTTOM_RIGHT,
      })
    }).finally(() => {
      onClose()
    })
  }

  return (
    <Container maxWidth="sm">
      <Form onSubmit={collection ? onUpdateSubmit : onFormSubmit}>
        <Form.Group className="mb-3" >
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={name}
            onChange={e => { setName(e.target.value) }}
            placeholder="Name"
            required />
        </Form.Group>

        <Form.Group className="mb-3" style={{ width: '100px' }}>
          <Form.Label>Visibility</Form.Label>
          <Form.Select
            value={visibility}
            onChange={event => {
              setVisibility(event.target.value)
            }}
          >
            <option value="private">Private</option>
            <option value="public">Public</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          {collection ? "Update" : "Create"}
        </Button>
        <Button
          variant="primary"
          type="button"
          style={{ marginLeft: "5px" }}
          onClick={onClose}
        >
          Cancel
        </Button>
      </Form>
    </Container >
  )
}


export default CollectionEditor