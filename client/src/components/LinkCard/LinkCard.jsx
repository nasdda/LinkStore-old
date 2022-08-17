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
import Tag from '../common/Tag/Tag'
import { Divider } from '@mui/material'
import { toast } from 'react-toastify'

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

function LinkCard({ title, url, tags, description }) {
  const [expanded, setExpanded] = React.useState(false)

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
      <a href={url} rel="noreferrer" target="_blank">
        <CardHeader
          title={title}
          sx={{
            paddingBottom: 0
          }}
          titleTypographyProps={{ variant: 'h6' }}
        />
      </a>

      <CardContent>
        {tags.map(tag => (
          <Tag
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