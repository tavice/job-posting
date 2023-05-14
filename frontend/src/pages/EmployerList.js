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
  const fetchJobListings = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/joblistings`);
     
      const data = response.data;
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  //=======================================================//
  // once we have the job listings, we need to group them by employer
  // that means we need to create a new object where the keys are the employer ids
  // and the values are the job listings for that employer


  const [jobListings, setJobListings] = useState({});
  useEffect(() => {
    const getJobListings = async () => {
      const data = await fetchJobListings(); // fetch job listings
      const jobListings = data.reduce((acc, job) => { // group job listings by employer
        if (!acc[job.employer]) { // if the employer doesn't exist in the object yet, add it
          acc[job.employer] = []; // initialize the array
        }
        acc[job.employer].push(job); // add the job listing to the array
        return acc;
      }, {});
      setJobListings(jobListings);
    };
    getJobListings();
  }, []);

  console.log('joblisting is ', jobListings);

  //=======================================================//
  // Filtering Job Listings//

  const [filter, setFilter] = useState("");
  const [filteredJobListings, setFilteredJobListings] = useState([]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);

  };

  const handleFilterSubmit = (event) => {
    event.preventDefault();
    const filteredJobListings = Object.values(jobListings)
      .flatMap((jobs) => jobs)
      .filter((job) => job.jobtitle.toLowerCase().includes(filter.toLowerCase()));
      console.log('filtered joblisting is ', filteredJobListings);
    setFilteredJobListings(filteredJobListings);
  };


  
  console.log('filtered joblisting is ', filteredJobListings);
  




  console.log('filter is ', filter);


  //=======================================================//
  // Rendering Employer List//

  return (
    <div>
      <h1>Employer List</h1>
      <div className="filter-container">
        <label htmlFor="filter">Search Job Title:</label>
        <input
          type="text"
          id="filter"
          value={filter}
          onChange={handleFilterChange}

        />
      </div>
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
