import * as React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/slice/slice'
import LinkEditor from '../LinkEditor/LinkEditor'

import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setTags } from '../../redux/slice/slice'
import Loader from '../common/Loader/Loader'

export default function Create(props) {
  const user = useSelector(selectUser)
  const [loading, setLoading] = React.useState(true)
  const dispatch = useDispatch()
  React.useState(() => {
    axios.get('/user/links',
      {}, { withCredentials: true }).then(resp => {
        dispatch(setTags({ tags: resp.data.tags }))
        setLoading(false)
      }).catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div style={{ marginTop: "2rem" }}>
      {
        loading ? <Loader /> :
          user ? <LinkEditor /> :
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