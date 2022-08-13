import React from 'react'

import '../../bootstrap/bootstrap.min.css'

import axios from 'axios'

import Container from '@mui/material/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { TagSelector } from '../common/TagSelector/TagSelector';



function LinkEditor(props) {

  const handleCreate = async () => {
    await axios.post(`/user/link`, {
      link: {
        url: 'https://stackoverflow.com/questions/33049707/push-items-into-mongo-array-via-mongoose',
        title: "stack overflow"
      }
    }, { withCredentials: true })
  }

  return (
    <Container maxWidth="sm">
      <Form>
        <Form.Group className="mb-3" controlId="formGridEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control placeholder="Name" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>URL</Form.Label>
          <Form.Control placeholder="https://example.com" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formTags">
          <Form.Label>Tags</Form.Label>
          <TagSelector />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
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