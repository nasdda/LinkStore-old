import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import { useParams } from 'react-router-dom'

import { useNavigate } from "react-router-dom"

import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/slice/slice'

import axios from 'axios'
import LinkIcon from './LinkIcon'

const pages = ["Collections", "Create"]
const settings = ['Logout']

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)
  const user = useSelector(selectUser)
  const navigate = useNavigate()

  const settingHandlers = {
    'Logout': async () => {
      try {
        await axios.post('/user/logout', {}, { withCredentials: true })
        setAnchorElUser(null)
      } catch (err) {
      } finally {
        navigate('/')
        window.location.reload(false)
      }

    },
  }

  const pageHandlers = {
    "Collections": async () => {
      setAnchorElNav(null)
      navigate(`/collections`)
    },
    "Create": () => {
      setAnchorElNav(null)
      navigate('/create')
    }
  }

  return (
    <AppBar position="static" style={{ backgroundColor: "#252525" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LinkIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
              '&:hover': {
                color: "inherit",
                textDecoration: "none"
              }
            }}
          >
            LinkStore
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={event => { setAnchorElNav(event.currentTarget) }}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={() => { setAnchorElNav(null) }}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={pageHandlers[page]}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <LinkIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
              '&:hover': {
                color: "inherit",
                textDecoration: "none"
              }
            }}
          >
            LinkStore
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={pageHandlers[page]}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                  border: "none",
                  outline: "none",
                  '&:focus': {
                    border: "none",
                    outline: "none",
                  },
                  '&:hover': {
                    backgroundColor: "grey !important"
                  }
                }}
                disableRipple
              >
                {page}
              </Button>
            ))}
          </Box>
          {user ?
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={(event) => { setAnchorElUser(event.currentTarget) }} sx={{ p: 0 }}>
                  <Avatar>
                    <img referrerPolicy="no-referrer" alt="avatar" src={user.picture} style={{ height: "100%" }} />
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={() => { setAnchorElUser(null) }}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={settingHandlers[setting]}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box> :
            <div id="signInDiv" />
          }

        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default NavBar
