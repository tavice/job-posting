import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  CircularProgress,
  Typography,
  Grid,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Button,
} from "@mui/material";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import WorkIcon from "@mui/icons-material/Work";
import PsychologyIcon from "@mui/icons-material/Psychology";
import SchoolIcon from "@mui/icons-material/School";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

const CandidatePageDetail = ({ baseUrl }) => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [jobseeker, setJobseeker] = useState({});
  const [resume, setResume] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const employerId = localStorage.getItem("employer_id");

  // Fetch user data
  const fetchUser = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/user/${id}`);
      const data = response.data;
      setUser(data);
    } catch (error) {
      console.log(error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Fetch jobseeker data
  const fetchJobseeker = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/jobseekers/`);
      const data = response.data;
      const filteredData = data.filter(
        (jobseeker) => jobseeker.user === user.id
      );
      setJobseeker(filteredData[0]);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user.id) {
      fetchJobseeker();
    }
  }, [user]);

  // Fetch resume data
  const fetchResume = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/resume/`);
      const data = response.data;
      const filteredData = data.filter(
        (resume) => resume.jobseeker === jobseeker.id
      );
      setResume(filteredData[0]);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (jobseeker.id) {
      fetchResume();
    }
  }, [jobseeker]);

  //Save candidate profile
  //Save candidate to favorites
  const saveProfile = async (jobseekerId) => {
    try {
      const response = await axios.post(`${baseUrl}/api/save-candidate/`, {
        job_seeker_id: jobseeker.id,
        employer_id: employerId,
      });
      const data = response.data;
      console.log(data);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  // Render the candidate page details
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Paper style={{ padding: 20, marginBottom: 20, height: "100%", textTransform:'uppercase' }}>
            <Typography variant="h5">
              {user.first_name} {user.last_name}
            </Typography>
          </Paper>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Paper style={{ padding: 20, marginBottom: 20 }}>
              <Typography variant="h6" style={{textTransform:'uppercase'}}>Contact Info</Typography>
                <Typography variant="body1" style={{ padding: 20}}>
                  <strong>Phone Number: </strong>
                  {jobseeker.phone}
                </Typography>
                <Typography variant="body1" style={{ padding: 20}}>
                  <strong>Email: </strong>
                  {user.email}
                </Typography>
                <Typography variant="body1" style={{ padding: 20}}>
                  <strong>Location: </strong>
                  {jobseeker.location}
                </Typography>
                <Paper style={{ padding: 20, marginTop: 20 }}>
                  <Typography variant="h6">About {user.first_name} {user.last_name}</Typography>
                  <Typography variant="body1">{jobseeker.bio}</Typography>
                </Paper>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper style={{ padding: 20, marginBottom: 20 }}>
                <Typography variant="h6" style={{textTransform:'uppercase'}}>Resume</Typography>
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                >
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <WorkIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="EXPERIENCE"
                      secondary={resume.experience}
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <PsychologyIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="SKILLS"
                      secondary={resume.skills ? resume.skills.join(", ") : ""}
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <SchoolIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="EDUCATION"
                      secondary={resume.education}
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <WorkspacePremiumIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="CERTIFICATIONS"
                      secondary={
                        resume.certifications
                          ? resume.certifications.join(", ")
                          : ""
                      }
                    />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={3}>
          <Paper style={{ padding: 20, marginBottom: 20, height: "100%" }}>
            <Typography variant="h5" style={{marginBottom:20}}>
              Do you like this candidate? Hire them!
            </Typography>
            <Grid item xs={12} sm={3}>
              <Paper
                elevation={3}
                sx={{ p: 2 }}
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  padding: 20,
                }}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  style={{}}
                  onClick={saveProfile}
                >
                  <FavoriteBorderIcon /> Save Candidate's Profile
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  href="/find-candidates"
                  style={{}}
                >
                  <KeyboardReturnIcon /> Back to Candidates List
                </Button>
              </Paper>
            </Grid>
          </Paper>
          </Grid>
        </>
      )}
    </Container>
  );
};

export default CandidatePageDetail;
