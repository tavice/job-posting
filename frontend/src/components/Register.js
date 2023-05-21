import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Register = ({ baseUrl }) => {
  const navigate = useNavigate();

  // Initial form state
  const [formData, setFormData] = useState({
    password: "",
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    user_type: "",
    bio: "",
    location: "",
    phone: "",
    companyname: "",
    website: "",
    logo: "",
  });

  const {
    password,
    username,
    email,
    first_name,
    last_name,
    user_type,
    bio,
    location,
    phone,
    companyname,
    website,
    logo,
  } = formData;

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();

  // Remove empty fields from newUser object
  const newUser = {
    password,
    username,
    email,
    first_name,
    last_name,
    user_type,
    ...(bio && { bio }), // Only include bio field if it is not empty
    ...(location && { location }), // Only include location field if it is not empty
    ...(phone && { phone }), // Only include phone field if it is not empty
    ...(companyname && { companyname }), // Only include companyname field if it is not empty
    ...(website && { website }), // Only include website field if it is not empty
    ...(logo && { logo }), // Only include logo field if it is not empty
  };

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify(newUser);

    const res = await axios.post(`${baseUrl}/api/register/`, body, config);

    console.log(res.data);
    navigate("/Home");
  } catch (err) {
    console.error(err.response.data);
  }
};


  // Additional fields for Job Seeker
  const renderJobSeekerFields = () => {
    return (
      <>
        <TextField
          label="Bio"
          type="text"
          name="bio"
          value={bio}
          variant="standard"
          style={{ marginBottom: 20, width: 200 }}
          onChange={handleChange}
        />

        <TextField
          label="Location"
          type="text"
          name="location"
          value={location}
          variant="standard"
          style={{ marginBottom: 20, width: 200 }}
          onChange={handleChange}
        />

        <TextField
          label="Phone"
          type="text"
          name="phone"
          value={phone}
          variant="standard"
          style={{ marginBottom: 20, width: 200 }}
          onChange={handleChange}
        />
      </>
    );
  };

  // Additional fields for Employer
  const renderEmployerFields = () => {
    return (
      <>
        <TextField
          label="Company Name"
          type="text"
          name="companyname"
          value={companyname}
          variant="standard"
          style={{ marginBottom: 20, width: 200 }}
          onChange={handleChange}
        />

        <TextField
          label="Website"
          type="text"
          name="website"
          value={website}
          variant="standard"
          style={{ marginBottom: 20, width: 200 }}
          onChange={handleChange}
        />

        <TextField
          label="Logo"
          type="text"
          name="logo"
          value={logo}
          variant="standard"
          style={{ marginBottom: 20, width: 200 }}
          onChange={handleChange}
        />

        <TextField
          label="Location"
          type="text"
          name="location"
          value={location}
          variant="standard"
          style={{ marginBottom: 20, width: 200 }}
          onChange={handleChange}
        />
        <TextField
          label="Phone Number"
          type="text"
          name="phone"
          value={phone}
          variant="standard"
          style={{ marginBottom: 20, width: 200 }}
          onChange={handleChange}
        />
      </>
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <form
        className="form-create-job"
        onSubmit={handleSubmit}
        style={{ padding: 20 }}
      >
        <Typography
          variant="h4"
          style={{
            marginBottom: 20,
            alignItems: "center",
            textTransform: "uppercase",
            color: "black",
          }}
        >
          Register
        </Typography>

        <TextField
          label="Username"
          type="text"
          name="username"
          value={username}
          variant="standard"
          style={{ marginBottom: 20, width: 200 }}
          onChange={handleChange}
          required
        />

        <TextField
          label="Email"
          type="email"
          name="email"
          value={email}
          variant="standard"
          style={{ marginBottom: 20, width: 200 }}
          onChange={handleChange}
          required
        />

        <TextField
          label="Password"
          type="password"
          name="password"
          value={password}
          variant="standard"
          style={{ marginBottom: 20, width: 200 }}
          onChange={handleChange}
          required
        />

        <TextField
          label="First Name"
          type="text"
          name="first_name"
          value={first_name}
          variant="standard"
          style={{ marginBottom: 20, width: 200 }}
          onChange={handleChange}
        />

        <TextField
          label="Last Name"
          type="text"
          name="last_name"
          value={last_name}
          variant="standard"
          style={{ marginBottom: 20, width: 200 }}
          onChange={handleChange}
        />

        <FormControl>
          <FormLabel>User Type: </FormLabel>
          <Select
            name="user_type"
            value={user_type}
            onChange={handleChange}
            required
            style={{ marginBottom: 20, width: 200 }}
          >
            <MenuItem value="">Select User Type</MenuItem>
            <MenuItem value="E">Employer</MenuItem>
            <MenuItem value="J">Job Seeker</MenuItem>
          </Select>
        </FormControl>

        {user_type === "J" && renderJobSeekerFields()}
        {user_type === "E" && renderEmployerFields()}

        <Button type="submit" variant="contained" color="primary">
          Register
        </Button>
      </form>
    </div>
  );
};

export default Register;
