import * as React from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'

import { Container } from '@mui/material'


export default function SearchBar({ handleSearch }) {
  const [value, setValue] = React.useState("")

  return (
    <Container maxWidth="sm">
      <Form
        onSubmit={e => {
          e.preventDefault()
          handleSearch(value)
        }}
        className="d-flex justify-content-center"
      >
        <Row className='gx-0' style={{width: '100%'}}>
          <div className="input-group mb-3">
            <Form.Control
              placeholder="Search"
              value={value}
              onChange={event => setValue(event.target.value)}
              style={{ maxWidth: '500px' }}
            />
            <Button
              variant="primary"
              className='input-group-prepend'
              type="submit"
              style={{ width: "5rem" }}
            ><i className="fa fa-search" /></Button>
          </div>
        </Row>
      </Form>
    </Container>

  )
}