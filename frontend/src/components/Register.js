import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = ({ baseUrl }) => {

    const navigate = useNavigate();

    //================================================================//
    // Registering a new user
  const [formData, setFormData] = useState({
    password: "",
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    user_type: "",
  });

  const { password, username, email, first_name, last_name, user_type } =
    formData;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      password,
      username,
      email,
      first_name,
      last_name,
      user_type,
    };

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify(newUser);

      const res = await axios.post(`${baseUrl}/api/users/`, body, config);

      console.log(res.data);
        navigate("/");
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username: </label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email: </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <div>
            <label>Password: </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              required
            />
          </div>

          <label>First Name: </label>
          <input
            type="text"
            name="first_name"
            value={first_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Last Name: </label>
          <input
            type="text"
            name="last_name"
            value={last_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>User Type: </label>
          <select
            name="user_type"
            value={user_type}
            onChange={handleChange}
            required
          >
            <option value="">Select User Type</option>
            <option value="E">Employer</option>
            <option value="J">Job Seeker</option>
          </select>
        </div>

        <input type="submit" value="Register" />
      </form>
    </div>
  );
};

export default Register;
