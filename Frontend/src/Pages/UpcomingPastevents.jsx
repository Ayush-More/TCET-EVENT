import React, { useState, useEffect } from "react";
import EventCard from "../Components/EventCard";
import SearchFilter from "../Components/SearchFilter";
import eventData from "./Data/eventData";

const EventsPage = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [searchParams, setSearchParams] = useState({});
  const [filteredEvents, setFilteredEvents] = useState(eventData);

  useEffect(() => {
    const filterEvents = () => {
      let filtered = eventData;

      // Search term filter
      if (searchParams.searchTerm) {
        filtered = filtered.filter((event) =>
          event.title.toLowerCase().includes(searchParams.searchTerm.toLowerCase())
        );
      }

      // Institute/Department filter
      if (searchParams["Institute / Department / Centre"]) {
        filtered = filtered.filter((event) =>
          event.institution
            .toLowerCase()
            .includes(searchParams["Institute / Department / Centre"].toLowerCase())
        );
      }

      // Location filter
      if (searchParams["By Location"]) {
        filtered = filtered.filter((event) =>
          event.location.toLowerCase().includes(searchParams["By Location"].toLowerCase())
        );
      }

      // Event Type filter
      if (searchParams["By Event Type"]) {
        filtered = filtered.filter((event) =>
          event.eventType.toLowerCase().includes(searchParams["By Event Type"].toLowerCase())
        );
      }

      // Audience Type filter
      if (searchParams["By Audience Type"]) {
        filtered = filtered.filter((event) =>
          event.audienceType.toLowerCase().includes(searchParams["By Audience Type"].toLowerCase())
        );
      }

      // Date filters (fromDate and toDate)
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
      <h1 className="text-4xl font-semibold text-orange-600 mb-6 text-center">Events</h1>

      <div className="flex w-full max-w-full border-b-4 border-gray-200 rounded-t-xl overflow-hidden mb-6">
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

      <div className="flex w-full max-w-full gap-6">
        <div className="w-full sm:w-1/3 md:w-1/4 lg:w-1/4 xl:w-1/5 mb-6">
          <SearchFilter searchParams={searchParams} setSearchParams={setSearchParams} />
        </div>

        <div className="w-full sm:w-2/3 md:w-3/4 lg:w-3/4 xl:w-4/5">
          <div className="flex flex-col gap-6">
            <EventCard events={filteredEvents} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
