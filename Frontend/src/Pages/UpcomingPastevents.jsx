import React, { useState, useEffect } from "react";
import EventCard from "../Components/EventCard";
import SearchFilter from "../Components/SearchFilter";
import eventData from "./Data/eventData";
import { FaPlus } from "react-icons/fa"; 
import AddEvent from "../Components/AddEvent";
import AdEventCard from "../Components/AdminEventPage";

const EventsPage = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [searchParams, setSearchParams] = useState({});
  const [filteredEvents, setFilteredEvents] = useState(eventData);
  const [user, setUser] = useState(null); // Replace with actual user auth logic

  useEffect(() => {
    const filterEvents = () => {
      let filtered = eventData;

      if (searchParams.searchTerm) {
        filtered = filtered.filter((event) =>
          event.title.toLowerCase().includes(searchParams.searchTerm.toLowerCase())
        );
      }

      if (searchParams["Institute / Department / Centre"]) {
        filtered = filtered.filter((event) =>
          event.institution.toLowerCase().includes(searchParams["Institute / Department / Centre"].toLowerCase())
        );
      }

      if (searchParams["By Location"]) {
        filtered = filtered.filter((event) =>
          event.location.toLowerCase().includes(searchParams["By Location"].toLowerCase())
        );
      }

      if (searchParams["By Event Type"]) {
        filtered = filtered.filter((event) =>
          event.eventType.toLowerCase().includes(searchParams["By Event Type"].toLowerCase())
        );
      }

      if (searchParams["By Audience Type"]) {
        filtered = filtered.filter((event) =>
          event.audienceType.toLowerCase().includes(searchParams["By Audience Type"].toLowerCase())
        );
      }

      if (searchParams.fromDate) {
        const fromDate = new Date(searchParams.fromDate);
        filtered = filtered.filter((event) => new Date(event.startDate) >= fromDate);
      }
      if (searchParams.toDate) {
        const toDate = new Date(searchParams.toDate);
        filtered = filtered.filter((event) => new Date(event.endDate) <= toDate);
      }

      setFilteredEvents(filtered);
    };

    filterEvents();
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center mt-1 px-4 sm:px-6 lg:px-12 w-full min-h-screen bg-orange-100">
     
      <div className="flex w-full max-w-full border-b-4 border-gray-200 rounded-t-xl overflow-hidden mb-2">
        <div
          className={`flex-1 text-center py-4 cursor-pointer transition-all duration-300 ease-in-out ${
            activeTab === "upcoming"
              ? "bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold border-b-4 border-orange-600"
              : "text-gray-500 hover:text-gray-800"
          }`}
          onClick={() => setActiveTab("upcoming")}
        >
          Upcoming Events
        </div>

        <div
          className={`flex-1 text-center py-4 cursor-pointer transition-all duration-300 ease-in-out ${
            activeTab === "past"
              ? "bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold border-b-4 border-orange-600"
              : "text-gray-500 hover:text-gray-800"
          }`}
          onClick={() => setActiveTab("past")}
        >
          Past Events
        </div>
      </div>

      {user?.role === "author" && (
        <button
          className="fixed bottom-10 right-10 bg-orange-500 text-white p-4 rounded-full shadow-lg hover:bg-orange-600 transition-all"
          onClick={() => AddEvent }
        >
          <FaPlus size={30} />
        </button>
      )}

      <div className="flex w-full max-w-full gap-6">
        <div className="w-full sm:w-1/3 md:w-1/4 lg:w-1/4 xl:w-1/5 mb-6">
          <SearchFilter searchParams={searchParams} setSearchParams={setSearchParams} />
        </div>

        <div className="w-full sm:w-2/3 md:w-3/4 lg:w-3/4 xl:w-4/5">
          <div className="flex flex-col ">
            <EventCard events={filteredEvents} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
