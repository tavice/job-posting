import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListOfJobsYouAppliedTo = ({ baseUrl }) => {
  const [jobApplications, setJobApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const jobSeekerId = localStorage.getItem('jobseeker_id');
  console.log('jobSeekerId is ', jobSeekerId);

  //=================================================================//
  //fetch job applications associated with job seeker

  const fetchJobApplications = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/jobapplications`);
      const data = response.data;
      console.log('data is ', data);

      const filteredListings = data.filter(
        (item) => item.job_seeker === parseInt(jobSeekerId)
      );
      setJobApplications(filteredListings);
      setIsLoading(false);
      console.log('filtered listings are ', filteredListings);
      console.log('job applications are ', jobApplications);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  console.log('jobApplications are', jobApplications);

  

  useEffect(() => {
    fetchJobApplications();
  }, []);

  //=================================================================//
  //fetch job listings associated with job applications

  const [jobListings, setJobListings] = useState([]);

  const fetchJobListings = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/joblistings`);
      const data = response.data;
      const filteredListings = data.filter((listing) =>
        jobApplications.some((application) => application.job_listing === listing.id)
      );
      setJobListings(filteredListings);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (jobApplications.length > 0) {
      fetchJobListings();
    }
  }, [jobApplications]);


  console.log(jobListings);
  //=================================================================//


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {jobListings.map((listing) => (
        <div key={listing.id}>
          <h3>{listing.jobtitle}</h3>
          <p>{listing.description}</p>
          <p>{listing.location}</p>
          <p>{listing.salary}</p>
        </div>
      ))}
    </div>
  );
};

export default ListOfJobsYouAppliedTo;
