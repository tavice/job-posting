import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const JobListingDetail = ({ baseUrl }) => {
  const { id } = useParams();
  const [jobListing, setJobListing] = useState({});
  const [employer, setEmployer] = useState({});
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  //=======================================================//
  // Fetching Job Listing//
  useEffect(() => {
    const fetchUser = async () => {
      if (user.is_authenticated) {
        try {
          const response = await axios.get(
            `${baseUrl}/api/users/${user.profile.user}`
          );
          const data = response.data;
          setUser(data);
        } catch (error) {
          console.log(error);
          // Display a friendly error message to the user
        }
      }
    };
    fetchUser();
  }, [user]);

  console.log(user);

  //=======================================================//
  // Fetching Employer//

  const fetchEmployer = async () => {
    const response = await axios.get(
      `${baseUrl}/api/employers/${jobListing.employer}`
    );
    const data = response.data;
    setEmployer(data);
  };

  useEffect(() => {
    fetchEmployer();
  }, []);

  console.log(employer);

  //=======================================================//
  //Fetching User//

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/users/${user.id}/`);
        const data = response.data;
        setUser(data);
      } catch (error) {
        console.log(error);
        // Display a friendly error message to the user
      }
    };
    if (user && user.is_authenticated) { // Add null check before calling axios.get()
      fetchUser();
    }
  }, [user]);
  
  //=======================================================//
  // Delete Job Listing//

  const deleteJobListing = async () => {
    const response = await axios.delete(
      `${baseUrl}/api/joblistings/${id}`
    );
    const data = response.data;
    console.log(data);
    navigate(`/employer-job-listing`);
  };

  const handleDelete = () => {
    deleteJobListing();
  };

  return (
    <div className="job-listing-detail">
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
      <section className="employer-details">
        {user.is_authenticated ? (
          user.profile.role === "employer" ? (
            <div>
              <p>This is an employer account.</p>
              <a href={`/joblisting/${jobListing.id}/update`}>
                Update Job Listing
              </a>
              <form onSubmit={handleDelete}>
                <button type="submit">Delete Job Listing</button>
              </form>
              <div>
                <button onClick={() => navigate("/employer/list")}>
                  Back to Employer List
                </button>
                
              </div>
              <button onClick={() => navigate("/joblisting/list")}>
                Back to Job Listing List
              </button>
              <button onClick={() => navigate("/employer/list")}>
                Back to Employer Listing List
              </button>
            </div>
          ) : (
            <div>
              <button>Apply Now</button>
              <button onClick={() => navigate("/joblisting/list")}>
                Back to Job Listing List
              </button>
              <button onClick={() => navigate("/employer/list")}>
                Back to Employer Listing List
              </button>
            </div>
          )
        ) : (
          <div>
            <p>You need to log in to apply for this job.</p>
            <button onClick={() => navigate("/login")}>Log In</button>
            <button onClick={() => navigate("/joblisting/list")}>
              Back to Job Listing List
            </button>
            <button onClick={() => navigate("/employer/list")}>
              Back to Employer Listing List
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default JobListingDetail;
