import React from 'react';
import { Typography, Container } from '@mui/material';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Typography variant="body1" align="center" color="textSecondary">
          &copy; {new Date().getFullYear()} MyJobSearch.com. All rights reserved.
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
