import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListOfJobsYouPosted = ({ baseUrl }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [employer, setEmployer] = useState(null);
  const [jobListings, setJobListings] = useState([]);
  const [filteredJobListings, setFilteredJobListings] = useState([]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/user/${localStorage.getItem('authenticated_user')}`);
        const data = response.data;
        setCurrentUser(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    const fetchEmployer = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/employers`);
        const data = response.data;
        const foundEmployer = data.find((item) => item.user === currentUser.id);
        if (foundEmployer) {
          setEmployer(foundEmployer);
        } else {
          console.log('Employer not found');
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchEmployer();
  }, [currentUser]);

  useEffect(() => {
    const fetchJobListings = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/joblistings`);
        const data = response.data;
        setJobListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchJobListings();
  }, []);

  useEffect(() => {
    const filteredJobListings = jobListings.filter((item) => item.employer === (employer ? employer.id : null));
    setFilteredJobListings(filteredJobListings);
  }, [employer, jobListings]);

  console.log('filtered job listings are', filteredJobListings);

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
  );
};

export default ListOfJobsYouPosted;
