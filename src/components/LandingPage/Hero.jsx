import React from "react";
import jobHunting from "/public/assets/People-search-rafiki.svg";

const Hero = () => {
  return (
    <section className=" flex flex-col mb-0 md:flex-row items-center justify-between px-6 sm:px-8 lg:px-16 bg-gray-50">
      {/* Left Content */}
      <div className="md:w-1/2 space-y-6 text-center md:text-left">
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
          Find the job of your <span className="text-blue-700">Dreams</span>
        </h1>

        <p className="text-gray-700 text-base sm:text-lg">
          Discover thousands of career opportunities with leading companies
          worldwide.
        </p>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row items-center bg-white shadow-lg rounded-xl p-3 w-full max-w-2xl mx-auto md:mx-0 gap-3">
          <input
            type="text"
            placeholder="Job title..."
            className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition w-full sm:w-auto"
          />
          <input
            type="text"
            placeholder="Location..."
            className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition w-full sm:w-auto"
          />
          <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition w-full sm:w-auto">
            🔍 Search
          </button>
        </div>

        {/* Stats */}
        <p className="text-gray-800 text-sm sm:text-base">
          10.5k+ job vacancies available
        </p>
      </div>

      {/* Right Image */}
      <div className=" md:w-1/2 mt-8 md:mt-0 flex justify-center">
        <img
          src={jobHunting}
          alt="Job Hunt"
          className="w-3/4 sm:w-2/3  md:w-full max-w-md md:max-w-full"
        />
      </div>
    </section>
  );
};

export default Hero;
