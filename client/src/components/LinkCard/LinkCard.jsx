import * as React from 'react'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Tag from '../common/Tag/Tag'
import { Divider, Tooltip } from '@mui/material'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { deleteLink } from '../../redux/slice/slice'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'


const actions = ["Edit", "Delete"]


const ExpandMore = styled((props) => {
  const { expand, ...other } = props
  return <Tooltip title={expand ? "hide description" : "show description"}>
    <IconButton sx={{
      '&:focus': {
        border: "none",
        outline: "none",
      },
    }} {...other} />
  </Tooltip>
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))

const DeleteLink = async (id, dispatch) => {
  await axios.delete(`/user/link`, {
    data: {
      deleteUid: id
    }
  }, { withCredentials: true }).then(resp => {
    if (resp.data.success) {
      dispatch(deleteLink({ id: id }))
      toast.success("Link deleted", {
        position: toast.POSITION.BOTTOM_RIGHT,
      })
    } else {
      toast.error("Failed to delete link", {
        position: toast.POSITION.BOTTOM_RIGHT,
      })
    }
  })
}

function LinkCard({ title, url, tags, description, id }) {
  const [expanded, setExpanded] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl);
  const dispatch = useDispatch()

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null);
  }

  const actionHandlers = {
    "Edit": async () => {
      setAnchorEl(null)
    },
    "Delete": () => {
      DeleteLink(id, dispatch)
      setAnchorEl(null)
    }
  }

  const notifyCopied = () => toast.success("Copied to clipboard", {
    position: toast.POSITION.BOTTOM_RIGHT,
  })

  return (
    <Card sx={{
      maxWidth: 350,
      wordBreak: 'break-word',
    }}>

      <CardHeader
        title={
          <a href={url} rel="noreferrer" target="_blank">
            {title}
          </a>
        }
        action={
          <div>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? 'long-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleClick}
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
        sx={{
          paddingBottom: 0
        }}
        titleTypographyProps={{ variant: 'h6' }}
      />

      <CardContent>
        {tags.map(tag => (
          <Tag
            key={tag._id}
            label={tag.label}
            backgroundColor={tag.backgroundColor}
            style={{ marginRight: "5px" }}
          />
        ))}
      </CardContent>

      <CardActions disableSpacing>
        <Tooltip title="copy url">
          <IconButton sx={{
            '&:focus': {
              border: "none",
              outline: "none",
            },
          }}
            onClick={() => {
              navigator.clipboard.writeText(url).then(() => {
                notifyCopied()
              })
            }}
          >
            <ContentCopyIcon />
          </IconButton>
        </Tooltip>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>

      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Divider />
        <CardContent>
          {
            (description && description.trim().length !== 0) ?
              <Typography paragraph>
                {description}
              </Typography> :
              <div
                style={{
                  fontFamily: `"Roboto","Helvetica","Arial",sans-serif`,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  color: 'rgb(196, 196, 196)',
                  userSelect: 'none'
                }}
              >No Description</div>
          }
        </CardContent>
      </Collapse>
    </Card >
  )
}

export default React.memo(LinkCard)