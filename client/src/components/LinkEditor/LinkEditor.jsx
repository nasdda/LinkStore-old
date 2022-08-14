import * as React from 'react'

import '../../bootstrap/bootstrap.min.css'

import axios from 'axios'

import Container from '@mui/material/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { TagSelector } from '../common/TagSelector/TagSelector';



function LinkEditor(props) {

  const [title, setTitle] = React.useState("")
  const [url, setURL] = React.useState("")

  const postNewLink = async (linkTitle, linkURL, linkTags) => {
    await axios.post(`/user/link`, {
      link: {
        url: linkTitle,
        title: linkURL,
        tags: linkTags
      }
    }, { withCredentials: true })
  }

  const onFormSubmit = e => {
    e.preventDefault()
  }

  return (
    <Container maxWidth="sm">
      <Form onSubmit={onFormSubmit}>
        <Form.Group className="mb-3" >
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={title}
            onChange={e => { setTitle(e.target.value) }}
            placeholder="Title"
            required />
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>URL</Form.Label>
          <Form.Control
            value={url}
            onChange={e => { setURL(e.target.value) }}
            placeholder="https://example.com"
            required />
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>Tags</Form.Label>
          <TagSelector />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Add description..." />
        </Form.Group>


        <Button variant="primary" type="submit">
          Create
        </Button>
      </Form>
    </Container>
  )
}


export default LinkEditor