import React, { useState } from "react";
import { FaCalendarAlt, FaCalendarCheck } from "react-icons/fa"; // Adding icons for events

const EventsPage = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  return (
    <div className="flex flex-col items-center mt-10 px-4 sm:px-6 lg:px-12 w-full min-h-screen bg-orange-100">
      <h1 className="text-4xl font-semibold text-orange-600 mb-6 text-center">Events</h1>

  
      <div className="flex w-full max-w-full border-b-4 border-gray-200 rounded-t-xl overflow-hidden">
       
        <div
          className={`flex-1 text-center py-4 cursor-pointer transition-all duration-300 ease-in-out ${
            activeTab === "upcoming"
              ? "bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold border-b-4 border-orange-600"
              : "text-gray-500 hover:text-gray-800"
          }`}
          onClick={() => setActiveTab("upcoming")}
        >
          <FaCalendarAlt className="inline-block mr-2 text-2xl" />
          Upcoming Events
          {activeTab === "upcoming" && (
            <span className="block text-black mt-2 transform rotate-180"></span>
          )}
        </div>

        <div
          className={`flex-1 text-center py-4 cursor-pointer transition-all duration-300 ease-in-out ${
            activeTab === "past"
              ? "bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold border-b-4 border-orange-600"
              : "text-gray-500 hover:text-gray-800"
          }`}
          onClick={() => setActiveTab("past")}
        >
          <FaCalendarCheck className="inline-block mr-2 text-2xl" />
          Past Events
        </div>
      </div>

      {/* Content Area */}
      <div className="w-full max-w-full p-6 mt-6 bg-white rounded-xl shadow-lg">
        {activeTab === "upcoming" ? (
          <p className="text-gray-600 text-xl font-medium">
            There are currently no upcoming events. Stay tuned for more updates!
          </p>
        ) : (
          <p className="text-gray-600 text-xl font-medium">
            No past events to show at the moment. Check back later!
          </p>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
