// TODO - how to add class .active -   /* '& .active': { color: '#be2926',  borderBottom: '2px solid #be2926', paddingBottom: '0.625rem',   }*/

import { useState, useEffect, useRef } from 'react';
import { useCookies } from '@artistdirectory/react-hooks';
import { Link as MuiLink } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import Link from './Link';

/**
 * Hook that alerts clicks outside of the passed ref and closes menu on click
 */
function useOutsideAlerter(ref, setAnchor) {
  useEffect(() => {
    /**
     * close menu if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        !event.target.closest('[aria-controls="menu-appbar"]')
      ) {
        setAnchor(false);
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}

const pages = [
  { name: 'Home', url: '/' },
  { name: 'Artist Directory', url: '/artists' },
  { name: 'About', url: '/about' },
];

const Header = () => {
  const { getCookie, setCookie, removeCookie } = useCookies();

  setCookie('authToken', 'dummy');
  //setCookie('authToken', null);
  const user = getCookie('authToken');
  //removeCookie('authToken');
  useEffect(() => {
    console.log(user);
  }, [user]);

  // for main menu
  const [anchorElNav, setAnchorElNav] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setAnchorElNav(open);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(false);
  };

  // for user submenu
  const [anchorElUser, setAnchorElUser] = useState(false);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // handle click outside menu to close menu
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setAnchorElNav);

  return (
    <AppBar
      position="static"
      sx={{
        //    display: 'flex', ---- by default
        justifyContent: 'center',
        backgroundColor: '#fff',
        color: 'inherit',
        padding: 0,
        position: 'relative',
        boxShadow: 'none',
        '&::before': {
          content: '""',
          position: 'absolute',
          zIndex: -1,
          top: 0,
          bottom: 0,
          left: '50%',
          width: '100vw',
          marginLeft: '-50vw',
          boxShadow:
            '0 -2px 0 0 rgba(0, 0, 0, 0.1), 0 2px 0 0 rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      <Container
        sx={{
          padding: 0,
        }}
      >
        <Toolbar disableGutters>
          <Box
            sx={{
              display: ['flex', 'flex', 'none'],
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={toggleDrawer(!anchorElNav)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Drawer
              ref={wrapperRef}
              anchor={'left'}
              open={anchorElNav}
              onClose={toggleDrawer(false)}
              sx={{
                top: ['7.5rem', '8rem'],
                width: '19.313rem',
                '& .MuiBackdrop-root': {
                  // border: '2px solid red',
                  backdropFilter: 'blur(3px)',
                  display: ['flex', 'flex', 'none'],
                  top: ['7.5rem', '8rem'],
                },
                '& .MuiPaper-root': {
                  top: ['7.5rem', '8rem'],
                  display: ['flex', 'flex', 'none'],
                  minWidth: '19.313rem',
                  padding: 0,
                  borderRadius: '0',
                  boxShadow:
                    '0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 8px 10px 1px rgba(0, 0, 0, 0.14)',
                  '& ul': {
                    padding: 0,
                    top: 0,
                    position: 'relative',
                    margin: '2rem 1.5rem',
                    '& li:not(:first-of-type)': {
                      width: '95%',
                      padding: '0 0 0 0.5rem',
                      '& a': {
                        color: '#464852',
                        padding: '0.5rem 0 ',
                        textTransform: 'uppercase',
                        fontSize: '0.875rem',
                        lineHeight: 1.43,
                        letterSpacing: '1.25px',
                        textDecoration: 'none',
                      },
                    },
                  },
                },
              }}
            >
              <List
                sx={{
                  display: {
                    mobile: 'block',
                    tablet: 'block',
                    laptop: 'none',
                  },

                  position: 'absolute',
                  top: ['6.7rem', '7.7rem'],
                  left: '0',
                  '& hr': {
                    border: '1px solid #dbdfe9',
                    width: '95%',
                    margin: '1.483rem 0',
                  },

                  '& .MuiPaper-root': {
                    minHeight: '100%',
                    minWidth: '19.313rem',
                    padding: 0,
                    borderRadius: '0',
                    boxShadow:
                      '0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 8px 10px 1px rgba(0, 0, 0, 0.14)',
                  },
                  '& ul': {
                    padding: 0,
                    position: 'relative',
                    margin: '2rem 1.5rem',
                    '& li:not(:first-of-type)': {
                      width: '95%',
                      padding: '.75rem 0 0.75rem 0.5rem',
                      '& a': {
                        color: '#464852',
                        textTransform: 'uppercase',
                        fontSize: '0.875rem',
                        lineHeight: 1.43,
                        letterSpacing: '1.25px',
                        textDecoration: 'none',
                      },
                    },
                  },
                }}
              >
                <ListItem
                  button
                  component="li"
                  onClick={toggleDrawer(false)}
                  sx={{
                    margin: '0 .5rem',
                    padding: 0,
                    width: 'auto',
                    position: 'absolute',
                    top: '0rem',
                    left: '15rem',
                    display: 'flex',
                    alignItems: 'center',
                    '& button': {
                      display: 'flex',
                    },
                    '& span': {
                      margin: '2px',
                      borderRadius: '50%!important',
                      height: '70%',
                      top: '3px',
                    },
                    '&:hover': {
                      backgroundColor: 'transparent',
                      '@media (hover: none)': {
                        backgroundColor: 'transparent',
                      },
                    },
                  }}
                >
                  <IconButton>
                    <CloseRoundedIcon fontSize="small" />
                  </IconButton>
                </ListItem>

                <ListItem button component="li">
                  <Link onClick={handleCloseNavMenu} href={'/artists'}>
                    Artist Directory
                  </Link>
                </ListItem>
                <ListItem button component="li">
                  <Link onClick={handleCloseNavMenu} href={'/about'}>
                    About
                  </Link>
                </ListItem>

                {user && <Divider light />}
                {user && (
                  <ListItem button component="li">
                    <Link
                      onClick={handleCloseNavMenu}
                      href={'/profile/user-id'} // TODO - correct path
                    >
                      My Profile
                    </Link>
                  </ListItem>
                )}
                {user && (
                  <ListItem button component="li">
                    <Link onClick={handleCloseNavMenu} href={'/logout'}>
                      Log Out
                    </Link>
                  </ListItem>
                )}
                {!user && (
                  <ListItem button component="li">
                    <Link onClick={handleCloseNavMenu} href={'/profile/create'}>
                      Create Your Profile
                    </Link>
                  </ListItem>
                )}
                {!user && <Divider light />}
                {!user && (
                  <ListItem button component="li">
                    <Link onClick={handleCloseNavMenu} href={'/login'}>
                      Log In
                    </Link>
                  </ListItem>
                )}
              </List>
            </Drawer>
          </Box>
          <Box
            sx={{
              // width: '25%',
              //  flex: ['1 25%', '1 15%'],
              margin: '0.625rem auto 0.625rem .5rem',
              display: 'flex',
              alignItems: 'center',
              '& a': {
                display: 'flex',
                '& img': {
                  height: ['2.125rem', '3.625rem'],
                  width: ['7.813rem', '13.438rem', '13.438rem'],
                  //  width: '50%',
                  borderRadius: '4px',
                  marginRight: ['1.25rem', '1.5'],
                },
              },
            }}
          >
            <MuiLink href="/">
              <img src="/images/img-logo.svg" alt="Avenue For The Arts" />
            </MuiLink>
          </Box>

          <Box
            sx={{
              //  backgroundColor: 'pink',
              //   flexGrow: 1,
              display: ['none', 'none', 'flex'],
            }}
          >
            <List
              sx={{
                display: 'flex',
                '&:last-child': {
                  marginRight: 0,
                },
              }}
            >
              {pages.map((page) => (
                <ListItem key={page.name}>
                  <Link
                    onClick={handleCloseNavMenu}
                    component={Link}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      marginY: 1,
                      textAlign: 'center',
                      marginRight: '1.25rem',
                      textDecoration: 'none',
                      textTransform: 'uppercase',
                      color: '#464852',
                      fontSize: '0.875rem',
                      lineHeight: '1.43',
                      letterSpacing: '1.25px',
                    }}
                    href={page.url}
                  >
                    {page.name}
                  </Link>
                </ListItem>
              ))}
            </List>
          </Box>
          {!user && (
            <Box
              sx={{
                // flex: '1 35%',
                // width: '50%',
                //  marginLeft: 'auto',
                marginRight: '1.25rem',
              }}
            >
              <Button
                component="a"
                href="/profile/create"
                color="primary"
                variant="contained"
                startIcon={<ControlPointIcon />}
                sx={{
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  lineHeight: '1.14',
                  letterSpacing: '1.25px',
                  minHeight: '2.25rem',
                  padding: ' 0.375rem 1.125rem',
                }}
              >
                Create Your Artist Profile
              </Button>
            </Box>
          )}

          {user ? (
            <Box
              sx={{
                //  backgroundColor: 'lightblue',
                flexGrow: 0,
                color: 'primary',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 0,
              }}
            >
              <Link
                href={'/profile/user-id'} // TODO - correct path
                sx={{
                  padding: 0,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textDecoration: 'none',
                  '& p': {
                    fontSize: ['1rem', '1rem', '1rem', '1rem'], // to override media query font size
                  },
                }}
              >
                <Avatar
                  alt="User's name"
                  src="/images/placeholder.png"
                  sx={{
                    margin: '0.5rem 1.25rem 0.5rem 0',
                    borderRadius: '0.625rem',
                    width: '3.125rem',
                    height: '3.125rem',
                  }}
                />
                <Typography
                  typography="body1"
                  component="p"
                  sx={{
                    display: ['none', 'block'],
                    margin: '0.5rem 1.25rem 0.5rem 0',
                    lineHeight: 1.25,
                    letterSpacing: '1.25px',
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                  }}
                >
                  Josephine Washington
                </Typography>
              </Link>
              <Box
                onClick={handleOpenUserMenu}
                sx={{
                  display: [['none', 'none', 'none', 'flex']],
                  alignSelf: 'stretch',
                  alignItems: 'center',
                }}
              >
                <ArrowDropDownIcon
                  onClick={handleOpenUserMenu}
                  color="primary"
                  sx={{
                    display: ['none', 'none', 'none', 'flex'],
                  }}
                />
              </Box>

              <Menu
                sx={{
                  display: ['none', 'none', 'none', 'flex'],
                  marginTop: '45px',
                  //  background: 'rgba(0, 0, 0, .1)',

                  '& .MuiMenu-paper': {
                    borderRadius: '4px',
                    boxShadow:
                      '-0.625rem 0.625rem 1.25rem 0 rgba(30, 30, 30, 0.05)',
                    border: 'solid 1px #e6e6f3',
                    backgroundColor: '#fff',
                    padding: 0,
                    top: '5.4rem! important',
                    '& ul': {
                      padding: 0,
                      '& li.Mui-focusVisible': {
                        backgroundColor: 'transparent',
                      },
                      '& li ': {
                        padding: '1rem 2rem',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.04)',
                        },
                      },

                      '& a': {
                        fontSize: '0.875rem',
                        padding: 0,
                        lineHeight: 1.14,
                        letterSpacing: '1.25px',
                        textTransform: 'uppercase',
                        textDecoration: 'none',
                        fontWeight: 700,
                        color: 'primary',
                        display: 'flex',
                        alignItems: 'center',
                        '& svg': {
                          marginRight: '.5rem',
                        },
                      },
                      '& hr': {
                        margin: '0 auto',
                        width: '75%',
                      },
                    },
                  },
                }}
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
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Link
                    href="/profile/user-if"
                    /* TODO - add correct path*/ textAlign="center"
                  >
                    My Profile
                  </Link>
                </MenuItem>
                <Divider light />
                <MenuItem onClick={handleCloseUserMenu}>
                  <Link href="/logout" textAlign="center">
                    <LogoutRoundedIcon />
                    Log Out
                  </Link>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box
              sx={{
                //  flex: '1 10%',
                minWidth: '5.625rem',
                display: ['none', 'flex'],
                justifyContent: 'center',
                marginRight: 0,
              }}
            >
              <Button
                component="a"
                // color="primary"
                href="/login"
                variant="outlined"
                sx={{
                  flex: 1,
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  lineHeight: '1.14',
                  letterSpacing: '1.25px',
                  minHeight: '2.25rem',
                  width: '100%',
                  padding: '0.625rem 0',
                }}
              >
                Log In
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
