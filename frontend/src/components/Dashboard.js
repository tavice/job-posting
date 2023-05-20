import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = ({ baseUrl }) => {

const userType = localStorage.getItem("user_type");
//Fetch the current user
const [currentUser, setCurrentUser] = useState({});
const [jobSeeker, setJobSeeker] = useState({});
const [jobListings, setJobListings] = useState([]);

//=======================================================//
//Fetch the current user the user id in the database matches the authenticated_user  id saved in local storage when logged
const fetchCurrentUser = async () => {
    try {
        const response = await axios.get(`${baseUrl}/api/user/${localStorage.getItem("authenticated_user")}`);
        const data = response.data;
        setCurrentUser(data);
        
      
    } catch (error) {
        console.log(error);
    }
};
useEffect(() => {
    fetchCurrentUser();
}, []);

console.log("current user is ", currentUser);

//=======================================================//
//Fetches all job seekers, matches the user id in the database to the current user id
const fetchJobSeeker = async () => {
    try {
        const response = await axios.get(`${baseUrl}/api/jobseekers`);
        const data = response.data;
        console.log(data)
        for (let i = 0; i < data.length; i++) {
            if(data[i].user === currentUser.id){
                
                setJobSeeker(data[i]);
            } else {
                console.log("no job seeker found")
            }
        }
      
        
    } catch (error) {
        console.log(error);
    }
};

useEffect(() => {
    fetchJobSeeker();
}, []);

console.log("job seeker is ", jobSeeker);



//=======================================================//
//render//
  return (
    <div>
        <h1>Hello {currentUser.first_name} ! </h1>
        {userType === "E" ? (
            <h1> Employer Dashboard</h1>


        ):(
            <div>
            <h2> List of the jobs oyu applied to</h2>
            <h2> List of the jobs you saved</h2>
            <h2> Profile</h2>
            <ul>
                <li>First Name: {currentUser.first_name}</li>
                <li>Last Name: {currentUser.last_name}</li>
                <li>Phone Number: {jobSeeker.phone_number}</li>
                <li>bio:{jobSeeker.bio}</li>
                <li>Location: {jobSeeker.location}</li>
            </ul>
            
            </div>
           

        )}

    </div>

  )
}

export default Dashboard