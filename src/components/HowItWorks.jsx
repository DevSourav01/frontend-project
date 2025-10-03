import React from "react";

const HowItWorks = () => {
  const steps = [
    { id: 1, title: "Upload Your CV", desc: "Easily upload your resume, CV and portfolio globally & securely." },
    { id: 2, title: "You Are Hired", desc: "You will be notified with real job updates that match your specialization." },
    { id: 3, title: "Apply For Best Jobs", desc: "Apply for your dream jobs from the best companies all over the world." },
  ];

  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-6 sm:px-12 lg:px-20 py-16 bg-white">
      {/* Left Content */}
      <div className="md:w-1/2 space-y-6 mb-10 md:mb-0">
        <h2 className="text-blue-600 font-medium text-sm">How It Works</h2>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Easy Step To Find and <br /> Apply Your Dream Job
        </h1>

        {/* Steps */}
        <div className="space-y-6">
          {steps.map((step) => (
            <div
              key={step.id}
              className="flex items-start bg-blue-50 p-4 rounded-lg shadow-sm"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold mr-4">
                {step.id}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{step.title}</h3>
                <p className="text-sm text-gray-700">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Image */}
      <div className="md:w-1/2 flex justify-center">
        <img
          src="/public/assets/Online resume-rafiki.svg"
          alt="How it works"
          className="w-3/4 md:w-full max-w-sm"
        />
      </div>
    </section>
  );
};

export default HowItWorks;
