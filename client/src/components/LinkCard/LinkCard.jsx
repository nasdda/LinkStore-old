import * as React from 'react'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Tag from '../common/Tag/Tag'
import { Divider } from '@mui/material'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { deleteLink } from '../../redux/slice/slice'

const ExpandMore = styled((props) => {
  const { expand, ...other } = props
  return <IconButton sx={{
    '&:focus': {
      border: "none",
      outline: "none",
    },
  }} {...other} />
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
  const dispatch = useDispatch()
  const handleExpandClick = () => {
    setExpanded(!expanded)
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
          <IconButton aria-label="add to favorites" sx={{
            '&:focus': {
              border: "none",
              outline: "none",
            },
          }}
            onClick={() => {
              DeleteLink(id, dispatch)
            }}
          >
            <DeleteOutlineIcon />
          </IconButton>
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
        <IconButton aria-label="add to favorites" sx={{
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
    </Card>
  )
}

export default React.memo(LinkCard)