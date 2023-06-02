import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const CreateYourResume = ({ baseUrl }) => {
  const jobSeekerId = localStorage.getItem('jobseeker_id');
  const userType = localStorage.getItem('user_type');
  const [education, setEducation] = useState('');
  const [experience, setExperience] = useState('');
  const [skills, setSkills] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${baseUrl}/api/resume/`, {
        education: education,
        experience: experience,
        skills: skills,
        certifications: certifications,
        jobseeker: jobSeekerId,
      });
      setEducation('');
      setExperience('');
      setSkills([]);
      setCertifications([]);
      console.log('Resume created successfully');
      navigate('/dashboard');
    } catch (error) {
      setErrorMessage('There was an error creating your resume');
    }
  };

  console.log('education is', education);
  console.log('experience is', experience);
  console.log('skills are', skills);
  console.log('certifications are', certifications);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {userType === 'J' ? (
        <>
          {errorMessage && (
            <Typography variant="h6" color="error">
              {errorMessage}
            </Typography>
          )}
          <form
            className="form-create-job"
            onSubmit={handleFormSubmit}
            style={{ padding: 20, width: '50%' }}
          >
            <Typography
              variant="h4"
              style={{
                marginBottom: 20,
                alignItems: 'center',
                textTransform: 'uppercase',
                color: 'black',
              }}
            >
              Create Your Resume!
            </Typography>
            <TextField
              required
              label="Education"
              type="text"
              id="education"
              value={education}
              variant="standard"
              style={{ marginBottom: 20, width: '90%' }}
              onChange={(e) => setEducation(e.target.value)}
            />

            <TextField
              required
              label="Experience"
              type="text"
              id="experience"
              multiline
              value={experience}
              variant="standard"
              style={{ marginBottom: 20, width: '90%' }}
              onChange={(e) => setExperience(e.target.value)}
            />

            <TextField
              required
              label="Skills"
              type="text"
              id="skills"
              variant="standard"
              style={{ marginBottom: 20, width: '90%' }}
              value={skills.join(',')}
              onChange={(e) => setSkills(e.target.value.split(','))}
            />

            <TextField
              required
              label="Enter Certifications"
              type="text"
              id="certifications"
              variant="standard"
              style={{ marginBottom: 20, width: '90%' }}
              value={certifications.join(',')}
              onChange={(e) => setCertifications(e.target.value.split(','))}
            />

            <Button variant="contained" type="submit">
              Create Your Resume!
            </Button>
            {errorMessage && <p>{errorMessage}</p>}
          </form>
        </>
      ) : (
        <Typography variant="h6" color="error">
          You are not authorized to access this page. Please log in as a JobSeeker.
        </Typography>
      )}
    </Container>
  );
};

export default CreateYourResume;
