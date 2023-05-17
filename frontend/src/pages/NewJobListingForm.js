import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewJobListingForm = ({ baseUrl }) => {
  const [jobTitle, setJobTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [jobRequirements, setJobRequirements] = useState("");
  const [employerId, setEmployerId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [employers, setEmployers] = useState([]);

  const navigate = useNavigate();

  //================================================================//
  //Fetch all employers
  const fetchEmployers = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/employers/`);
      const data = response.data.map((employer) => {
        return { ...employer, name: employer.companyname };
      });
      setEmployers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEmployers();
  }, []);

  console.log(employers);
  //================================================================//
  // Creating a new job listing
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${baseUrl}/api/joblistings/`, {
        jobtitle: jobTitle,
        description: description,
        location: location,
        salary: salary,
        jobrequirements: jobRequirements,
        employer: employerId,
      });
      setJobTitle("");
      setDescription("");
      setLocation("");
      setSalary("");
      setJobRequirements("");
      setEmployerId("");

      console.log("Job Listing Created");
      navigate("/Job Listings");
    } catch (error) {
      console.log(error);
      setErrorMessage("There was an error creating the job listing.");
    }
  };

  return (
    <div>
      <h2>Create a New Job Listing</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="job-title">Job Title:</label>
          <input
            placeholder="Enter Job Title"
            type="text"
            id="job-title"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            placeholder="Enter Job Description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input
            placeholder="Enter Job Location"
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="salary">Salary:</label>
          <input
            placeholder="Enter Job Salary"
            type="text"
            id="salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="job-requirements">Job Requirements:</label>
          <textarea
            placeholder="Enter Job Requirements"
            id="job-requirements"
            value={jobRequirements}
            onChange={(e) => setJobRequirements(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="employer-id">Employer Name:</label>
          <select
            id="employer-id"
            value={employerId}
            onChange={(e) => setEmployerId(e.target.value)}
          >
            <option value="">--Select Employer--</option>
            {employers.map((employer) => (
              <option key={employer.id} value={employer.id}>
                {employer.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Create Job Listing</button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default NewJobListingForm;
