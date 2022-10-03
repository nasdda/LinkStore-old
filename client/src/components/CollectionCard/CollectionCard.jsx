import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { CardActionArea, Typography } from '@mui/material'
import CardHeader from '@mui/material/CardHeader'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import IconButton from '@mui/material/IconButton'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import axios from 'axios'
import { toast } from 'react-toastify'

const actions = ["Edit", "Delete"]

function CollectionCard({ name, createdAt, uuid, deleteCollection, handleEdit }) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const date = new Date(createdAt)
  const displayDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`

  const handleClick = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const actionHandlers = {
    "Edit": async () => {
      setAnchorEl(null)
      handleEdit()
    },
    "Delete": () => {
      axios.delete(`/user/collection`, {
        data: {
          uuid: uuid
        }
      }, { withCredentials: true }).then(resp => {
        if (resp.data.success) {
          toast.success("Collection deleted", {
            position: toast.POSITION.BOTTOM_RIGHT,
          })
          deleteCollection(uuid)
        } else {
          toast.error("Failed to delete collection", {
            position: toast.POSITION.BOTTOM_RIGHT,
          })
        }
      })
      setAnchorEl(null)
    }
  }

  return (
    <Card sx={{
      width: 250,
      height: 200
    }}>
      <CardActionArea
        component='a'
        href={'collections/' + uuid}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          alignItems: 'flex-start',
        }}
      >
        <CardHeader
          sx={{
            width: '100%',
          }}
          action={
            <div>
              <IconButton
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                onMouseDown={event => event.stopPropagation()}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="long-menu"
                MenuListProps={{
                  'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    width: 'fit-content',
                  },
                }}
              >
                {actions.map((option) => (
                  <MenuItem
                    key={option}
                    selected={option === 'Pyxis'}
                    onClick={actionHandlers[option]}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </div>
          }
          title={
            <Typography sx={{
              hyphens: 'auto',
              width: 180,
              fontSize: '1.2rem',
              textOverflow: 'ellipsis',
              overflow: 'hidden'
            }}>
              {name}
            </Typography>
          }
        />

        <CardContent>
          <div style={{
            display: 'flex',
            alignItems: 'center',
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