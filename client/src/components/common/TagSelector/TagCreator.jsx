import * as React from 'react';

import '../../../bootstrap/bootstrap.min.css'

import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Container from '@mui/material/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ColorPicker from './ColorPicker';

import Tag from '../Tag/Tag'
import { useDispatch } from 'react-redux';
import { addTag } from '../../../redux/slice/slice';


export default function TagCreateModal(props) {
  const [tagLabel, setTagLabel] = React.useState("")
  const [color, setColor] = React.useState("#000000")

  const dispatch = useDispatch()

  

  const handleAdd = () => {
    if (props.labelExists(tagLabel)) {
      return window.alert(`Tag with label "${tagLabel}" already exists`)
    } 
    if (tagLabel !== "") {

      dispatch(addTag({
        tag: {
          label: tagLabel,
          backgroundColor: color
        }
      }))

      setTagLabel("")
      setColor("#000000")
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
            clickable={false}
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
                style={{ width: "5rem", marginRight: "10px" }}
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
  );
}