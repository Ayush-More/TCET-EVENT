import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaMusic } from "react-icons/fa";
import eventIcon from "../assets/3.jpg"; // Default event image

const EventCard = () => {
  const [events, setEvents] = useState([]);
  const [activeTab, setActiveTab] = useState("upcoming"); // Tabs: "upcoming" or "past"

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/events");
        const result = await response.json();

        if (result.success && Array.isArray(result.data)) {
          setEvents(result.data);
        } else {
          console.log("No events found or incorrect data format.");
          setEvents([]);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        setEvents([]);
      }
    };

    fetchEvents();
  }, []);

  const currentDate = new Date();

  // Split the events into Upcoming and Past
  const upcomingEvents = events.filter((event) => new Date(event.dateOfEvent) >= currentDate);
  const pastEvents = events.filter((event) => new Date(event.dateOfEvent) < currentDate);

  // Determine the events to display based on the active tab
  const displayedEvents = activeTab === "upcoming" ? upcomingEvents : pastEvents;

  return (
    <div className="flex flex-col w-full items-center">
      {/* Tabs */}
      <div className="flex w-[1000px] max-w-full mb-6">
  <button
    className={`flex-1 py-5 text-center text-2xl font-semibold rounded-full transition-all duration-300 ${
      activeTab === "upcoming" ? "bg-gradient-to-r from-orange-400 to-orange-600 text-white shadow-lg" : "bg-gray-200 text-gray-700"
    }`}
    onClick={() => setActiveTab("upcoming")}
  >
    Upcoming Events
  </button>
  <button
    className={`flex-1 ml-10 py-5 text-center text-2xl font-semibold rounded-full transition-all duration-300 ${
      activeTab === "past" ? "bg-gradient-to-r from-orange-400 to-orange-600 text-white shadow-lg" : "bg-gray-200 text-gray-700"
    }`}
    onClick={() => setActiveTab("past")}
  >
    Past Events
  </button>
</div>


      {/* Render Events */}
      <div className="w-full max-w-4xl">
        {displayedEvents.length === 0 ? (
          <p className="text-center text-gray-500">No events found in this category.</p>
        ) : (
          displayedEvents.map((event, index) => (
            <div
              key={index}
              className="flex flex-col lg:flex-row items-start bg-gradient-to-r from-blue-100 via-red-100 to-orange-200 p-4 border-2 border-x-orange-300 rounded-lg shadow-md mb-1 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{event.activityName}</h3>
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-1 flex items-center">
                    <FaCalendarAlt className="inline-block mr-2 text-blue-500" />
                    <span className="font-medium">
                      {new Date(event.dateOfEvent).toLocaleDateString()} - {event.timeOfActivity?.start} to{" "}
                      {event.timeOfActivity?.end}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600 flex items-center">
                    <FaMapMarkerAlt className="inline-block mr-2 text-green-500" />
                    <span className="font-medium">{event.location}</span>
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center text-gray-700">
                    <FaMusic className="mr-2 text-orange-500" />
                    <span className="font-semibold w-24">Type:</span>
                    <span className="font-medium">{event.typeOfActivity}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <FaUsers className="mr-2 text-purple-500" />
                    <span className="font-semibold w-24">Organized By:</span>
                    <span className="font-medium">{event.organizedBy}</span>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/4 mt-4 lg:mt-0 lg:ml-6 rounded-lg overflow-hidden shadow-md">
                <img
                  src={event.image || eventIcon}
                  alt="Event"
                  className="w-full h-40 object-cover rounded-lg transform hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EventCard;
