import React from 'react'
import axios from "axios";
import { useState, useEffect } from "react";

const Resume = ({baseUrl}) => {
    const userType = localStorage.getItem("user_type");
    const jobSeekerId = localStorage.getItem("jobseeker_id");
    const [resumes, setResumes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    console.log('jobseeker id is', jobSeekerId);

    // Fetch all the resumes and then filter to show only the resumes with the jobseeker id
    const fetchResumes = async () => {
        try {
          const response = await axios.get(`${baseUrl}/api/resume`);
          const data = response.data;
          console.log(data);
          const filteredResumes = data.filter((resume) =>
            resume.jobseeker === parseInt(jobSeekerId) //remember to parseInt it because it is a string in local storage
          );
          setResumes(filteredResumes);
          console.log(filteredResumes);
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
    }
    
    useEffect(() => {
        fetchResumes();
    }, []);
    
    console.log('resumes are', resumes);

    return (
        <div>Resume</div>
    )
}

export default Resume
