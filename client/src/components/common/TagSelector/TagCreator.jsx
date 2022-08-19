import * as React from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'

import Button from 'react-bootstrap/Button'
import Collapse from 'react-bootstrap/Collapse'
import Container from '@mui/material/Container'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ColorPicker from './ColorPicker'

import Tag from '../Tag/Tag'
import { useDispatch } from 'react-redux'
import { addTag } from '../../../redux/slice/slice'

import axios from 'axios'
import { toast } from 'react-toastify'

export default function TagCreateModal(props) {
  const [tagLabel, setTagLabel] = React.useState("")
  const [color, setColor] = React.useState("#000000")

  const dispatch = useDispatch()

  const handleAdd = async () => {
    if (props.labelExists(tagLabel)) {
      return window.alert(`Tag with label "${tagLabel}" already exists`)
    }
    if (tagLabel.trim().length > 0) {
      dispatch(addTag({
        tag: {
          label: tagLabel,
          backgroundColor: color
        }
      }))
      try {
        await axios.post(`/user/tag`, {
          tag: {
            label: tagLabel,
            backgroundColor: color
          }
        }, { withCredentials: true })
      } catch (err) {
        toast.error("Failed to create new tag", {
          position: toast.POSITION.BOTTOM_RIGHT,
        })
      }


      setTagLabel("")
    }
  }

  return (
    <Collapse in={props.open}>
      <Container maxWidth="sm">
        <div style={{
          margin: "1rem 0",
          display: "flex",
          flexDirection: "row"
        }}>
          <Form.Label>New Tag: </Form.Label>
          <Tag
            style={{ marginLeft: 10 }}
            label={tagLabel}
            backgroundColor={color}
          />
        </div>

        <Form.Group className="mb-3" >
          <Row>
            <Form.Group className="col-md-6">
              <Form.Label>Label</Form.Label>
              <Form.Control
                placeholder="Label"
                className="mb-3"
                value={tagLabel}
                onChange={event => {
                  setTagLabel(event.target.value)
                }}
              />
              <Button
                variant="primary"
                type="button"
                style={{ width: "4rem", marginRight: "10px" }}
                onClick={handleAdd}
              >
                Add
              </Button>
            </Form.Group>
            <Form.Group className="col-md-6">
              <Form.Label>Color</Form.Label>
              <ColorPicker
                onComplete={res => {
                  setColor(res.hex)
                }}
              />
            </Form.Group>
          </Row>
        </Form.Group>
      </Container>
    </Collapse>
  )
}