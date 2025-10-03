import React from "react";

const Newsletter = () => {
  return (
    <section className="bg-blue-600 py-12 px-6 sm:px-12 lg:px-20 text-center rounded-2xl mx-6 sm:mx-12 lg:mx-20 my-12">
      <h2 className="text-white text-xl sm:text-2xl font-bold mb-6">
        Never Want to Miss Any Job News?
      </h2>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-xl mx-auto">
        <input
          type="email"
          placeholder="Enter your email address here..."
          className="flex-1 px-4 py-3 rounded-lg outline-none border border-gray-300 w-full 
               text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 
               focus:ring-blue-400 transition"
        />
        <button
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg 
                     hover:bg-blue-700 transition w-full sm:w-auto"
        >
          Subscribe
        </button>
      </div>
    </section>
  );
};

export default Newsletter;
