import * as React from 'react'
import Card from '@mui/material/Card'
import { CardActionArea } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

function CreateCollectionCard({ onClick }) {
  return (
    <Card sx={{
      width: 200,
      height: 150
    }}>
      <CardActionArea sx={{
        display: 'flex',
        justifyContent: 'center',
        height: '100%'
      }}
        onClick={onClick}
      >
        <div style={{
          height: 'inherit',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <AddIcon fontSize='large' style={{ color: 'grey' }} />
        </div>
      </CardActionArea>
    </Card >
  )
}


export default CreateCollectionCard