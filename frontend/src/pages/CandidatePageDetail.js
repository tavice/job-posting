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
} from "@mui/material";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import WorkIcon from "@mui/icons-material/Work";
import PsychologyIcon from "@mui/icons-material/Psychology";
import SchoolIcon from "@mui/icons-material/School";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

const CandidatePageDetail = ({ baseUrl }) => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [jobseeker, setJobseeker] = useState({});
  const [resume, setResume] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  // Render the candidate page details
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Paper style={{ padding: 20, marginBottom: 20 }}>
            <Typography variant="h5">
              {user.first_name} {user.last_name}
            </Typography>
            <Typography variant="body1" ><strong>Phone Number: </strong>{jobseeker.phone}</Typography>
            <Typography variant="body1" ><strong>Email: </strong>{user.email}</Typography>
            <Typography variant="body1" ><strong>Location: </strong>{jobseeker.location}</Typography>
            <Paper style={{ padding: 20, marginTop: 20 }}>
              <Typography variant="h6">About Me</Typography>
              <Typography variant="body1">{jobseeker.bio}</Typography>
              </Paper>
          </Paper>
          <Paper>
            <Typography variant="h6">Resume</Typography>
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
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
        </>
      )}
    </Container>
  );
};

export default CandidatePageDetail;
