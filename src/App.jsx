import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import RoleSelection from "./components/Pages/RoleSelection";
import Navbar from "./components/LandingPage/Navbar";
import Hero from "./components/LandingPage/Hero";
import Categories from "./components/LandingPage/Categories";
import ProfileSection from "./components/LandingPage/ProfileSection";
import HowItWorks from "./components/LandingPage/HowItWorks";
import Newsletter from "./components/LandingPage/NewsLetter";
import Footer from "./components/LandingPage/Footer";
import StudentSignup from "./components/Pages/StudentSignup";
import EmployerSignup from "./components/Pages/EmployerSignup";
import StudentLogin from "./components/Pages/StudentLogin";
import EmployerLogin from "./components/Pages/EmployerLogin";

function App() {
  return (
    <Router>
      <Routes>
        {/* 🏠 Landing Page */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Hero />
              <Categories />
              <ProfileSection />
              <HowItWorks />
              <Newsletter />
              <Footer />
            </>
          }
        />

        {/* 👥 Role Selection */}
        <Route path="/role-selection" element={<RoleSelection />} />

        {/* 👨‍🎓 Job Seeker Routes */}
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/student-signup" element={<StudentSignup />} />

        {/* 🧑‍💼 Employer Routes */}
        <Route path="/employer-login" element={<EmployerLogin />} />
        <Route path="/employer-signup" element={<EmployerSignup />} />
      </Routes>
    </Router>
  );
}

export default App;
