import React from "react";

const Hero = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-6 sm:px-8 lg:px-16 py-10 bg-gray-50">
      {/* Left Content */}
      <div className="md:w-1/2 space-y-6 text-center md:text-left">
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
          Find the job of your <span className="text-blue-700">Dreams</span>
        </h1>

        <p className="text-gray-700 text-base sm:text-lg">
          Discover thousands of career opportunities with leading companies worldwide.
        </p>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row items-center bg-white shadow-md rounded-lg p-2 w-full max-w-lg mx-auto md:mx-0 gap-2">
          <input
            type="text"
            placeholder="Job title..."
            className="flex-1 px-4 py-2 outline-none border rounded-md w-full sm:w-auto"
          />
          <input
            type="text"
            placeholder="Location..."
            className="flex-1 px-4 py-2 outline-none border rounded-md w-full sm:w-auto"
          />
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full sm:w-auto">
            Search
          </button>
        </div>

        {/* Stats */}
        <p className="text-gray-800 text-sm sm:text-base">
          10.5k+ job vacancies available
        </p>
      </div>

      {/* Right Image (Hidden on Mobile) */}
      <div className="hidden md:flex md:w-1/2 mt-8 md:mt-0 justify-center">
        <img
          src="/src/assets/People search-rafiki.svg"
          alt="Job Hunt"
          className="w-3/4 sm:w-2/3 md:w-full max-w-md md:max-w-full"
        />
      </div>
    </section>
  );
};

export default Hero;
