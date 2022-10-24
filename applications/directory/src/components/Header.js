import { useState, useEffect, useRef } from 'react';
import { useCookies } from '@artistdirectory/react-hooks';
import { useRouter } from 'next/router';
import { Link as MuiLink } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
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
  { name: 'About', url: '/about' }
];

const NavLink = ({ href, children, onClick, isTopNav = false }) => {
  // isTopNav used to style only top nav links
  const router = useRouter();
  let active = false;

  if (isTopNav) {
    const re = new RegExp(`(^(${href}$)|(^(${href})\/(.+)?$))`);
    active = router.asPath.match(re);
    active = active && active[0].includes(href);
  }

  return (
    <Link
      onClick={onClick}
      href={href}
      sx={{
        color: active ? 'primary' : '#464852', // TODO Should this color go to material.js?
        borderBottom: active ? '3px solid' : 'none',
        borderColor: active ? 'primary' : 'none',
        paddingBottom: active ? [null, null, '0.375rem', '0.5rem'] : '0',
        fontWeight: active ? '500' : 'normal',
        textDecoration: 'none',
        textAlign: 'center',
        marginRight: '1.25rem',
        textTransform: 'uppercase',
        fontSize: '0.875rem',
        lineHeight: '1.43',
        letterSpacing: '1.25px'
      }}
    >
      {children}
    </Link>
  );
};

const Header = () => {
  const { getCookie, setCookie, removeCookie } = useCookies();

  //setCookie('authToken', 'dummy');
  // setCookie('authToken', null);
  const user = getCookie('authToken');
  removeCookie('authToken');

  // for main menu
  const [anchorElNav, setAnchorElNav] = useState(false);
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
        justifyContent: 'center',
        backgroundColor: '#fff',
        color: 'inherit',
        padding: ['0 1rem', '0 1.5rem'],
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
            '0 -2px 0 0 rgba(0, 0, 0, 0.1), 0 2px 0 0 rgba(0, 0, 0, 0.1)'
        }
      }}
    >
      <Container
        sx={{
          padding: 0,
          textTransform: 'uppercase',
          textDecoration: 'none',
          lineHeight: '1.14',
          letterSpacing: '1.25px'
        }}
      >
        <Toolbar disableGutters>
          <Box
            sx={{
              display: ['flex', 'flex', 'none'],
              paddingX: [1, 1, 0]
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => setAnchorElNav(!anchorElNav)}
              color="inherit"
              sx={{
                padding: 0
              }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              ref={wrapperRef}
              anchor={'left'}
              open={anchorElNav}
              onClose={() => setAnchorElNav(false)}
              sx={{
                display: ['flex', 'flex', 'none'],
                minHeight: '100%',
                top: ['6.8rem', '8rem'],
                '& .MuiBackdrop-root': {
                  backdropFilter: 'blur(3px)',
                  top: ['6.8rem', '8rem']
                },
                '& .MuiPaper-root': {
                  top: ['6.8rem', '8rem'],
                  minWidth: '19.313rem',
                  padding: 0,
                  boxShadow:
                    '0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 8px 10px 1px rgba(0, 0, 0, 0.14)'
                }
              }}
            >
              <List
                sx={{
                  position: 'relative',
                  top: 0,
                  left: '0',
                  margin: '2rem 2.5rem 2rem 1.5rem',
                  padding: '0',
                  '& li:not(:first-of-type)': {
                    width: '95%',
                    padding: '.75rem 0 .75rem 0.5rem'
                  },
                  '& hr': {
                    border: '1px solid #dbdfe9',
                    width: '95%',
                    margin: '.8rem 0'
                  }
                }}
              >
                <ListItem
                  button
                  component="li"
                  onClick={() => setAnchorElNav(false)}
                  sx={{
                    margin: '0 .5rem 0 0 ',
                    padding: 0,
                    width: 'auto',
                    position: 'absolute',
                    top: '0.2rem',
                    left: '15rem',
                    display: 'flex',
                    alignItems: 'center',
                    '& span': {
                      margin: '2px',
                      borderRadius: '50%!important',
                      height: '70%',
                      top: '3px'
                    },
                    '&:hover': {
                      backgroundColor: 'transparent',
                      '@media (hover: none)': {
                        backgroundColor: 'transparent'
                      }
                    }
                  }}
                >
                  <IconButton sx={{ display: 'flex' }}>
                    <CloseRoundedIcon fontSize="small" />
                  </IconButton>
                </ListItem>

                <ListItem button component="li">
                  <NavLink onClick={handleCloseNavMenu} href={'/artists'}>
                    Artist Directory
                  </NavLink>
                </ListItem>
                <ListItem button component="li">
                  <NavLink onClick={handleCloseNavMenu} href={'/about'}>
                    About
                  </NavLink>
                </ListItem>

                {user && <Divider light />}
                {user && (
                  <ListItem button component="li">
                    <NavLink
                      onClick={handleCloseNavMenu}
                      href={'/profile/user-id'} // TODO - correct path
                    >
                      My Profile
                    </NavLink>
                  </ListItem>
                )}
                {user && (
                  <ListItem button component="li">
                    <NavLink onClick={handleCloseNavMenu} href={'/logout'}>
                      Log Out
                    </NavLink>
                  </ListItem>
                )}
                {!user && (
                  <ListItem button component="li">
                    <NavLink
                      onClick={handleCloseNavMenu}
                      href={'/profile/create/'}
                    >
                      Create Your Profile
                    </NavLink>
                  </ListItem>
                )}
                {!user && <Divider light />}
                {!user && (
                  <ListItem button component="li">
                    <NavLink onClick={handleCloseNavMenu} href={'/login'}>
                      Log In
                    </NavLink>
                  </ListItem>
                )}
              </List>
            </Drawer>
          </Box>
          <Box
            sx={{
              margin: '0.625rem auto 0.625rem .5rem',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <MuiLink
              href="/"
              sx={{
                display: 'flex'
              }}
            >
              <Box
                component="img"
                src="/images/img-logo.svg"
                alt="Avenue For The Arts"
                sx={{
                  width: ['7.812rem', '13.438rem'],
                  borderRadius: '4px',
                  marginLeft: [0, 1, -1],
                  marginRight: [2, 3]
                }}
              />
            </MuiLink>
          </Box>

          <Box
            sx={{
              display: ['none', 'none', 'flex']
            }}
          >
            <List
              sx={{
                display: 'flex',
                '&:last-child': {
                  //  marginRight: 0,
                }
              }}
            >
              {pages.map((page) => (
                <ListItem
                  key={page.name}
                  sx={{
                    justifyContent: 'center',
                    padding: '0.5rem 0.5rem'
                  }}
                >
                  <NavLink
                    onClick={handleCloseNavMenu}
                    component={Link}
                    isTopNav={true}
                    href={page.url}
                  >
                    {page.name}
                  </NavLink>
                </ListItem>
              ))}
            </List>
          </Box>
          {!user && (
            <Box
              sx={{
                marginRight: ['.5rem', '1rem']
              }}
            >
              <Button
                component="a"
                href="/profile/create"
                color="primary"
                variant="contained"
                startIcon={<ControlPointIcon />}
                sx={{
                  fontWeight: 600,
                  fontSize: ['0.75rem', '0.875rem'],
                  paddingLeft: [1, 2.5],
                  paddingRight: [1, 2.5],
                  paddingY: 0,
                  letterSpacing: ['1.07px', '1.25px'],
                  whiteSpace: ['normal', 'nowrap', 'nowrap', 'nowrap']
                }}
              >
                Create Your Artist Profile
              </Button>
            </Box>
          )}
          {user ? (
            <Box
              sx={{
                flexGrow: 0,
                color: 'primary',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 0
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
                    fontSize: ['1rem', '1rem', '1rem', '1rem'] // to override media query font size
                  }
                }}
              >
                <Avatar
                  alt="User's name"
                  src="/images/placeholder.png"
                  sx={{
                    margin: ['0', '0.5rem 1.25rem 0.5rem 0'],
                    borderRadius: '0.625rem',
                    width: '3.125rem',
                    height: '3.125rem'
                  }}
                />
                <Typography
                  typography="body1"
                  component="p"
                  sx={{
                    display: ['none', 'block'],
                    margin: '0.5rem 1.25rem 0.5rem 0',
                    textTransform: 'uppercase',
                    fontWeight: 'bold'
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
                  cursor: 'pointer'
                }}
              >
                <ArrowDropDownIcon
                  onClick={handleOpenUserMenu}
                  color="primary"
                  sx={{
                    display: ['none', 'none', 'none', 'flex']
                  }}
                />
              </Box>

              <Menu
                sx={{
                  display: ['none', 'none', 'none', 'flex'],
                  marginTop: '45px',
                  '& .MuiMenu-paper': {
                    borderRadius: '4px',
                    boxShadow:
                      '-0.625rem 0.625rem 1.25rem 0 rgba(30, 30, 30, 0.05)',
                    border: 'solid 1px #e6e6f3',
                    backgroundColor: '#fff',
                    padding: 0,
                    top: '4.6rem! important',
                    '& ul': {
                      padding: 0,
                      '& li.Mui-focusVisible': {
                        backgroundColor: 'transparent'
                      },
                      '& li ': {
                        padding: '1rem 2rem',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.04)'
                        }
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
                          marginRight: '.5rem'
                        }
                      },
                      '& hr': {
                        margin: '0 auto',
                        width: '75%'
                      }
                    }
                  }
                }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Link
                    href="/profile/user-id"
                    /* TODO - add correct path */ textAlign="center"
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
                minWidth: '5.625rem',
                display: ['none', 'flex'],
                marginRight: 0
              }}
            >
              <Button
                component="a"
                href="/login"
                variant="outlined"
                sx={{
                  fontSize: '0.875rem',
                  width: '100%',
                  padding: '0.625rem 0',
                  border: 'solid 1px rgba(0, 0, 0, 0.12)'
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
