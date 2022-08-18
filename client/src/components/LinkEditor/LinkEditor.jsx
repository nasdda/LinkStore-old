import * as React from 'react'

import '../../bootstrap/bootstrap.min.css'

import axios from 'axios'

import Container from '@mui/material/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { TagSelector } from '../common/TagSelector/TagSelector'
import { useSelector } from 'react-redux'
import { selectTags } from '../../redux/slice/slice'
import { toast } from 'react-toastify'


const postNewLink = async (linkTitle, linkURL, linkTags, linkDescription) => {
  await axios.post(`/user/link`, {
    link: {
      title: linkTitle,
      url: linkURL,
      tags: linkTags,
      description: linkDescription
    }
  }, { withCredentials: true })
}

function LinkEditor(props) {

  const [title, setTitle] = React.useState("")
  const [url, setURL] = React.useState("")
  const [selectedTags, setSelectedTags] = React.useState([])
  const [description, setDescription] = React.useState("")
  const [openTagCreator, setOpenTagCreator] = React.useState(false)

  const tags = useSelector(selectTags)

  const selectTag = (tagLabel) => {
    setSelectedTags([...selectedTags, tagLabel])
  }

  const unselectTag = (tagLabel) => {
    selectedTags.splice(selectedTags.indexOf(tagLabel), 1)
    setSelectedTags([...selectedTags])
  }



  const onFormSubmit = e => {
    e.preventDefault()
    const finalTags = []
    tags.forEach(tag => {
      if (selectedTags.includes(tag.label)) {
        finalTags.push(tag)
      }
    })
    postNewLink(title, url, finalTags, description).then(() => {
      setTitle("")
      setURL("")
      setSelectedTags([])
      setDescription("")
      setOpenTagCreator(false)
      toast.success("New link created", {
        position: toast.POSITION.BOTTOM_RIGHT,
      })
    })
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
          <TagSelector
            selectTag={selectTag}
            selectedTags={selectedTags}
            unselectTag={unselectTag}
            openTagCreator={openTagCreator}
            setOpenTagCreator={setOpenTagCreator}
            insertable
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Add description..."
            value={description}
            onChange={e => { setDescription(e.target.value) }}
          />
        </Form.Group>


        <Button variant="primary" type="submit">
          Create
        </Button>
      </Form>
    </Container>
  )
}


export default LinkEditor