import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";


const Resume = ({ baseUrl }) => {
  //const userType = localStorage.getItem("user_type");
  const jobSeekerId = localStorage.getItem("jobseeker_id");
  const [resumes, setResumes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("jobseeker id is", jobSeekerId);

  // Fetch all the resumes and then filter to show only the resumes with the jobseeker id
  const fetchResumes = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/resume`);
      const data = response.data;
      console.log(data);
      const filteredResumes = data.filter(
        (resume) => resume.jobseeker === parseInt(jobSeekerId) //remember to parseInt it because it is a string in local storage
      );
      setResumes(filteredResumes);
      console.log(filteredResumes);
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

  console.log("resumes are", resumes);

  //====================================================================================================
  //render resume

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (resumes.length === 0) {
    return <div>No resumes</div>;
  }

  if (resumes.length > 0) {
    return (
      <div>
        {resumes.map((resume) => {
          return (
            <div key={resume.id}>
              <Divider style={{ padding: 10 }}>
                <Chip label="EXPERIENCE" />
              </Divider>
              <Typography>{resume.experience}</Typography>
              <Divider style={{ padding: 10 }}>
                <Chip label="SKILLS" />
              </Divider>
              <Typography>{resume.skills}</Typography>
              <Divider style={{ padding: 10 }}>
                <Chip label="EDUCATION" />
              </Divider>
              <Typography>{resume.education}</Typography>
              <Divider style={{ padding: 10 }}>
                <Chip label="CERTIFICATIONS" />
              </Divider>
              <Typography>{resume.certifications}</Typography>
            </div>
          );
        })}
      </div>
    );
  }
};

export default Resume;
