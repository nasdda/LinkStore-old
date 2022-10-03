import * as React from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'

import axios from 'axios'

import Container from '@mui/material/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useDispatch, useSelector } from 'react-redux'
import { selectLinks, selectTags, setLinks } from '../../redux/slice/slice'
import { toast } from 'react-toastify'


function CollectionEditor({ link, onClose }) {
  const [name, setName] = React.useState("")
  const [visibility, setVisibility] = React.useState('private')
  React.useEffect(() => {
    if (link) {
      const editSelectedTags = []
      for (const tag of link.tags) {
        editSelectedTags.push(tag.label)
      }
      setName(link.title)
    }
  }, [link])

  const onFormSubmit = e => {
    e.preventDefault()
    axios.post('/user/collections', {
      name: name,
      public: visibility === 'public'
    }, { withCredentials: true }).then((resp) => {
      toast.success("Collection created", {
        position: toast.POSITION.BOTTOM_RIGHT,
      })
    }).catch(err => {
      toast.error("Failed to create collection", {
        position: toast.POSITION.BOTTOM_RIGHT,
      })
    })
  }

  const onUpdateSubmit = e => {
    e.preventDefault()
  }

  return (
    <Container maxWidth="sm">
      <Form onSubmit={link ? onUpdateSubmit : onFormSubmit}>
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
          Create
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