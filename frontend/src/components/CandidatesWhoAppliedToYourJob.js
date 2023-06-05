import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

const CandidatesWhoAppliedToYourJob = ({ baseUrl }) => {
  const [jobApplications, setJobApplications] = useState([]);
  const [jobListings, setJobListings] = useState([]);
  const [jobSeekers, setJobSeekers] = useState([]);
  const [user, setUser] = useState({});

  // Get employer id
  const employerId = localStorage.getItem("employer_id");

  // Fetch all the job listings
  const fetchJobListings = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/joblistings`);
      const data = response.data;
      const filteredJobListings = data.filter(
        (jobListing) => jobListing.employer === parseInt(employerId)
      );
      setJobListings(filteredJobListings);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchJobListings();
  }, []);

  console.log('job listing is', jobListings);

  // Fetch job applications for each job listing
  const fetchJobApplications = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/jobapplications`);
      const data = response.data;
      console.log(data);
  
      const filteredJobApplications = data.filter((jobApplication) =>
        jobListings.some((jobListing) => jobListing.id === jobApplication.job_listing)
      );
      
      setJobApplications(filteredJobApplications);
    } catch (error) {
      console.log(error);
    }
  };
  

    useEffect(() => {
        fetchJobApplications();
    }, [jobListings]);

    console.log('job application is', jobApplications);

    //fetch job seeker associated with each job application
    const fetchJobSeekers = async () => {
        try {
            const response = await axios.get(`${baseUrl}/api/jobseekers`);
            const data = response.data;
            const filteredJobSeekers = data.filter((jobSeeker) =>
                jobApplications.some((jobApplication) => jobApplication.job_seeker === jobSeeker.id)
            );
            setJobSeekers(filteredJobSeekers);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchJobSeekers();
    }, [jobApplications]);

    console.log('job seeker is', jobSeekers);


    //fetch user associated with each job seeker
    const fetchUser = async () => {
        try {
            const response = await axios.get(`${baseUrl}/api/user`);
            const data = response.data;
            const filteredUser = data.filter((user) =>
                jobSeekers.some((jobSeeker) => jobSeeker.user === user.id)
            );
            setUser(filteredUser);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [jobSeekers]);

    console.log('user is', user);



  return <div>CandidatesWhoAppliedToYourJob</div>;
};

export default CandidatesWhoAppliedToYourJob;
