import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const Header = ({ baseUrl }) => {
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
  const csrf_token = getCookie("csrftoken");

  const handleLogout = async () => {
    try {
      const response = await axios.post(`${baseUrl}/api/logout/`, null, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,

          //'X-CSRFToken': csrf_token,
        },
      });
      console.log(response);
      if (response.status === 200) {
        //if logout is successful, remove token and user_id from local storage and redirect to home page
        localStorage.removeItem("token");
        localStorage.removeItem("authenticated_user");
        console.log("User is logged out.");
        window.location.href = "/";
      } else {
        console.error("Failed to log out");
      }
    } catch (err) {
      console.error(err);
      console.error("Failed to log out");
    }
  };

  //================================================================//
  //Render//
  return (
    <div className="header">
      <h1 className="main-title">MyJobSearch.com</h1>
      <nav className="nav-bar">
        <div className="link-to-pages">
          <StyledLink to="/" className="nav-link">
            Home
          </StyledLink>
          <StyledLink to="/employer-job-listing" className="nav-link">
            Job Listings
          </StyledLink>
        </div>
        {localStorage.getItem("token") ? ( //if token is in local storage, show logout link
          <div className="link-to-auth">
            <button onClick={handleLogout} className="nav-link">
              Logout
            </button>
          </div>
        ) : (
          //if token is not in local storage, show register and login links

          <div className="link-to-auth">
            <StyledLink to="/register" className="nav-link">
              Register
            </StyledLink>
            <StyledLink to="/login" className="nav-link">
              Login
            </StyledLink>
            
          </div>
        )}
      </nav>
    </div>
  );
};

export default Header;
