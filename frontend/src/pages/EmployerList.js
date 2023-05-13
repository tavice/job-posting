import { useEffect, useState } from "react";
import axios from "axios";

const EmployerList = ({ baseUrl }) => {
  const [employerList, setEmployerList] = useState([]);

  //=======================================================//
  // Fetching Employer List//
  const fetchEmployerList = async () => {
    const response = await axios.get(`${baseUrl}/api/employers/?format=json`);
    const data = response.data;
    setEmployerList(data);
  };

  useEffect(() => {
    fetchEmployerList();
  }, []);

  console.log(employerList);
  //=======================================================//
  // Fetching Job Listings//
  const fetchJobListings = async (employerId) => {
    try {
      const response = await axios.get(`${baseUrl}/api/joblistings/?employer=${employerId}`);
      const data = response.data;
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const [jobListings, setJobListings] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const jobListingsData = {};
      for (const employer of employerList) {
        const jobs = await fetchJobListings(employer.id);
        console.log(jobs);
        jobListingsData[employer.id] = jobs;
      }
      setJobListings(jobListingsData);
    };
    fetchData();
  }, [employerList]);

  console.log(jobListings);

  //=======================================================//

  return (
    <div>
      <h1>Employer List</h1>
      {employerList.map((employer) => (
        <section key={employer.id}>
          <div className="container">
            <div className="employer-info">
              <h1>{employer.companyname}</h1>
              <div className="logo-container">
                <img src={employer.logo} alt="Company Logo" />
              </div>
              <p>
                <strong>Website:</strong>{" "}
                <a href={employer.website}>{employer.companyname}</a>
              </p>
              <p>
                <strong>Location:</strong> {employer.location}
              </p>
            </div>
            <div className="job-listings">
              <h2>Job Listings</h2>
              {jobListings[employer.id] && jobListings[employer.id].length > 0 ? (
                jobListings[employer.id].map((job) => (
                  <div className="job" key={job.id}>
                    <h3>
                      <a href={`/job/${job.pk}`}>{job.jobtitle}</a>
                    </h3>
                    <p>
                      <strong>Location:</strong> {job.location}
                    </p>
                    <p>
                      <strong>Salary:</strong> {job.salary}
                    </p>
                    <p>
                      <strong>Requirements:</strong> {job.jobrequirements}
                    </p>
                    <p>
                      <strong>Description:</strong> {job.description}
                    </p>
                  </div>
                ))
              ) : (
                <p>No job listings found.</p>
              )}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default EmployerList;
