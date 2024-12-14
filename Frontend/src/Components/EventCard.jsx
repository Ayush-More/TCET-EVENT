import React from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaBuilding, FaMusic } from "react-icons/fa";
import eventIcon from '../assets/3.jpg';

const EventCard = ({ events }) => {
  if (!events || events.length === 0) {
    return <p>No events found</p>;
  }

  return (
    <>
      {events.map((event, index) => (
        <div
          key={index}
          className="flex flex-col lg:flex-row items-center bg-gradient-to-r from-blue-100 via-red-100 to-orange-200 p-6 border-2 border-gray-400 rounded-lg shadow-lg mb-6 hover:shadow-2xl transition-all duration-300"
        >
          {/* Left side: Event details */}
          <div className="flex-1 lg:w-3/4 mb-4 lg:mb-0">
            <div className="flex items-center space-x-6 mb-6">
              {/* Circular Image next to the event title */}
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-pink-500 shadow-md">
                <img src={eventIcon} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-4xl font-bold text-gray-800">{event.title}</h3>
            </div>

            {/* Event Timing & Location */}
            <div className="mb-6 pb-4">
              <p className="text-lg text-gray-600 mb-2">
                <FaCalendarAlt className="inline-block mr-3 text-blue-500" />
                <span className="font-medium">{event.startDate} - {event.endDate}</span> | {event.time}
              </p>
              {/* Add black line below time */}
              <div className="border-b border-black mb-4"></div>
              <p className="text-lg text-gray-600 mb-4">
                <FaMapMarkerAlt className="inline-block mr-3 text-green-500" />
                <span className="font-medium">{event.location}</span>
              </p>
            </div>

            {/* Event Information */}
            <div className="grid grid-cols-2 gap-x-6 text-lg">
              <div className="flex items-center text-gray-700 mb-4 border-b border-black pb-4">
                <FaMusic className="mr-3 text-orange-500" />
                <span className="font-semibold w-32">Event Type:</span> <span className="font-medium">{event.eventType}</span>
              </div>
              <div className="flex items-center text-gray-700 mb-4 border-b border-black pb-4">
                <FaUsers className="mr-3 text-purple-500" />
                <span className="font-semibold w-32">Audience:</span> <span className="font-medium">{event.audienceType}</span>
              </div>
              <div className="flex items-center text-gray-700 mb-4 border-b border-black pb-4">
  <FaBuilding className="mr-3 text-teal-500" />
  <span className="font-semibold w-32">Institution:</span>
  <span className="font-medium whitespace-nowrap">{event.institution}</span>
</div>

            </div>
          </div>

          {/* Right side: Event Image */}
          <div className="w-full lg:w-1/4 mt-6 lg:mt-0 lg:ml-6 rounded-lg overflow-hidden shadow-lg border-4 border-indigo-500">
            <img src={eventIcon} alt="Event Image" className="w-full h-full object-cover rounded-lg transform hover:scale-110 transition-transform duration-300" />
          </div>
        </div>
      ))}
    </>
  );
};

export default EventCard;
