import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";

const Profile = ({baseUrl}) => {
      //Fetch the current user
  const [currentUser, setCurrentUser] = useState({});
  const [jobSeeker, setJobSeeker] = useState({});
 

  //=======================================================//
  //Fetch the current user the user id in the database matches the authenticated_user  id saved in local storage when logged
  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/user/${localStorage.getItem("authenticated_user")}`
      );
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
      const foundJobSeeker = data.find((item) => item.user === currentUser.id);
      if (foundJobSeeker) {
        setJobSeeker(foundJobSeeker);
      } else {
        console.log("no job seeker found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchJobSeeker();
  }, []);

  //console.log("job seeker is ", jobSeeker);
  return (
    <div>
           <ul>
              <li>First Name: {currentUser.first_name}</li>
              <li>Last Name: {currentUser.last_name}</li>
              <li>Phone Number: {jobSeeker.phone_number}</li>
              <li>bio:{jobSeeker.bio}</li>
              <li>Location: {jobSeeker.location}</li>
            </ul>
    </div>
  )
}

export default Profile