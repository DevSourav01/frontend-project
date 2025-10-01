import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // install lucide-react if not already

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center py-4 px-6 md:px-12 shadow-md sticky top-0 bg-white z-50">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-blue-700 hover:cursor-pointer">
        JobBoard
      </h1>

      {/* Desktop Links */}
      <ul className="hidden md:flex space-x-8 text-gray-700 font-medium">
        <li><a href="#">Home</a></li>
        <li><a href="#">Employers</a></li>
        <li><a href="#">Candidates</a></li>
      </ul>

      {/* Desktop Buttons */}
      <div className="hidden md:flex space-x-4">
        <button className="px-4 py-2 border border-blue-700 text-blue-700 rounded-lg hover:bg-blue-50">
          Login
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
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
          <a href="#" className="text-gray-700 font-medium">Home</a>
          <a href="#" className="text-gray-700 font-medium">Employers</a>
          <a href="#" className="text-gray-700 font-medium">Candidates</a>
          
          <button className="px-4 py-2 border border-blue-700 text-blue-700 rounded-lg hover:bg-blue-50 w-32">
            Login
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-32">
            Sign Up
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
