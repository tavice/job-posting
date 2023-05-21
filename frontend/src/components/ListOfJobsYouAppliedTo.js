import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";

const ListOfJobsYouAppliedTo = ({baseUrl}) => {
    console.log(baseUrl)
   
    //Fetch the current user
    const [currentUser, setCurrentUser] = useState({});
    const [jobSeeker, setJobSeeker] = useState({});
    const [jobListings, setJobListings] = useState([]);
    const [jobApplications, setJobApplications] = useState([]);
    const [filteredJobListings, setFilteredJobListings] = useState([]);
  
    //=======================================================//
    //Fetch the current user the user id in the database matches the authenticated_user  id saved in local storage when logged
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/user/${localStorage.getItem("authenticated_user")}`
        );
        const data = response.data;
        setCurrentUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    useEffect(() => {
      fetchCurrentUser();
    }, []);
  
    //console.log("current user is ", currentUser);
  
    //=======================================================//
    //Fetches all job seekers, matches the user id in the database to the current user id
    const fetchJobSeeker = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/jobseekers`);
        const data = response.data;
        const foundJobSeeker = data.find((item) => item.user === currentUser.id);
        if (foundJobSeeker) {
          setJobSeeker(foundJobSeeker);
        } else {
          console.log("no job seeker found");
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      fetchJobSeeker();
    }, []);
  
    //console.log("job seeker is ", jobSeeker);
  
    //=======================================================//
    //Fetches all job listings
    const fetchJobListings = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/joblistings`);
        const data = response.data;
        setJobListings(data);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      fetchJobListings();
    }, []);
  
    console.log("job listings are ", jobListings);
  
    //=======================================================//
    //Fetches all job applications
    const fetchJobApplications = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/jobapplications`);
        const data = response.data;
        const foundJobApplication = data.find(
          (item) => item.job_seeker === jobSeeker.id
        );
        if (foundJobApplication) {
          setJobApplications(foundJobApplication);
        } else {
          console.log("no job applications found");
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      fetchJobApplications();
    }, []);
  
    console.log("job applications are ", jobApplications);
    console.log(jobApplications.joblisting);
  
    //=======================================================//
    //Filtering Job Listings//
    const filterJobListings = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/joblistings`);
        const data = response.data;
        const filteredListings = data.filter(
          (listing) => listing.id === jobApplications.joblisting
        );
        setFilteredJobListings(filteredListings);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      if (jobApplications.joblisting) {
        filterJobListings();
      }
    }, []);
  
    console.log("filtered job listings are ", filteredJobListings);

  return (
    <div>
            {filteredJobListings.map((listing) => (
            <div key={listing.id}>
              <h3>{listing.jobtitle}</h3>
              <p>{listing.description}</p>
              <p>{listing.location}</p>
              <p>{listing.salary}</p>
            </div>
          ))}
    </div>
  )
}

export default ListOfJobsYouAppliedTo