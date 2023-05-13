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
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employer-job-listing" element={<EmployerList />} />
        <Route path="/job-listing-detail/:id" element={<JobListingDetail />} />
      </Routes>
      <Footer />
 
    </div>
  );
}

export default App;
