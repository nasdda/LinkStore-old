import * as React from 'react'

import axios from 'axios'
import Loader from '../common/Loader/Loader'

import { Container, IconButton, Tooltip } from '@mui/material'
import {
  Card, CardContent, Avatar,
  Typography, CardActions,
  CardHeader, Chip
} from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { toast } from 'react-toastify'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

import Select from 'react-select'
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/slice/slice'


const CenteredDiv = ({ children }) => (
  <div style={{
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '1rem',
  }}>
    {children}
  </div>
)

const SpacedRow = ({ children }) => (
  <div style={{
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '1rem'
  }}>
    {children}
  </div>
)

const AccountCard = ({ user }) => {
  const [loading, setLoading] = React.useState(true)
  const [disabled, setDisabled] = React.useState(false)
  const [value, setValue] = React.useState(undefined)
  React.useEffect(() => {
    axios.get('/user/link/visibility', {}, { withCredentials: true }).then(resp => {
      setValue(resp.data.public ? "public" : "private")
      setLoading(false)
    })
  }, [])
  const options = [
    { value: 'private', label: 'private' },
    { value: 'public', label: 'public' },
  ]

  const Contents = () => (
    <Card sx={{ minWidth: 275, height: 350 }}>
      <CenteredDiv>
        <Avatar
          alt="profile picture"
          src={user.picture}
          sx={{ width: 60, height: 60 }}
        />
      </CenteredDiv>
      <CenteredDiv>
        <Typography variant='h4' style={{ color: "grey" }}>{user.name}</Typography>
      </CenteredDiv>
      <CardContent>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            marginBottom: '2rem'
          }}
        >
          <Chip
            variant="outlined"
            label="Collection Link"
            size="small"
            icon={<ContentCopyIcon />}
            onClick={() => {
              navigator.clipboard.writeText(
                `${window.location.origin}/links/${user.uuid}`
              ).then(
                () => {
                  toast.success("Copied to clipboard", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                  })
                })
            }}
          />
        </div>
        <SpacedRow>
          <div style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <Typography>Links Visibility</Typography>
            <Tooltip title="If set to public, your links collection is viewable by anyone with the link to it.">
              <IconButton disableRipple>
                <InfoOutlinedIcon />
              </IconButton>
            </Tooltip>
          </div>
          <div style={{ width: "200px" }}>
            <Select
              value={options.filter(function (option) {
                return option.value === value
              })}
              options={options}
              onChange={selected => {
                setDisabled(true)
                axios.patch('/user/link/visibility',
                  { public: selected.value === 'public' },
                  { withCredentials: true }
                ).then(res => {
                  console.log(res)
                  if (res.status === 200) {
                    console.log(selected.value)
                    setValue(selected.value)
                    setDisabled(false)
                  } else {
                    setDisabled(false)
                  }
                })
              }}
              isDisabled={disabled}
            />
          </div>
        </SpacedRow>
      </CardContent>
    </Card>
  )
  return (
    <Container maxWidth="xs">
      {loading ? <Loader /> : <Contents />}
    </Container>
  )
}

export default function Account(props) {
  const [loading, setLoading] = React.useState(true)
  const user = useSelector(selectUser)
  React.useState(() => {
    setLoading(false)
  }, [])

  return (
    <div style={{ marginTop: "2rem" }}>
      {
        loading ? <Loader /> :
          user ? <AccountCard user={user} /> :
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