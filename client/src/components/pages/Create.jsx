import * as React from 'react'
import { useSelector } from 'react-redux'
import { selectAttemptedLogin, selectUser } from '../../redux/slice/slice'
import LinkEditor from '../LinkEditor/LinkEditor'

import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setTags } from '../../redux/slice/slice'
import Loader from '../common/Loader/Loader'
import Select from 'react-select'
import Container from '@mui/material/Container'
import Form from 'react-bootstrap/Form'

export default function Create(props) {
  const user = useSelector(selectUser)
  const [loading, setLoading] = React.useState(true)
  const dispatch = useDispatch()
  const [collections, setCollections] = React.useState([])
  const [collection, setCollection] = React.useState("")
  const [disabled, setDisabled] = React.useState(false)

  React.useState(() => {
    axios.get('/user/collections',
      {}, { withCredentials: true }).then(resp => {
        setCollections(resp.data.collections)
        console.log(resp)
        // dispatch(setTags({ tags: resp.data.tags }))
      }).catch(err => {
        console.log(err)
      }).finally(() => {
        setLoading(false)
      })
  }, [user])

  const options = collections.map(collection => ({
    value: collection.name,
    label: collection.name
  }))

  console.log(collection)

  const Body = () => {
    return (
      <div>
        <Container maxWidth="sm">
          <Form.Group className="mb-3">
            <Form.Label>Collection</Form.Label>
            <Select
              value={options.filter(function (option) {
                return option.value === collection.value
              })}
              options={options}
              onChange={selected => {
                // setDisabled(true)
                setCollection(selected)
              }}
              isDisabled={disabled}
            />
          </Form.Group>
        </Container>
        <LinkEditor />
      </div>
    )
  }

  return (
    <div style={{ marginTop: "2rem" }}>
      {
        loading ? <Loader /> :
          user ? <Body /> :
            <div
              style={{
                fontFamily: `"Roboto","Helvetica","Arial",sans-serif`,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: '2rem',
                fontWeight: 'bold',
                fontSize: '2rem',
                color: 'rgb(196, 196, 196)',
                userSelect: 'none'
              }}
            >
              Please Sign In</div>
      }

    </div>
  )
}