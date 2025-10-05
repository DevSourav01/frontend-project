// import Navbar from "./components/Navbar";
// import Hero from "./components/Hero";
// import Categories from "./components/Categories";
// import HowItWorks from "./components/HowItWorks";
// import Newsletter from "./components/NewsLetter";
// import ProfileSection from "./components/ProfileSection";
// import Footer from "./components/Footer";
// function App() {
//   return (
//     <>
//       <Navbar/>
//       <Hero/>
//       <Categories/>
//       <ProfileSection/>
//       <HowItWorks/>
//       <Newsletter/>
//       <Footer/>
//     </>
//   );
// }

// export default App;

// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import RoleSelection from "./components/RoleSelection";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<RoleSelection />} />
//         {/* placeholders for upcoming forms */}
//         <Route path="/employer-profile" element={<h1>Employer Profile Form</h1>} />
//         <Route path="/jobseeker-profile" element={<h1>Job Seeker Profile Form</h1>} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoleSelection from "./components/RoleSelection";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import ProfileSection from "./components/ProfileSection";
import HowItWorks from "./components/HowItWorks";
import Newsletter from "./components/NewsLetter";
import Footer from "./components/Footer";
import StudentSignup from "./components/Pages/StudentSignup";
import EmployerSignup from "./components/Pages/EmployerSignup";
function App() {

  return (
    <Router>
  <Routes>
    {/* Home Page */}
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

    {/* Role Selection */}
    <Route path="/role-selection" element={<RoleSelection />} />

    {/* Signup Routes */}
    <Route path="/jobseeker-profile" element={<StudentSignup />} />
    <Route path="/employer-profile" element={<EmployerSignup />} />
  </Routes>
</Router>

  );
}

export default App;