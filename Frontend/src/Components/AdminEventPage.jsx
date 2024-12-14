import React from "react";
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

const AdEventCard = ({ events }) => {
  if (!events || events.length === 0) {
    return <p>No events found</p>;
  }

  return (
    <>
      {events.map((event, index) => (
        <div
          key={index}
          className="flex flex-col lg:flex-row items-start bg-gradient-to-r from-blue-100 via-red-100 to-orange-200 p-8 border-2 border-gray-400 rounded-lg shadow-lg mb-6 hover:shadow-2xl transition-all duration-300"
        >
          {/* Left side: Event details */}
          <div className="flex-1 lg:w-3/4 mb-4 lg:mb-0 space-y-6">
            {/* Header Section */}
            <div className="flex items-center space-x-6 mb-6 border-b border-black">
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-pink-500 shadow-md">
                <img src={eventIcon} alt="Event Icon" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-4xl font-bold text-gray-800 break-words">{event.title}</h3>
            </div>

            {/* Event Timing & Location */}
            <section className="border-b border-black pb-4">
              <p className="text-lg text-gray-600 mb-2">
                <FaCalendarAlt className="inline-block mr-3 text-blue-500" />
                <span className="font-medium break-words">{event.startDate} - {event.endDate}</span> | {event.time}
              </p>
              <p className="text-lg text-gray-600 mb-4">
                <FaMapMarkerAlt className="inline-block mr-3 text-green-500" />
                <span className="font-medium break-words">{event.location}</span>
              </p>
            </section>

            {/* Event Information */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 text-lg border-b border-black pb-4">
              {[
                { label: "Event Type:", value: event.eventType, icon: <FaMusic className="text-orange-500" /> },
                { label: "Audience Type:", value: event.audienceType, icon: <FaUsers className="text-purple-500" /> },
                { label: "Institution:", value: event.institution, icon: <FaBuilding className="text-teal-500" /> },
                { label: "Activity Head:", value: event.activityHead, icon: <FaUserTie className="text-red-500" /> },
                { label: "Outcome:", value: event.outcome, icon: <FaTrophy className="text-yellow-500" /> },
                { label: "Objective:", value: event.objective, icon: <FaBullseye className="text-green-500" /> },
                { label: "Faculty Assigned:", value: event.facultyAssigned.join(", "), icon: <FaUserTie className="text-blue-500" /> },
                { label: "Non-Teaching Staff:", value: event.nonTeachingStaff.join(", "), icon: <FaUsers className="text-gray-500" /> },
                { label: "Organized By:", value: event.organizedBy.join(", "), icon: <FaBuilding className="text-indigo-500" /> },
              ].map(({ label, value, icon }, idx) => (
                <div key={idx} className="flex items-center text-gray-700 mb-4 border-b border-black pb-2">
                  {icon && <span className="mr-3">{icon}</span>}
                  <span className="font-semibold w-40 whitespace-nowrap">{label}</span>
                  <span className="font-medium break-words">{value}</span>
                </div>
              ))}
            </section>
          </div>

          {/* Right side: Event Image */}
          <div className="w-full lg:w-1/4 mt-6 lg:mt-0 lg:ml-6 rounded-lg overflow-hidden shadow-lg border-4 border-indigo-500">
            <img
              src={event.image || eventIcon}
              alt="Event Image"
              className="w-full h-full object-cover rounded-lg transform hover:scale-110 transition-transform duration-300"
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default AdEventCard;
