import React from 'react'
import { useState, useEffect } from "react";

const Dashboard = ({ baseUrl }) => {

const userType = localStorage.getItem("user_type");

//Fetch job listings from the backend that match the user's job preferences

const fetchJobListings = async () => {
    const response = await fetch(`${baseUrl}/api/joblistings`);
    const data = await response.json();
    return data;
    };

    const [jobListings, setJobListings] = useState({});
    useEffect(() => {
        fetchJobListings().then((data) => {
            const jobListings = data.reduce((acc, job) => {
                if (!acc[job.employer]) {
                    acc[job.employer] = [];
                }
                acc[job.employer].push(job);
                return acc;
            }, {});
            setJobListings(jobListings);
        });
    }, []);


  return (
    <div>
        <h1>Dashboard</h1>
        {userType === "E" ? (
            <h1> Employer Dashboard</h1>


        ):(
            <h1> Job Seeker Dashboard</h1>

        )}

    </div>

  )
}

export default Dashboard