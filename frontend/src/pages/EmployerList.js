import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import { Button, Typography, Grid, Paper, Divider, CircularProgress } from "@mui/material";
import Paid from "@mui/icons-material/Paid";
import LocationOn from "@mui/icons-material/LocationOn";
import LanguageIcon from "@mui/icons-material/Language";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import PsychologyIcon from '@mui/icons-material/Psychology';

const EmployerList = ({ baseUrl }) => {
  const [employerList, setEmployerList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      const jobListings = data.reduce((acc, job) => {
        // group job listings by employer
        if (!acc[job.employer]) {
          // if the employer doesn't exist in the object yet, add it
          acc[job.employer] = []; // initialize the array
        }
        acc[job.employer].push(job); // add the job listing to the array
        return acc;
      }, {});
      setJobListings(jobListings);
      setIsLoading(false);
      
    };
    getJobListings();
  }, []);

  console.log("joblisting is ", jobListings);

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
      .filter((job) =>
        job.jobtitle.toLowerCase().includes(filter.toLowerCase())
      );
    console.log("filtered joblisting is ", filteredJobListings);
    setFilteredJobListings(filteredJobListings);
  };

  console.log("filtered joblisting is ", filteredJobListings);

  console.log("filter is ", filter);




  //truncated job description


  //=======================================================//
  // Rendering Employer List//

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
       {isLoading ? (
        <CircularProgress />
      ) : (
        <>
      <Typography
        variant="h2"
        style={{ marginBottom: 20, alignItems: "center" }}
      >
        Current Jobs Available
      </Typography>
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
        <Grid
          container
          spacing={2}
          style={{ alignItems: "center", margin: 0 }}
          key={employer.id}
        >
          <Paper
            elevation={3}
            style={{
              width: "80%",
              alignItems: "center",
              padding: 20,
              margin: " auto",
              marginBottom: 40,
            }}
          >
            <Grid
              item
              xs={12}
              sm
              container
              style={{
                justifyContent: "space-between",
                marginBottom: 20,
                marginTop: 20,
              }}
            >
              <Typography variant="h3" gutterBottom>
                {employer.companyname}
              </Typography>
              <div style={{ justifyContent: "center" }}>
                <img src={employer.logo} alt="Company Logo" height={100} />
              </div>
              <Typography variant="body1" gutterBottom>
                <LanguageIcon />{" "}
                <a
                  href={employer.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {employer.website}
                </a>
              </Typography>
              <Typography variant="body1">
                <LocationOn /> {employer.location}{" "}
              </Typography>
            </Grid>
            <Divider style={{ height: 5 }} />
            <Typography
              variant="h4"
              style={{ marginBottom: 40, marginTop: 40 }}
            >
              Open Roles:{" "}
            </Typography>
            {jobListings[employer.id] && jobListings[employer.id].length > 0 ? (
              jobListings[employer.id].map((job) => (
                <Paper
                  elevation={3}
                  style={{
                    width: "80%",
                    alignItems: "center",
                    padding: 20,
                    margin: "auto",
                    marginBottom: 20,
                  }}
                  key={job.id}
                >
                  <Typography variant="h5" style={{ marginBottom: 20 }}>
                    <Link to={`/Job Listings/${job.id}`}>{job.jobtitle}</Link>
                  </Typography>

                  <Stack direction="row" useFlexGap flexWrap="wrap" spacing={1} style={{padding:20}}>
                    <Chip icon={<LocationOn />} label={job.location} />
                    <Chip icon={<Paid />} label={job.salary} />
                    <Chip icon={<PsychologyIcon />} label={job.jobrequirements} />
                  
                  </Stack>

                  <Typography variant="body1">
                    <strong>Description:</strong> {job.description}
                  </Typography>
                </Paper>
              ))
            ) : (
              <Typography variant="body1">No job listings found.</Typography>
            )}
          </Paper>
        </Grid>
      ))}
      </>
      )}
    </Container>
  );
};

export default EmployerList;
