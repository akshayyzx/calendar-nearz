import React from "react";

const Drawer = ({ selectedOption, setSelectedOption }) => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-5 flex flex-col fixed left-0 top-0">
      {/* Logo */}
      <div className="flex items-center justify-center mb-6">
        <img
          src="https://marketplace.canva.com/EAGGN4jLiEU/1/0/1600w/canva-black-and-cream-illustrative-hair-salon-logo-vkZoxxgOYCk.jpg "
          alt="Nearz Logo"
          className="h-35"
        />
      </div>

      {/* Navigation Options */}
      <ul className="flex flex-col gap-3">
        {["Appointments", "Users", "Insights"].map((option) => (
          <li
            key={option}
            className={`p-3 cursor-pointer rounded transition text-lg font-medium 
              ${
                selectedOption === option
                  ? "bg-orange-500 text-white"
                  : "hover:bg-gray-700"
              }
            `}
            onClick={() => setSelectedOption(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Drawer;
