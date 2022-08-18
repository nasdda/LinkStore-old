import * as React from 'react'

import '../../../bootstrap/bootstrap.min.css'
import '../../../../node_modules/font-awesome/css/font-awesome.min.css'

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
      <Form.Control
        placeholder="Search"
        value={value}
        className="col-md-6"
        onChange={event => setValue(event.target.value)}
      />
      <Button
        variant="primary"
        className='col-md-1'
        type="submit"
      ><i className="fa fa-search" /></Button>
    </Form>
  )
}