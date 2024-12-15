import React, { useEffect, useState } from "react";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUsers,
  FaBuilding,
  FaMusic,
  FaUserTie,
  FaBullseye,
  FaTrophy,
} from "react-icons/fa";
import eventIcon from "../assets/3.jpg";

const AdEventCard = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events data
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
          className="flex flex-col lg:flex-row items-start bg-gradient-to-r from-blue-100 via-red-100 to-orange-200 p-4 border-2 border-orange-300 rounded-lg shadow-md mb-1 hover:shadow-lg transition-all duration-300"
        >
          <div className="flex-1 space-y-4">
            <h3 className="text-2xl font-bold text-gray-800 break-words">{event.title}</h3>
            <div>
              <p className="text-sm text-gray-600 mb-1 flex items-center">
                <FaCalendarAlt className="mr-2 text-blue-500" />
                <span>{event.startDate} - {event.endDate}</span> | {event.time}
              </p>
              <p className="text-sm text-gray-600 flex items-center">
                <FaMapMarkerAlt className="mr-2 text-green-500" />
                <span>{event.location}</span>
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              {[{ label: "Event Type:", value: event.eventType, icon: <FaMusic className="text-orange-500" /> },
                { label: "Audience Type:", value: event.audienceType, icon: <FaUsers className="text-purple-500" /> },
                { label: "Institution:", value: event.institution, icon: <FaBuilding className="text-teal-500" /> },
                { label: "Activity Head:", value: event.activityHead, icon: <FaUserTie className="text-red-500" /> },
                { label: "Outcome:", value: event.outcome, icon: <FaTrophy className="text-yellow-500" /> },
                { label: "Objective:", value: event.objective, icon: <FaBullseye className="text-green-500" /> },
                { label: "Faculty Assigned:", value: event.facultyAssigned.join(", "), icon: <FaUserTie className="text-blue-500" /> },
                { label: "Non-Teaching Staff:", value: event.nonTeachingStaff.join(", "), icon: <FaUsers className="text-gray-500" /> },
                { label: "Organized By:", value: event.organizedBy.join(", "), icon: <FaBuilding className="text-indigo-500" /> },
              ].map(({ label, value, icon }, idx) => (
                <div key={idx} className="flex items-center text-gray-700">
                  {icon && <span className="mr-2">{icon}</span>}
                  <span className="font-semibold w-32">{label}</span>
                  <span className="font-medium break-words">{value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full lg:w-1/4 mt-4 lg:mt-0 lg:ml-4 rounded-lg overflow-hidden shadow-md">
            <img
              src={event.image || eventIcon}
              alt="Event"
              className="w-full h-40 object-cover rounded-lg transform hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default AdEventCard;
