import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CircularProgress, Typography, Grid, Paper, Button } from "@mui/material";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import DeleteIcon from '@mui/icons-material/Delete';



const JobListingDetail = ({ baseUrl }) => {
  const { id } = useParams();
  const [jobListing, setJobListing] = useState({});
  const [employer, setEmployer] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();


  const userId = localStorage.getItem("authenticated_user");
  const userType = localStorage.getItem("user_type");
  const jobSeekerId = localStorage.getItem("jobseeker_id");
  const employerId = localStorage.getItem("employer_id");
  console.log(employerId)


  //====================================================================================================
  //fetch job listing

  const fetchJobListing = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/joblistings/${id}`);
      const data = response.data;
      setJobListing(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchJobListing();
  }, []);

  const fetchEmployer = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/employers/${jobListing.employer}`
      );
      const data = response.data;
      setEmployer(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (jobListing.employer) {
      fetchEmployer();
    }
  }, [jobListing.employer]);

  console.log('employer id is ', employer.id)

  //====================================================================================================
  //fetch current user

  const [currentUser, setCurrentUser] = useState({});
  

  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/user/${userId}`);
      const data = response.data;
      setCurrentUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, [userId]);

  //console.log(currentUser);


 
  //====================================================================================================
 //Apply for job

  const applyToJob = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/apply-for-job/`,
        {
          job_id: id,
          job_seeker_id: jobSeekerId,
        }
   
      );
   
      console.log(response.data);

      navigate("/dashboard");
    } catch (error) {
      console.log(error);

    }
  };

//====================================================================================================
//Save job

const saveJob = async () => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/save-job/`,
      {
        job_id: id,
        job_seeker_id: jobSeekerId,
      }
 
    );

    console.log(response.data);
    

    window.href = "/dashboard"
  } catch (error) {
    console.log(error);
  
  }
};


//Delete job
const deleteJob = async () => {
  try {
    const response = await axios.delete(
      `${baseUrl}/api/joblistings/${id}/`
 
    );

    console.log(response.data);
    console.log('job deleted')  
    window.href = "/dashboard"
  } catch (error) {
    console.log(error);
  
  }
}
  


  //====================================================================================================
  //render

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              {jobListing.jobtitle}
            </Typography>
            
          </Grid>
          <Grid item xs={12} sm={9}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Employer:
              </Typography>
              <Typography variant="body1" gutterBottom>
                {employer.companyname}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Location:
              </Typography>
              <Typography variant="body1" gutterBottom>
                {jobListing.location}
              </Typography>
            
           
              <Typography variant="h6" gutterBottom>
                Description:
              </Typography>
              <Typography variant="body1" gutterBottom>
                {jobListing.description}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Job Requirements:
              </Typography>
              <Typography variant="body1" gutterBottom>
                {jobListing.jobrequirements}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Salary:
              </Typography>
              <Typography variant="body1" gutterBottom>
                {jobListing.salary}
              </Typography>
            </Paper>
          </Grid>
          {userType === "J" ? ( 
          <Grid item xs={12} sm={3}>
            <Paper elevation={3} sx={{ p: 2 }} style={{display:"flex", flexDirection:"column", padding:20}}>
            <Typography variant="h6" style={{color:"black", marginTop:'20%'}}>Hey {currentUser.first_name} !</Typography>
            <Button variant="contained" color="success" style={{marginTop:'20%'}} onClick={applyToJob}>
            <AutoAwesomeIcon/> Apply for this job !
            </Button>
            <Button variant="contained" color="secondary" style={{marginTop:'20%'}} onClick ={saveJob}>
            <FavoriteBorderIcon/>  Save for later
            </Button>
            <Button variant="contained" color="primary" href="/Job Listings" style={{marginTop:'20%'}}>
            <KeyboardReturnIcon/> Back to Job Listings
            </Button>
            
            </Paper>
          </Grid>
          ) : ( (userType === "E" && parseInt(employerId) === employer.id) ? (
          
            <Grid item xs={12} sm={3}>
            <Paper elevation={3} sx={{ p: 2 }} style={{display:"flex", flexDirection:"column", padding:20}}>
            <Typography variant="h6" style={{color:"black", marginTop:'20%'}}>Hey {currentUser.first_name} !</Typography>
            <Button variant="contained" color="success" style={{marginTop:'20%', padding: '10px 20px'}} href={`update-job-offer/${id}`}>
            <AutoAwesomeIcon style={{ fontSize: 20, marginRight: 20 }}/> Edit this job !
            </Button>
            <Button variant="contained" color="secondary"  style={{marginTop:'20%'}} onClick={deleteJob}>
              <DeleteIcon/> Delete this job !
            </Button>
            <Button variant="contained" color="primary" href="/Job Listings" style={{marginTop:'20%'}}>
            <KeyboardReturnIcon/>  Back to Job Listings  
            </Button>
            
            </Paper>
          </Grid>
          
          ) : (
            <Grid item xs={12} sm={3}>
            <Paper elevation={3} sx={{ p: 2 }} style={{display:"flex", flexDirection:"column", padding:20}}>
            <Typography variant="h6" style={{color:"black", marginTop:'20%'}}>Want to learn more about this job ?</Typography>
            <Button color="primary" href="/login" style={{marginTop:'20%'}}>
              Please login  !
            </Button>
            {console.log("no content specific is shown")}
            {console.log('employer id is ', employer.id)}
            {console.log('employerId', employerId)}
           </Paper> 
          </Grid>

          ))}
        </Grid>
      )}
    </Container>
  );
};

export default JobListingDetail;
