import React from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom";

//Importing Components
import Header from './components/Header';
import Footer from './components/Footer';

//Importing Pages
import Home from './pages/Home';
import EmployerList from './pages/EmployerList';
import JobListingDetail from './pages/JobListingDetail';

function App() {
  const baseUrl = 'http://127.0.0.1:8000'

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employer-job-listing" element={<EmployerList baseUrl={baseUrl} />} />
        <Route path="/job-listing-detail/:id" element={<JobListingDetail baseUrl={baseUrl}/>} />
      </Routes>
      <Footer />
 
    </div>
  );
}

export default App;
