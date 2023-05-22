import React from "react";
import { Link } from "react-router-dom";
import { Button, Typography, Grid, Paper } from "@mui/material";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import PersonIcon from '@mui/icons-material/Person';
import HandshakeIcon from '@mui/icons-material/Handshake';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import SpaIcon from '@mui/icons-material/Spa';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';

const Home = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" style={{padding:20, marginTop:60, marginBottom: 60, textTransform:'uppercase'}}>
        Welcome to MyJobSearch.com !
      </Typography>

      <Box sx={{ flexGrow: 1 }} style={{ alignItems: "center" }}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={6}>
            <Paper style={{ padding: 20 }}>
              <Typography variant="h4" style={{ marginBottom: 10 }}>
                For Job Seekers
              </Typography>
              <Typography variant="body1" style={{ marginBottom: 20 }}>
                Find your next career opportunity with our job board.
              </Typography>
              <Link to="/Job Listings">
                <Button variant="contained" color="primary" style={{ marginBottom: 10 }}>
                  Browse Jobs
                </Button>
              </Link>
              <Grid item xs={12} md={12}>
                <Paper style={{ padding: 20, marginBottom: 10 }}>
                  <Typography variant="h5" style={{ marginBottom: 10 }}>
                  <AllInclusiveIcon style={{ fontSize: 40,  }}/> Expansive Opportunities
                  </Typography>
                  <Typography variant="body1" style={{ marginBottom: 20 }}>
                  Access a wide range of career opportunities across industries and locations.
                  </Typography>
                </Paper>

              </Grid>
              <Grid item xs={12} md={12}>
            <Paper style={{ padding: 20, marginBottom: 10 }}>
              <Typography variant="h5" style={{ marginBottom: 10 }} >
              <SpaIcon style={{ fontSize: 40,  }}/> Streamlined Job Search
              </Typography>
              <Typography variant="body1" style={{ marginBottom: 20 }}>
              Simplify your job search with user-friendly features and personalized recommendations.
              </Typography>
      
            </Paper>
          </Grid>
          <Grid item xs={12} md={12}>
            <Paper style={{ padding: 20, marginBottom: 10 }}>
              <Typography variant="h5" style={{ marginBottom: 10 }}>
              <PhoneInTalkIcon style={{ fontSize: 40,  }} /> Valuable Support
              </Typography>
              <Typography variant="body1" style={{ marginBottom: 20 }}>
              Gain valuable resources, guidance, and insights to enhance your job search strategy and career prospects.
              </Typography>
          
            </Paper>
          </Grid>
            </Paper>
          </Grid>

          <Grid item xs={6} md={6}>
            <Paper style={{ padding: 20 }}>
              <Typography variant="h4" style={{ marginBottom: 10 }}>
                For Employers
              </Typography>
              <Typography variant="body1" style={{ marginBottom: 20 }}>
                Post your job openings and find qualified candidates.
              </Typography>
              <Link to="/create-your-job-offer">
                <Button variant="contained" color="secondary" style={{ marginBottom: 10 }}> 
                  Post a Job
                </Button>
              </Link>
              <Grid item xs={12} md={12}>
                <Paper style={{ padding: 20, marginBottom: 10 }}>
                
                  <Typography variant="h5" style={{ marginBottom: 10 }}>
                  <PersonIcon style={{ fontSize: 40,  }} />   Find the right fit for your jobs.
                  </Typography>
                  <Typography variant="body1" style={{ marginBottom: 20 }}>
                     Jobsearch.com gives your growing business access to quality talent to make
                    the right hire. Try Jobsearch.com today and find the right
                    fit for your open positions.
                  </Typography>
                </Paper>

              </Grid>
              <Grid item xs={12} md={12}>
            <Paper style={{ padding: 20, marginBottom: 10 }}>
              <Typography variant="h5" style={{ marginBottom: 10 }}>
              <HandshakeIcon style={{ fontSize: 40,  }}/> Seamless Candidate Interaction
              </Typography>
              <Typography variant="body1" style={{ marginBottom: 20 }}>
              Connect with your top picks through messaging and conduct live, virtual interviews at no cost*. Employers on Jobsearch.com report a positive rating of 93% for interviewed candidates, streamlining the hiring process.
              </Typography>
              <Typography variant="body2" color="textSecondary">
                *Terms, conditions, quality standards, and usage limits apply.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={12}>
            <Paper style={{ padding: 20, marginBottom: 10 }}>
              <Typography variant="h5" style={{ marginBottom: 10 }}>
                <WorkspacePremiumIcon style={{ fontSize: 40,  }}/>More Hires, Less Effort
              </Typography>
              <Typography variant="body1" style={{ marginBottom: 20 }}>
              With new hires made every minute*, Jobsearch.com enables you to find the right talent efficiently and grow you business.
              </Typography>
              <Typography variant="body2" color="textSecondary">
                *Data is for illustrative purposes only and not specific to
                Jobsearch.com.
              </Typography>
            </Paper>
          </Grid>
            </Paper>
          </Grid>

       

        
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
