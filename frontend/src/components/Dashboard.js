import React from "react";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import Paper from "@mui/material/Paper";

import Typography from "@mui/material/Typography";

//Import components
import ListOfJobsYouAppliedTo from "./ListOfJobsYouAppliedTo";
import ListOfJobsYouPosted from "./ListOfJobsYouPosted";
import ListOfJobsYouSaved from "./ListOfJobsYouSaved";
import Profile from "./Profile";
import Resume from "./Resume";

const Dashboard = ({ baseUrl }) => {
  const userType = localStorage.getItem("user_type");

  return (
    <div>
      {userType === "E" ? (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <Profile baseUrl={baseUrl} />
              </Paper>
            </Grid>

            <Grid item xs={12} md={8} lg={9}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 240,
                }}
              >
                <Typography variant="h4" style={{ marginBottom: 10 }}>
                  {" "}
                  List of the jobs you posted
                </Typography>
                <ListOfJobsYouPosted baseUrl={baseUrl} />
              </Paper>
            </Grid>

            <Grid item xs={12} md={4} lg={3}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 240,
                }}
              >
                <Typography variant="h4" style={{ marginBottom: 10 }}>
                  {" "}
                  List of the candidates you liked
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      ) : (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <Profile baseUrl={baseUrl} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 240,
                }}
              >
                <Typography variant="h4" style={{ marginBottom: 10 }}>
                  {" "}
                  Your Resume
                  <Resume baseUrl={baseUrl} />
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6} lg={7}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 240,
                }}
              >
                <Typography variant="h4" style={{ marginBottom: 10 }}>
                  {" "}
                  List of the jobs you applied to
                </Typography>
                <ListOfJobsYouAppliedTo baseUrl={baseUrl} />
              </Paper>
            </Grid>

            <Grid item xs={12} md={6} lg={5}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 240,
                }}
              >
                <Typography variant="h4" style={{ marginBottom: 10 }}>
                  {" "}
                  List of the jobs you saved
                  <ListOfJobsYouSaved baseUrl={baseUrl} />
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      )}
    </div>
  );
};

export default Dashboard;
