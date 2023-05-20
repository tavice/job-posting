import React from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom";

//Importing Components
import Header from './components/Header';
import Footer from './components/Footer';
import Register from './components/Register';
import Login from './components/Login'; 
import HeaderUserIdentified from './components/HeaderUserIdentified';
import Dashboard from './components/Dashboard';
import AboutUs from './components/AboutUs';

//Importing Pages
import Home from './pages/Home';
import EmployerList from './pages/EmployerList';
import JobListingDetail from './pages/JobListingDetail';
import NewJobListingForm from './pages/NewJobListingForm';

function App() {
  const baseUrl = 'http://127.0.0.1:8000'

  return (
    <div className="App">
      <Header baseUrl={baseUrl}/>
      <HeaderUserIdentified />
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Job Listings" element={<EmployerList baseUrl={baseUrl} />} />
        <Route path="/Job Listings/:id" element={<JobListingDetail baseUrl={baseUrl}/>} />
        <Route path="/register" element={<Register baseUrl={baseUrl} />} />
        <Route path="/login" element={<Login baseUrl={baseUrl} />} />
        <Route path="/new-job-listing" element={<NewJobListingForm baseUrl={baseUrl} />} />
        <Route path="/dashboard" element={<Dashboard baseUrl={baseUrl} />} />
        <Route path="/About Us" element={<AboutUs />} />
      </Routes>
      <Footer />
 
    </div>
  );
}

export default App;
