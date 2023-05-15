import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material"; // import CircularProgress from Material UI

const JobListingDetail = ({ baseUrl }) => {
  const { id } = useParams();
  const [jobListing, setJobListing] = useState({});
  const [employer, setEmployer] = useState({});
  const [isLoading, setIsLoading] = useState(true); // add state for loading
  //const navigate = useNavigate();

  console.log('id is', id);
  
  //=======================================================//
  // Fetching Job Listing//
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

  console.log(jobListing);
  console.log('employer id is', jobListing.employer);

  //=======================================================//
  // Fetching Employer//

  const fetchEmployer = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/employers/${jobListing.employer}`
      );
      const data = response.data;
      setEmployer(data);
      setIsLoading(false); // set loading state to false after data is fetched
    } catch (error) {
      console.log(error);
      
    }
  };

  useEffect(() => {
    if (jobListing.employer) { // only fetch employer if the job listing has an employer id useful to avoid errors
      fetchEmployer();
    }
  }, [jobListing.employer]);

  console.log(employer);

  return (
    <div className="job-listing-detail">
      {isLoading ? ( // render loading spinner when loading state is true
        <CircularProgress />
      ) : (
        <section className="job-details">
          <h1 className="job-title">{jobListing.jobtitle}</h1>
          <p className="employer-name">
            <strong>Employer: </strong>
            {employer.companyname}
          </p>
          <p className="job-description">
            <strong>Description: </strong>
            {jobListing.description}
          </p>
          <p className="job-location">
            <strong>Location: </strong>
            {jobListing.location}
          </p>
          <p className="job-salary">
            <strong>Salary: </strong>
            {jobListing.salary}
          </p>
          <p className="job-requirements">
            <strong>Job Requirements: </strong>
            {jobListing.jobrequirements}
          </p>
        </section>
      )}
    </div>
  );
};

export default JobListingDetail;
