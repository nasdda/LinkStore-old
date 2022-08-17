import * as React from 'react'

import '../../../bootstrap/bootstrap.min.css'
import '../../../../node_modules/font-awesome/css/font-awesome.min.css'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'


export default function SearchBar({ value, onChange, handleSearch }) {

  return (
    <Row className="mb-4 d-flex justify-content-center">
      <Form.Control
        placeholder="Search"
        value={value}
        className="col-md-6"
        onChange={onChange}
      />
      <Button
        variant="primary"
        className='col-md-1'
        type="button"
        onClick={handleSearch}
      ><i className="fa fa-search" /></Button>
    </Row>
  )
}