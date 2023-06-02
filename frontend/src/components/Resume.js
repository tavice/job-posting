import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import PsychologyIcon from '@mui/icons-material/Psychology';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import Divider from "@mui/material/Divider";

const Resume = ({ baseUrl }) => {
  const jobSeekerId = localStorage.getItem("jobseeker_id");
  const [resumes, setResumes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchResumes = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/resume`);
      const data = response.data;
      const filteredResumes = data.filter(
        (resume) => resume.jobseeker === parseInt(jobSeekerId)
      );
      setResumes(filteredResumes);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (resumes.length === 0) {
    return <div>No resumes</div>;
  }

  return (
    <div>
      {resumes.map((resume) => (
        <List key={resume.id} sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
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
              secondary={resume.skills.join(", ")}
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
              secondary={resume.certifications.join(", ")}
            />
          </ListItem>
        </List>
      ))}
    </div>
  );
};

export default Resume;
