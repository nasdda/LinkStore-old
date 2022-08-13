import * as React from 'react';

import '../../../bootstrap/bootstrap.min.css'

import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Container from '@mui/material/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { ChromePicker } from 'react-color';

export default function TagCreateModal(props) {
  const [tagLabel, setTagLabel] = React.useState("")

  return (
    <Collapse in={props.open}>
      <Container maxWidth="sm">
        <Form.Group className="mb-3" >
          <Row>
            <Form.Group className="col-md-6">
              <Form.Label>Label</Form.Label>
              <Form.Control placeholder="Label" className="mb-3" />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}>
                <Button
                  variant="primary"
                  type="button"
                  style={{ width: "5rem"}}
                >
                  Add
                </Button>
                <Button
                  variant="primary"
                  type="button"
                  style={{ width: "5rem" }}>
                  Cancel
                </Button>
              </div>
            </Form.Group>
            <Form.Group className="col-md-6">
              <Form.Label>Color</Form.Label>
              <ChromePicker />
            </Form.Group>
          </Row>
        </Form.Group>

      </Container>
    </Collapse>
  );
}