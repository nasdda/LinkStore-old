import React from 'react'
import Icon from '@mui/material/Icon'


function LinkIcon(props) {
  return (
    <Icon {...props} styles={{
      textAlign: 'center',
      flexDirection: 'column',
    }}>
      <img style={{ height: '100%' }} src="/link.png" alt="icon" />
    </Icon>
  )
}

export default LinkIcon