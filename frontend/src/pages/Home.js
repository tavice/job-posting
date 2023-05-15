import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, Grid, Paper } from "@mui/material";

const Home = () => {
  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h3" style={{ marginBottom: 20 }}>Welcome to Our Job Board!</Typography>

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: 20 }}>
            <Typography variant="h5" style={{ marginBottom: 10 }}>For Job Seekers</Typography>
            <Typography variant="body1" style={{ marginBottom: 20 }}>Find your next career opportunity with our job board.</Typography>
            <Link to="/employer-job-listing">
              <Button variant="contained" color="primary">Browse Jobs</Button>
            </Link>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper style={{ padding: 20 }}>
            <Typography variant="h5" style={{ marginBottom: 10 }}>For Employers</Typography>
            <Typography variant="body1" style={{ marginBottom: 20 }}>Post your job openings and find qualified candidates.</Typography>
            <Link to="/employers">
              <Button variant="contained" color="secondary">Post a Job</Button>
            </Link>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default Home;
