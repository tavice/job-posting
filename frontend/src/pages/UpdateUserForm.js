import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const UpdateUserForm = ({ baseUrl }) => {
  // Recover the user id type from the local storage
  const userId = localStorage.getItem('authenticated_user');
  console.log('user id is ', userId);

  

  //================================================================================================//
  // Constants to perform the fetch
  const [user, setUser] = useState({});
  const [username, setUsername] = useState('');
  const [updatedPassword, setUpdatedPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch the user
  const fetchUser = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/user/${userId}`);
      const data = response.data;
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  console.log('user is ', user);

  // Update the user
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('username is ', username);
    console.log('password is ', updatedPassword);
    try {
      const response = await axios.put(`${baseUrl}/api/update/${userId}/`, {
        username: username,
        password: updatedPassword,
      });
      const data = response.data;
      console.log('data is ', data);
      localStorage.setItem('authenticated_user', data.id);
      localStorage.setItem('user_type', data.user_type);
      window.location.reload();
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
    }
  };
  
  

  return (
    <div style={{ padding: 20 }}>
      {errorMessage && <div className="error">{errorMessage}</div>}
      <form className="form-create-job" onSubmit={handleSubmit}>
        <Typography
          variant="h4"
          style={{
            marginBottom: 20,
            alignItems: 'center',
            textTransform: 'uppercase',
            color: 'black',
          }}
        >
          UPDATE YOUR PROFILE
        </Typography>

        <TextField
          label="Enter username"
          type="text"
          id="username"
          value={username}
          variant="standard"
          style={{ marginBottom: 20, width: 200 }}
          onChange={(event) => setUsername(event.target.value)}
        />

        <TextField
          label="Enter password"
          type="password"
          id="password"
          value={updatedPassword}
          variant="standard"
          style={{ marginBottom: 20, width: 200 }}
          onChange={(event) => setUpdatedPassword(event.target.value)}
        />

        <Button type="submit">Update Profile</Button>
      </form>
    </div>
  );
};

export default UpdateUserForm;
