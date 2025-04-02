import React, { useState } from "react";
import CalendarComponent from "../components/Calendar";
import Header from "../components/Header";
import Drawer from "../components/DrawerComponent";
import Users from "../components/Rfm";
import Insights from "../components/Insights";

const Home = () => {
  const [selectedOption, setSelectedOption] = useState("Appointments");

  return (
    <div className="flex h-screen">
      {/* Sidebar Drawer */}
      <Drawer selectedOption={selectedOption} setSelectedOption={setSelectedOption} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col ml-64 transition-all duration-300">
        <Header />
        <div className="p-6">
          {selectedOption === "Appointments" && <CalendarComponent />}
          {selectedOption === "Users" && <Users />}
          {selectedOption === "Insights" && <Insights />}
        </div>
      </div>
    </div>
  );
};

export default Home;
