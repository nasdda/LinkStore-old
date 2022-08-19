import * as React from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'


export default function SearchBar({ handleSearch }) {
  const [value, setValue] = React.useState("")

  return (
    <Form
      onSubmit={e => {
        e.preventDefault()
        handleSearch(value)
      }}
      className="mb-4 d-flex justify-content-center">
      <Row className="col-md-7">
        <div className="input-group mb-3">
          <Form.Control
            placeholder="Search"
            value={value}
            onChange={event => setValue(event.target.value)}
          />
          <Button
            variant="primary"
            className='input-group-prepend'
            type="submit"
            style={{width: "5rem"}}
          ><i className="fa fa-search" /></Button>
        </div>
      </Row>


    </Form>
  )
}