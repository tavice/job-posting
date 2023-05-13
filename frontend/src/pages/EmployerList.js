import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const EmployerList = ({ baseUrl }) => {

  //Fetch data from backend using axios and useEffect
  const [employerList, setEmployerList] = useState([]);

  const fetchEmployerList = async () => {
    const response = await axios.get(`${baseUrl}/api/employers/?format=json`);
    const data = response.data;
    setEmployerList(data);
  };

  console.log(employerList);

  useEffect(() => {
    fetchEmployerList();
  }, []);

  return (
    <div>
      <h1>Employer List</h1>
      <ul>
        {employerList.map((employer) => {
          return (
            <li key={employer.id}>
              <h2>{employer.companyname}</h2>
              <p>{employer.website}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default EmployerList;
