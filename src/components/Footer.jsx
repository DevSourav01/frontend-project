import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-10 px-6 sm:px-12 lg:px-20 mt-12">
      {/* Top */}
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 md:gap-0 mb-8">
        {/* Logo */}
        <div>
          <h1 className="text-2xl font-bold text-blue-600">JobBoard</h1>
          <p className="text-sm text-gray-600 mt-2">
            The best platform to find your dream job.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-12">
          <div>
            <h2 className="font-semibold mb-3">Employer</h2>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-blue-600 cursor-pointer">Job Center</li>
              <li className="hover:text-blue-600 cursor-pointer">Blog</li>
              <li className="hover:text-blue-600 cursor-pointer">Help Center</li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold mb-3">Find Vacancy Based On</h2>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-blue-600 cursor-pointer">Job Title</li>
              <li className="hover:text-blue-600 cursor-pointer">Location</li>
              <li className="hover:text-blue-600 cursor-pointer">Company Name</li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold mb-3">Address</h2>
            <ul className="space-y-2 text-sm">
              <li>example@email.com</li>
              <li>+91 9999999999</li>
              <li>Kolkata, India</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} JobBoard. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
