import * as React from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'

import axios from 'axios'

import Container from '@mui/material/Container'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { selectLinks, selectTags, setLinks } from '../../redux/slice/slice'
import { TagSelector } from '../common/TagSelector/TagSelector'

const postNewLink = async (
  collection, linkTitle, linkURL, linkTags,
  linkDescription
) => {
  linkTags.sort((taga, tagb) => {
    if (taga.label.toLowerCase() > tagb.label.toLowerCase()) {
      return 1
    }
    return -1
  })
  await axios.post(`/user/link`, {
    uuid: collection.uuid,
    link: {
      title: linkTitle,
      url: linkURL,
      tags: linkTags,
      description: linkDescription
    }
  }, { withCredentials: true })
}

const updateLink = async (
  collectionID, linkID, linkTitle,
  linkURL, linkTags, linkDescription
) => {
  linkTags.sort((taga, tagb) => {
    if (taga.label.toLowerCase() > tagb.label.toLowerCase()) {
      return 1
    }
    return -1
  })
  await axios.patch(`/user/link`, {
    uuid: collectionID,
    linkID: linkID,
    link: {
      title: linkTitle,
      url: linkURL,
      tags: linkTags,
      description: linkDescription
    }
  }, { withCredentials: true })
}

function LinkEditor({ link, setEdit, collection }) {

  const [title, setTitle] = React.useState("")
  const [url, setURL] = React.useState("")
  const [selectedTags, setSelectedTags] = React.useState([])
  const [description, setDescription] = React.useState("")
  const [openTagCreator, setOpenTagCreator] = React.useState(false)
  const tags = useSelector(selectTags)
  const allLinks = useSelector(selectLinks)
  const dispatch = useDispatch()
  const params = useParams()

  React.useEffect(() => {
    // Edit mode if link is supplied
    if (link) {
      const editSelectedTags = []
      for (const tag of link.tags) {
        editSelectedTags.push(tag.label)
      }
      setTitle(link.title)
      setURL(link.url)
      setSelectedTags(editSelectedTags)
      setDescription(link.description)
    }
  }, [link])

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
    postNewLink(collection, title, url, finalTags, description).then(() => {
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

  const onUpdateSubmit = e => {
    e.preventDefault()
    const finalTags = []
    tags.forEach(tag => {
      if (selectedTags.includes(tag.label)) {
        finalTags.push(tag)
      }
    })
    updateLink(params.uuid, link._id, title, url, finalTags, description).then(() => {
      const updatedLinks = []
      for (const oldLink of allLinks) {
        if (oldLink._id === link._id) {
          updatedLinks.push({
            ...link,
            title: title,
            url: url,
            tags: finalTags,
            description: description
          })
        } else {
          updatedLinks.push({
            ...oldLink
          })
        }
      }
      dispatch(setLinks({ links: updatedLinks }))
      setEdit(false)
      toast.success("Link has been updated", {
        position: toast.POSITION.BOTTOM_RIGHT,
      })
    })
  }

  return (
    <Container maxWidth="sm">
      <Form onSubmit={link ? onUpdateSubmit : onFormSubmit}>
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
            collectionID={collection ? collection.uuid : 0}
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
            data-gramm="false"
          />
        </Form.Group>

        <div style={{ display: 'flex' }}>
          <Button variant="primary" type="submit">
            {link ? 'Update' : 'Create'}
          </Button>
          {
            link &&
            <Button
              variant="primary"
              type="button"
              style={{ marginLeft: "5px" }}
              onClick={() => setEdit(false)}
            >
              Cancel
            </Button>
          }
        </div>


      </Form>
    </Container >
  )
}


export default LinkEditor