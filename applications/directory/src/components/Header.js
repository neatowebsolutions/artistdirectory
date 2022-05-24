// TODO - how to add class .active -   /* '& .active': { color: '#be2926',  borderBottom: '2px solid #be2926', paddingBottom: '0.625rem',   }*/

import { useState, useEffect, useRef } from 'react';
import { useCookies } from '@artistdirectory/react-hooks';
import { Link as MuiLink } from '@mui/material';
import AppBar from '@mui/material/AppBar';
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
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import Link from './Link';

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref, setAnchorElNav) {
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
        setAnchorElNav();
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
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Header = () => {
  const { getCookie, setCookie, removeCookie } = useCookies();

  setCookie('authToken', 'dummy');
  //setCookie('authToken', null);
  const user = getCookie('authToken');
  removeCookie('authToken');
  useEffect(() => {
    console.log(user);
  }, [user]);

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setAnchorElNav);

  const handleOpenNavMenu = (event) => {
    if (anchorElNav) {
      setAnchorElNav(null);
    } else setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        //    display: 'flex', ---- by default

        justifyContent: 'center',
        backgroundColor: '#fff',
        color: 'inherit',
        //color: '#464852',
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
        <Toolbar
          disableGutters
          sx={
            {
              // width: '100%',
              // justifyContent: 'center',
            }
          }
        >
          <Box
            sx={{
              //   backgroundColor: 'green',
              // flexGrow: 1,
              display: ['flex', 'flex', 'none'],
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              ref={wrapperRef}
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
              onClose={handleCloseNavMenu}
              sx={{
                display: {
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  backdropFilter: 'blur(3px)',
                  mobile: 'block',
                  tablet: 'block',
                  laptop: 'none',
                },

                position: 'absolute',
                top: '7.7rem',
                left: '0',
                '& hr': {
                  border: '1px solid #dbdfe9',
                  width: '86%',
                  margin: '1rem auto',
                },
                '& .MuiPaper-root': {
                  top: '0 !important',
                  left: '0 !important',
                  minHeight: '100%',
                  minWidth: '19.313rem',
                  padding: 0,
                  borderRadius: '0',
                  boxShadow:
                    '0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 8px 10px 1px rgba(0, 0, 0, 0.14)',
                },
                '& ul': {
                  padding: 0,
                  margin: '2rem 1.5rem',

                  '& li': {
                    '& a': {
                      color: '#464852',
                      textTransform: 'uppercase',
                      fontSize: '0.875rem',
                      lineHeight: 1.43,
                      letterSpacing: '1.25px',
                    },
                  },
                },
              }}
            >
              <MenuItem>
                <ListItem
                  onClick={handleCloseNavMenu}
                  component={Link}
                  href={'/artists'}
                >
                  Artist Directory
                </ListItem>
              </MenuItem>
              <MenuItem>
                <ListItem
                  onClick={handleCloseNavMenu}
                  component={Link}
                  href={'/about'}
                >
                  About
                </ListItem>
              </MenuItem>

              {user ? (
                <>
                  <hr />
                  <MenuItem>
                    <ListItem
                      onClick={handleCloseNavMenu}
                      component={Link}
                      href={'/profile/user-id'} // TODO - correct path
                    >
                      My Profile
                    </ListItem>
                  </MenuItem>
                  <MenuItem>
                    <ListItem
                      onClick={handleCloseNavMenu}
                      component={Link}
                      href={'/logout'}
                    >
                      Log Out
                    </ListItem>
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem>
                    <ListItem
                      onClick={handleCloseNavMenu}
                      component={Link}
                      href={'/profile/create'}
                    >
                      Create Your Profile
                    </ListItem>
                  </MenuItem>

                  <hr />
                  <MenuItem>
                    <ListItem
                      onClick={handleCloseNavMenu}
                      component={Link}
                      href={'/login'}
                    >
                      Log In
                    </ListItem>
                  </MenuItem>
                </>
              )}
            </Menu>
          </Box>
          <Box
            sx={{
              // width: '25%',
              //  flex: ['1 25%', '1 15%'],
              margin: '0.625rem auto 0.625rem .5rem',
              display: 'flex',
              alignItems: 'center',
              // justifyContent: 'flex-start',
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
                //justifyContent: 'flex-end',
                //alignItems: 'center',
                '&:last-child': {
                  marginRight: 0,
                },
              }}
            >
              {pages.map((page) => (
                <ListItem
                  key={page.name}
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
               // backgroundColor: 'lightblue',
                flexGrow: 0,
                color: 'primary',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
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
              <ArrowDropDownIcon
                color="primary"
                onClick={handleOpenUserMenu}
                sx={{
                  display: ['none', 'none', 'none', 'block'],
                }}
              />
              <Menu
                sx={{ marginTop: '45px' }}
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
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
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

// import Link from 'next/link';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/typography';
// import Box from '@mui/material/Box';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';

// import ControlPointIcon from '@mui/icons-material/ControlPoint';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import classes from './Header.module.scss';

// function Header() {
//   return (
//     <header className={classes.header}>
//       <Box className={classes.siteBranding}>
//         <Link href="/" className={classes.active}>
//           <a>
//             <img src="/images/img-logo.svg" alt="Avenue For The Arts" />
//           </a>
//         </Link>
//       </Box>
//       <nav>
//         <List>
//           <ListItem sx={{ display: ['none', 'none', 'block'] }}>
//             <Link href="/" className={classes.active}>
//               <a>Home</a>
//             </Link>
//           </ListItem>
//           <ListItem sx={{ display: ['none', 'none', 'block'] }}>
//             <Link href="/artists">
//               <a>Artist Directory</a>
//             </Link>
//           </ListItem>
//           <ListItem>
//             <Link href="/profile/create" passHref>
//               <Button
//                 component="a"
//                 color="primary"
//                 variant="contained"
//                 startIcon={<ControlPointIcon />}
//                 sx={{
//                   '&&': {
//                     color: 'white',
//                   },
//                 }}
//               >
//                 Create Your Artist Profile
//               </Button>
//             </Link>
//           </ListItem>
//           <ListItem className={classes.profile}>
//             <Link href="/">
//               <a>
//                 <img src="/images/placeholder.png" alt="placeholder" />
//                 Josephine Washington
//                 <ArrowDropDownIcon />
//               </a>
//             </Link>
//             <List className={classes.profileSubmenu}>
//               <ListItem>
//                 <Link href="/profile">
//                   <a>My Account</a>
//                 </Link>
//               </ListItem>
//               <ListItem>
//                 <Link href="/logout">
//                   <a>Log Out</a>
//                 </Link>
//               </ListItem>
//             </List>
//           </ListItem>
//         </List>
//       </nav>
//     </header>
//   );
// }

// export default Header;
