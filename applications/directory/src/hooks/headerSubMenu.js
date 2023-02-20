import { useState, useEffect, useRef } from 'react';

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
        !event.target.closest('[aria-controls="menu-appbar"]') &&
        !event.target.closest('[aria-label="login-window"]')
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
  }, [ref, setAnchor]);
}

export default function useHeaderSubMenu() {
  // for main navigation
  const [anchorNav, setAnchorNav] = useState(false);
  const handleCloseNavMenu = () => {
    setAnchorNav(false);
  };

  // for logged in user subnavigation
  const [anchorUserMenu, setAnchorUserMenu] = useState(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleOpenUserMenu = (event) => {
    setAnchorUserMenu(event.currentTarget);
    setUserMenuOpen(true);
  };
  const handleCloseUserMenu = () => {
    setAnchorUserMenu(null);
    setUserMenuOpen(false);
  };

  // handle click outside menu to close menu
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setAnchorNav);

  // for login window
  const [anchorElLogin, setAnchorElLogin] = useState(false);

  // handle click outside menu to close login window
  const wrapperRefLogin = useRef(null);
  useOutsideAlerter(wrapperRefLogin, setAnchorElLogin);

  return {
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
  };
}
