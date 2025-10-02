import React, { useState } from "react";

// ✅ CategoryCard Component
const CategoryCard = ({ icon, title, active, onClick }) => {
  return (
    <div
      onClick={onClick} // 👈 handle click
      className={`flex flex-col items-center justify-center p-6 rounded-xl shadow-md cursor-pointer transition hover:shadow-lg w-full
//    ${active ? "bg-blue-600 text-white" : "bg-white text-gray-700"}`}
    >
      {/* Icon */}
      <div className="text-4xl mb-3">{icon}</div>
      {/* Title */}
      <h3 className="font-semibold text-lg">{title}</h3>
      {/* Jobs */}
    </div>
  );
};

// ✅ Main Categories Section
const Categories = () => {
  const [activeIndex, setActiveIndex] = useState(0); // 👈 Track selected category

  const categories = [
    { icon: "🎨", title: "UI/UX Design", jobs: 120 },
    { icon: "💰", title: "Finance Management", jobs: 230 },
    { icon: "💻", title: "Web Development", jobs: 100 },
    { icon: "📊", title: "Project Management", jobs: 87 },
    { icon: "📈", title: "Business & Consulting", jobs: 23 },
    { icon: "🖌️", title: "Graphic Designer", jobs: 65 },
    { icon: "🎬", title: "Video Editor", jobs: 100 },
  ];

  return (
    <section className="px-6 sm:px-12 lg:px-20 py-12 bg-gray-50">
      {/* Top Trusted Companies */}
      <div className="text-center mb-10">
        <h1 className="text-lg sm:text-xl font-medium text-gray-800">
          Join Most Well Known{" "}
          <span className="text-blue-600 font-semibold">Companies</span>{" "}
          Around The World
        </h1>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-16 sm:gap-24 lg:gap-32 mb-12">
        <img src="/assets/slack-ar21.svg" alt="Slack" className="h-10" />
        <img src="/assets/airbnb-ar21.svg" alt="Airbnb" className="h-10" />
        <img src="/assets/facebook-ar21.svg" alt="Facebook" className="h-10" />
        <img src="/assets/microsoft-ar21.svg" alt="Microsoft" className="h-10" />
        <img src="/assets/google-ar21.svg" alt="Google" className="h-10" />
      </div>

      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-blue-600 font-medium text-sm">Choose Categories</h2>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Choose Categories
        </h1>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((cat, index) => (
          <CategoryCard
            key={index}
            {...cat}
            active={index === activeIndex} // 👈 check if active
            onClick={() => setActiveIndex(index)} // 👈 change active card
          />
        ))}
      </div>
    </section>
  );
};

export default Categories;
