import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const JobListingDetail = ({ baseUrl }) => {
  const { id } = useParams()
  const [jobListing, setJobListing] = useState({})
  const [employer, setEmployer] = useState({})

 const fetchJobListing = async () => {
    const response = await axios.get(`${baseUrl}/api/joblistings/${id}`)
    const data = response.data
    setJobListing(data)
  }
 

  useEffect(() => {
    fetchJobListing()
  }, [])

  console.log(jobListing)




  return (
    <div>
      <h1>{jobListing.jobtitle}</h1>
      <h3>{jobListing.location}</h3>
      <h4>{jobListing.salary}</h4>
      <p>{jobListing.description}</p>
      
    </div>
  )
}

export default JobListingDetail