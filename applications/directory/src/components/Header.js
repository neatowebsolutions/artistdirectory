import { signOut, useSession } from 'next-auth/react';
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
import LogIn from './LogIn';
import useHeaderSubMenu from '../hooks/headerSubMenu';

const pages = [
  { name: 'Home', url: '/' },
  { name: 'Artist Directory', url: '/artists' },
  { name: 'About', url: '/about' }
];

const linkStyles = {
  width: '100%',
  textAlign: 'center',
  textTransform: 'uppercase',
  lineHeight: '1.43',
  fontSize: '0.875rem',
  letterSpacing: '1.25px'
};

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
        display: 'flex',
        justifyContent: ['flex-start', 'flex-start', 'center'],
        borderBottom: active ? '3px solid' : 'none',
        borderColor: active ? 'primary' : 'none',
        paddingBottom: active ? [null, null, '0.375rem', '0.5rem'] : '0',
        fontWeight: active ? '500' : 'normal',
        textDecoration: 'none',
        marginRight: '1.25rem',
        ...linkStyles
      }}
    >
      {children}
    </Link>
  );
};

const Header = () => {
  const { data: session } = useSession();
  const { removeCookie } = useCookies();

  const signArtistOut = () => {
    removeCookie('access-token');
    signOut({ callbackUrl: '/', redirect: false });
  };

  const {
    anchorNav,
    setAnchorNav,
    handleCloseNavMenu,
    anchorUserMenu,
    userMenuOpen,
    handleOpenUserMenu,
    handleCloseUserMenu,
    wrapperRef,
    wrapperRefLogin,
    anchorElLogin,
    setAnchorElLogin
  } = useHeaderSubMenu();

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
              onClick={() => {
                setAnchorNav((prev) => !prev);
                setAnchorElLogin(false);
              }}
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
              open={anchorNav}
              onClose={handleCloseNavMenu}
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
                  onClick={handleCloseNavMenu}
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

                {session && <Divider light />}
                {session && (
                  <ListItem button component="li">
                    <NavLink onClick={handleCloseNavMenu} href={'/profile'}>
                      My Profile
                    </NavLink>
                  </ListItem>
                )}
                {session && (
                  <ListItem
                    button
                    component="li"
                    sx={{
                      padding: '0!important'
                    }}
                  >
                    <Button
                      onClick={() => {
                        handleCloseNavMenu();
                        setAnchorElLogin(false);
                        signArtistOut();
                      }}
                      sx={{
                        height: '100%',
                        padding: '.75rem 0 0.75rem 0.5rem',
                        justifyContent: 'flex-start',
                        color: 'inherit',
                        fontWeight: 'normal',
                        ...linkStyles,
                        '&:hover': { background: 'none' }
                      }}
                    >
                      Log Out
                    </Button>
                  </ListItem>
                )}
                {!session && (
                  <ListItem button component="li">
                    <NavLink
                      onClick={handleCloseNavMenu}
                      href={'/profile/create/'}
                    >
                      Create Your Profile
                    </NavLink>
                  </ListItem>
                )}
                {!session && <Divider light />}
                {!session && (
                  <ListItem button component="li">
                    {/* TODO - close menu and open the right  drawer with login component */}
                    <NavLink onClick={handleCloseNavMenu} href={'/auth/login'}>
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
                display: 'flex'
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
          {!session && (
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
          {session ? (
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
                href={'/profile'} // TODO - correct path
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
                  src={session.user.profileImageUrl}
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
                  {`${session.user.firstName} ${session.user.lastName}`}
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
                  color="primary"
                  sx={{
                    display: ['none', 'none', 'flex', 'flex']
                  }}
                />
              </Box>

              <Menu
                open={userMenuOpen}
                onClose={handleCloseUserMenu}
                sx={{
                  display: ['none', 'none', 'flex', 'flex'],
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
                anchorEl={anchorUserMenu}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Link
                    href="/profile"
                    /* TODO - add correct path */ textAlign="center"
                  >
                    My Profile
                  </Link>
                </MenuItem>
                <Divider light />
                <MenuItem
                  onClick={() => {
                    handleCloseUserMenu();
                    signArtistOut();
                  }}
                  sx={{
                    padding: '0!important'
                  }}
                >
                  {/* TODO - fix button background color when the button is clicked (it is not pinkish instead of grey) */}
                  <Button
                    textAlign="center"
                    sx={{
                      height: '100%',
                      padding: '.75rem 0.5rem 0.75rem 0.5rem',
                      justifyContent: 'center',
                      ...linkStyles,
                      '&:hover': { background: 'none' }
                    }}
                  >
                    <LogoutRoundedIcon />
                    Log Out
                  </Button>
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
                variant="outlined"
                aria-label="login-window"
                aria-haspopup="true"
                onClick={() => {
                  setAnchorElLogin((prev) => !prev);
                  setAnchorNav(false);
                }}
                sx={{
                  fontSize: '0.875rem',
                  width: '100%',
                  padding: '0.625rem 0',
                  border: 'solid 1px rgba(0, 0, 0, 0.12)'
                }}
              >
                Log In
              </Button>

              <Drawer
                ref={wrapperRefLogin}
                anchor={'right'}
                open={anchorElLogin}
                onClose={() => setAnchorElLogin(false)}
                sx={{
                  display: 'flex',
                  minHeight: '100%',
                  top: ['6.8rem', '8rem'],
                  '& .MuiBackdrop-root': {
                    backdropFilter: 'blur(3px)',
                    top: ['6.8rem', '8rem']
                  },
                  '& .MuiPaper-root': {
                    top: ['6.8rem', '8rem'],
                    right: '1.5rem',
                    minWidth: ['21.438rem'],
                    height: 'auto',
                    padding: 0,
                    boxShadow:
                      '0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 8px 10px 1px rgba(0, 0, 0, 0.14)'
                  }
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    margin: '1rem'
                  }}
                >
                  <Button
                    component="button"
                    onClick={() => setAnchorElLogin(false)}
                    sx={{
                      position: 'absolute',
                      top: '-0.5rem',
                      right: '-1rem',
                      margin: '0',
                      color: 'inherit',
                      padding: 0,
                      width: 'auto',
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
                    {/* <IconButton sx={{ display: 'flex' }}> */}
                    {/* TODO - fix styling - effect on button click */}
                    <CloseRoundedIcon fontSize="small" />
                  </Button>
                  <LogIn closeDropdownLoginWindow={setAnchorElLogin} />
                </Box>
              </Drawer>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
