import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";



const Header = () => {
const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 1.5rem;
  margin: 0 1rem;
  &:hover {
    color: #000;
  }
`;

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
        <StyledLink to="/logout" className="nav-link">
          Logout 
        </StyledLink>
        </div>
        ):( //if token is not in local storage, show register and login links

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
