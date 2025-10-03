import React from "react";
import profile from "/public/assets/Profile data-rafiki.svg"

const ProfileSection = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-6 sm:px-12 lg:px-20 py-12 bg-blue-50">
      {/* Left Image */}
      <div className="md:w-1/2 flex justify-center mb-8 md:mb-0">
        <img
          src={profile}
          alt="Create Profile"
          className="w-3/4 md:w-full max-w-sm"
        />
      </div>

      {/* Right Content */}
      <div className="md:w-1/2 space-y-6 text-center md:text-left">
        <h2 className="text-blue-600 font-medium text-sm">Create Profile</h2>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Build Your Personal <br /> Account Profile
        </h1>
        <p className="text-gray-700 text-base">
          Create an account for the job information you want, get daily
          notifications, and you can easily apply directly to the company.
        </p>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Create Account
        </button>
      </div>
    </section>
  );
};

export default ProfileSection;
