import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/slice/slice'
import LinkEditor from '../LinkEditor/LinkEditor'


export default function Create(props) {
  const user = useSelector(selectUser)

  return (
    <div style={{ marginTop: "2rem" }}>
      {user ? <LinkEditor /> :
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