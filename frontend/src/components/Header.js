import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import axios from "axios";

//================================================================//
//Material UI

import {
  Button,
  Typography,
  Grid,
  Paper,
  AppBar,
  Toolbar,
} from "@mui/material";
import Container from "@mui/material/Container";
import WorkIcon from "@mui/icons-material/Work";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";

const Header = ({ baseUrl }) => {

  const userName = localStorage.getItem("username");
  //================================================================//
  //Styled Components//
  const StyledLink = styled(Link)`
    color: #fff;
    text-decoration: none;
    font-size: 1.5rem;
    margin: 0 1rem;
    &:hover {
      color: #000;
    }
  `;

  //================================================================//
  //Get Cookie Function//
  const getCookie = (name) => {
    const cookies = document.cookie.split(";");
    console.log(cookies);
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + "=")) {
        return decodeURIComponent(cookie.substring(name.length + 1));
      }
    }
    return null;
  };

  //================================================================//
  //Logout Function//

  // const handleLogout = async () => {
  //   try {
  //     const headers = {
  //       'Content-Type': 'application/json',
  //       Authorization: `Token ${localStorage.getItem('token')}`, // Include the token in the Authorization header
  //     };

  //     const response = await axios.post(`${baseUrl}/api/logout/`, {}, { headers });

  //     console.log(response);

  //     if (response.status === 200) {
  //       localStorage.removeItem('token');
  //       localStorage.removeItem('authenticated_user');
  //       localStorage.removeItem('username');
  //       localStorage.removeItem('user_type');
  //       console.log('User is logged out.');
  //       window.location.href = '/Home';
  //     } else {
  //       console.error('Failed to log out');
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     console.error('Failed to log out');
  //   }
  // };

  const handleLogout = () => {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("authenticated_user");

      localStorage.removeItem("user_type");
      localStorage.removeItem("");
      console.log("User is logged out.");
      window.location.href = "/Home";
    }
  };

  //================================================================//
  //Nav Menu//
  const pages = ["Home", "Job Listings", "About Us", "Contact Us"];
  const pagesLinks = ["/", "/job-listings", "/about-us", "/contact-us"];
  const settings = ["My Dashboard", "Log Out"];

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleClickNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  //console.log(anchorElNav);

  const handleClickUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  //console.log(anchorElUser);

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  //================================================================//
  //Find user type and display appropriate menu//
  const userType = localStorage.getItem("user_type");

  //================================================================//
  //Render//
  return (
    <AppBar
      position="static"
      style={{
        padding: 20,
        background: "linear-gradient(90deg, #d53369 0%, #daae51 100%)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <WorkIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/Home"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "Roboto, sans-serif",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MYJOBSEARCH.COM
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              paddingInline: 10,
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleClickNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                //each page is to be associated with a link which is stored in the pagesLinks array

                <MenuItem>
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography
                      textAlign="center"
                      component={Link}
                      to={`/${page}`}
                    >
                      {page}
                    </Typography>
                  </MenuItem>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <WorkIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/Home"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "Roboto, sans-serif",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MYJOBSEARCH.COM
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                component={Link}
                to={`/${page}`}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
          {userType === "E" || userType === "J" ? (
            //Button to log out

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleClickUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={userName} src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem component={Link} to="/dashboard">
                  {" "}
                  My Dashboard
                </MenuItem>
                <MenuItem onClick={handleLogout}>Log Out</MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0, display: "flex" }}>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/login"
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Sign In
              </Button>
              <Button
                variant="contained"
                color="secondary"
                component={Link}
                to="/register"
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Sign Up
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
