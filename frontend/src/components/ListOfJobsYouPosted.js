import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

const ListOfJobsYouPosted = ({ baseUrl }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [employer, setEmployer] = useState(null);
  const [jobListings, setJobListings] = useState([]);
  const [filteredJobListings, setFilteredJobListings] = useState([]);

  useEffect(() => {
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
          console.log("Employer not found");
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
    const filteredJobListings = jobListings.filter(
      (item) => item.employer === (employer ? employer.id : null)
    );
    setFilteredJobListings(filteredJobListings);
  }, [employer, jobListings]);

  //console.log("filtered job listings are", filteredJobListings);

  //=======================================================//
  //Styling//

  const StyledLink = styled(Link)`
    color: #000;

    text-transform: uppercase;
    font-size: 1.2rem;
    margin: 0 1rem;
  `;

  //=======================================================//
  //Render//

  return (
    <div>
      <div>
        {filteredJobListings.length === 0 ? (
          <Typography>You have not posted any jobs yet</Typography>
        ) : (
          <div>
            {filteredJobListings.map((listing) => (
              <div key={listing.id}>
                <Typography>
                  {" "}
                  <StyledLink to={`/Job Listings/${listing.id}`}>
                    {listing.jobtitle}{" "}
                  </StyledLink>
                </Typography>
              </div>
            ))}
          </div>
        )}
      </div>
      <Button component={Link} to="/create-your-job-offer">Create your next Job Offer !</Button>
    </div>
  );
};

export default ListOfJobsYouPosted;
