import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux'
import { selectUser, setUser } from '../../redux/slice/slice'


import axios from 'axios';
import LinkIcon from './LinkIcon';

const pages = ["Explore", "Links", "Create", "About"];
const settings = ['Account', 'Logout'];

const useStyles = makeStyles(theme => ({
  logo: {
    textDecoration: "none",
    '&:hover': {
      color: "inherit",
      textDecoration: "none"
    }
  },
  pageButton: {
    border: "none",
    outline: "none",
    '&:focus': {
      border: "none",
      outline: "none",
    },
    '&:hover': {
      backgroundColor: "grey"
    }
  }
}));

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const classes = useStyles()

  React.useEffect(() => {
    axios.get('/user', {}, { withCredentials: true }).then(resp => {
      console.log(resp)
      dispatch(setUser({ user: resp.data.user }))
    }).catch(err => {
      console.log(err)
    })
  }, [])

  const settingHandlers = {
    'Account': () => {
      setAnchorElUser(null);
    },
    'Logout': async () => {
      try {
        await axios.post('/user/logout', {}, { withCredentials: true })
        setAnchorElUser(null);
      } catch (err) {
        console.log(err)
      } finally {
        navigate('/')
        window.location.reload(false);
      }

    },
  }

  const pageHandlers = {
    "Explore": () => { setAnchorElNav(null); },
    "Links": () => {
      navigate(`/links/${user.uuid}`)
      setAnchorElNav(null)
    },
    "About": () => { setAnchorElNav(null); },
    "Create": () => {
      navigate('/create')
      setAnchorElNav(null)
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
            }}
            className={classes.logo}
          >
            LinkStore
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={event => { setAnchorElNav(event.currentTarget); }}
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
              onClose={() => { setAnchorElNav(null); }}
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
            }}
            className={classes.logo}
          >
            LinkStore
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={pageHandlers[page]}
                sx={{ my: 2, color: 'white', display: 'block' }}
                className={classes.pageButton}
                disableRipple
              >
                {page}
              </Button>
            ))}
          </Box>
          {user ?
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={(event) => { setAnchorElUser(event.currentTarget); }} sx={{ p: 0 }}>
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
  );
};
export default React.memo(NavBar);
