import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Make sure: npm install lucide-react

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="flex justify-between items-center py-4 px-6 md:px-12 shadow-md sticky top-0 bg-white z-50">
      {/* Logo */}
      <h1
        className="text-2xl font-bold text-blue-700 hover:cursor-pointer"
        onClick={() => navigate("/")}
      >
        JobBoard
      </h1>

      {/* Desktop Links */}
      <ul className="hidden md:flex space-x-8 text-gray-700 font-medium">
        <li className="hover:text-blue-600">
          <Link to="/">Home</Link>
        </li>
        {/* <li className="hover:text-blue-600">
          <Link to="/employer-profile">Employers</Link>
        </li>
        <li className="hover:text-blue-600">
          <Link to="/jobseeker-profile">Candidates</Link>
        </li> */}
      </ul>

      {/* Desktop Buttons */}
      <div className="hidden md:flex space-x-4">
        <button
          onClick={() => navigate("/role-selection")}
          className="px-4 py-2 border border-blue-700 text-blue-700 rounded-lg hover:bg-blue-50 cursor-pointer"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/role-selection")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
        >
          Sign Up
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-gray-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center space-y-4 py-6 md:hidden">
          <Link
            to="/"
            className="text-gray-700 font-medium"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          {/* <Link
            to="/employer-profile"
            className="text-gray-700 font-medium"
            onClick={() => setIsOpen(false)}
          >
            Employers
          </Link>
          <Link
            to="/jobseeker-profile"
            className="text-gray-700 font-medium"
            onClick={() => setIsOpen(false)}
          >
            Candidates
          </Link> */}

          <button
            onClick={() => {
              navigate("/role-selection");
              setIsOpen(false);
            }}
            className="px-4 py-2 border border-blue-700 text-blue-700 rounded-lg hover:bg-blue-50 w-32"
          >
            Login
          </button>
          <button
            onClick={() => {
              navigate("/role-selection");
              setIsOpen(false);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-32"
          >
            Sign Up
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
