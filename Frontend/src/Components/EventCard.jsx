import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaBuilding, FaMusic } from "react-icons/fa";
import eventIcon from "../assets/3.jpg";

const EventCard = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events");
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  if (!events || events.length === 0) {
    return <p>No events found</p>;
  }

  return (
    <>
      {events.map((event, index) => (
        <div
          key={index}
          className="flex flex-col  lg:flex-row items-start bg-gradient-to-r from-blue-100 via-red-100 to-orange-200 p-4 border-2 border-x-orange-300 rounded-lg shadow-md mb-1 hover:shadow-lg transition-all duration-300"
        >
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{event.title}</h3>
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-1 flex items-center">
                <FaCalendarAlt className="inline-block mr-2 text-blue-500" />
                <span className="font-medium">{event.startDate} - {event.endDate}</span>{" "}
                | {event.time}
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
                <span className="font-medium">{event.eventType}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <FaUsers className="mr-2 text-purple-500" />
                <span className="font-semibold w-24">Audience:</span>
                <span className="font-medium">{event.audienceType}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <FaBuilding className="mr-2 text-teal-500" />
                <span className="font-semibold w-24">Institution:</span>
                <span className="font-medium">{event.institution}</span>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/4 mt-4 lg:mt-0 lg:ml-6 rounded-lg overflow-hidden shadow-md">
            <img
              src={eventIcon}
              alt="Event"
              className="w-full h-40 object-cover rounded-lg transform hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default EventCard;
