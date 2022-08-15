import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Tag from '../common/Tag/Tag';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton sx={{
    '&:focus': {
      border: "none",
      outline: "none",
    },
  }} {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function LinkCard({ title, url, tags, description }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };



  return (
    <Card sx={{
      maxWidth: 350,
      wordBreak: 'break-word',

    }}>
      <CardHeader
        title={title}
        subheader={url}
      />
      <CardContent>
        {tags.map(tag => (
          <Tag
            label={tag.label}
            backgroundColor={tag.backgroundColor}
            style={{marginRight: "5px"}}
          />
        ))}
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" sx={{
          '&:focus': {
            border: "none",
            outline: "none",
          },
        }}>
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
        <CardContent>
          <Typography paragraph>
            {description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default React.memo(LinkCard)