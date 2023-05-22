import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";

const ListOfJobsYouPosted = ({baseUrl}) => {
//recover info from local storage

const userType = localStorage.getItem("user_type");
const userId = localStorage.getItem("authenticated_user");

//employer associated with the user
const [employer, setEmployer] = useState({});
const [jobListings, setJobListings] = useState([]);
const [filteredJobListings, setFilteredJobListings] = useState([]);

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

//console.log("job listings are ", jobListings);

//Fetches all employers
const fetchEmployers = async () => {
    try {
        const response = await axios.get(`${baseUrl}/api/employers`);
        const data = response.data;
        setEmployer(data);
    } catch (error) {
        console.log(error);
    }
};

useEffect(() => {
    fetchEmployers();
}, []);

//console.log("employers are ", employer);

//Filter job listings by employer
useEffect(() => {
    const filteredJobListings = jobListings.filter(
        (item) => item.employer === employer.id
    );
    setFilteredJobListings(filteredJobListings);
}, [employer]);

console.log("filtered job listings are ", filteredJobListings);

  return (
    <div>

    </div>
  )
}

export default ListOfJobsYouPosted