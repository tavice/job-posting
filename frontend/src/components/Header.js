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
        <StyledLink to="/" className="nav-link">
          Home
        </StyledLink>
        <StyledLink to="/employer-job-listing" className="nav-link">
          Job Listings
        </StyledLink>
       
       
      </nav>
    </div>
  );
};

export default Header;
