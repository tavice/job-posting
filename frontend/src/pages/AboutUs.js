import React from "react";
import { Typography, Paper, Grid } from "@mui/material";
import Container from "@mui/material/Container";

const AboutUs = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" style={{padding:20, marginTop:60, marginBottom: 60}}>AboutUs</Typography>
      <Grid container spacing={2}>
          <Grid item xs={6} md={6}>
      <Paper style={{ color: 'white', padding: 20, marginBottom: 10, background: 'rgba(1,1,1,0.2)' }}>
        Welcome to MyJobSearch.com, the ultimate online job searching platform
        that empowers both job seekers and employers. Our cutting-edge website
        harnesses the power of AI to revolutionize the way you search for your
        dream job or the perfect candidate. With a modern and intuitive
        interface, we provide a seamless experience that connects talented
        individuals with top-notch employers. Whether you're a job seeker
        looking to explore new opportunities or an employer in search of
        exceptional talent, MyJobSearch.com is your go-to destination. Our
        intelligent algorithms analyze vast amounts of data to match job seekers
        with the most relevant positions and help employers identify the
        best-suited candidates. Join us today and unlock the full potential of
        your job search or recruitment journey with the innovation and
        efficiency of AI at your fingertips.
      </Paper>

      </Grid>
      <Grid item xs={6} md={6}>
        <div style={{background:'rgba(1,1,1,0.2', zIndex:2}}>
        <img src="https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="aboutus" style={{width: '100%', height: 'auto'}}/>
        </div>
      </Grid>
      </Grid>
    </Container>
  );
};

export default AboutUs;
