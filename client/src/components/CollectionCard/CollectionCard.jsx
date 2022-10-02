import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { CardActionArea } from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import CardHeader from '@mui/material/CardHeader'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import IconButton from '@mui/material/IconButton'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';


function CollectionCard({ name, createdAt, uuid }) {
  const date = new Date(createdAt)
  const displayDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
  return (
    <Card sx={{
      width: 200
    }}>
      <CardActionArea
        component='a'
        href={'collections/' + uuid}
      >
        <CardHeader
          action={
            <IconButton
              onMouseDown={event => event.stopPropagation()}
              onClick={event => {
                event.stopPropagation();
                event.preventDefault();
                console.log("Button clicked");
              }}
            >
              <MoreVertIcon />
            </IconButton>
          }
          title={name}
        />

        <CardContent>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: '30px'
          }}>
            <CalendarMonthIcon />
            <div style={{
              marginLeft: '5px'
            }}>
              {displayDate}
            </div>
          </div>
        </CardContent>
      </CardActionArea>
    </Card >
  )
}


export default CollectionCard