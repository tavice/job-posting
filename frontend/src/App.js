import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";

//Importing Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Register from "./components/Register";
import Login from "./components/Login";
import HeaderUserIdentified from "./components/HeaderUserIdentified";
import Dashboard from "./components/Dashboard";

//Importing Pages
import Home from "./pages/Home";
import EmployerList from "./pages/EmployerList";
import JobListingDetail from "./pages/JobListingDetail";

import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import UpdateUserForm from "./pages/UpdateUserForm";
import DeleteUserForm from "./pages/DeleteUserForm";
import ApplyToJob from "./pages/ApplyToJob";
import CreateYourJobOffer from "./pages/CreateYourJobOffer";
import OfferGPT from "./pages/OfferGPT";

function App() {
  const baseUrl = "http://127.0.0.1:8000";

  return (
    <div className="App">
      <Header baseUrl={baseUrl} />
      <HeaderUserIdentified />
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route
          path="/Job Listings"
          element={<EmployerList baseUrl={baseUrl} />}
        />
        <Route
          path="/Job Listings/:id"
          element={<JobListingDetail baseUrl={baseUrl} />}
        />
        <Route path="/register" element={<Register baseUrl={baseUrl} />} />
        <Route path="/login" element={<Login baseUrl={baseUrl} />} />

        <Route path="/dashboard" element={<Dashboard baseUrl={baseUrl} />} />
        <Route path="/About Us" element={<AboutUs />} />
        <Route path="/Contact Us" element={<ContactUs />} />
        <Route
          path="/update-user"
          element={<UpdateUserForm baseUrl={baseUrl} />}
        />
        <Route
          path="/delete-user"
          element={<DeleteUserForm baseUrl={baseUrl} />}
        />
        <Route
          path="create-your-job-offer"
          element={<CreateYourJobOffer baseUrl={baseUrl} />}
        />
        <Route path="offer-gpt" element={<OfferGPT baseUrl={baseUrl} />} />
        <Route path="apply-to-job" element={<ApplyToJob baseUrl={baseUrl} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
