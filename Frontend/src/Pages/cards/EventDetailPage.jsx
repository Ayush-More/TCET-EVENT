import React from 'react';
import { useParams } from 'react-router-dom'; // To get the event ID from the URL
import { eventData } from '../Data/eventData'; // Import the event data
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUsers, FaUniversity, FaFlagCheckered } from 'react-icons/fa'; // Add more icons

const EventDetailPage = () => {
  const { id } = useParams();
  const event = eventData.find((event) => event.id === parseInt(id));

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div className="bg-orange-500 min-h-screen py-14 px-6 lg:px-12">
      <h1 className="text-5xl font-extrabold italic text-center mb-8 text-black-600 drop-shadow-lg">
        {event.title}
      </h1>

      <div className="event-detail-content bg-gradient-to-r from-teal-100 to-teal-200 p-8 rounded-3xl shadow-xl space-y-8 border-4 border-gray-300 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:space-x-12 mb-8 border-b-2 border-gray-300 pb-8">
          <div className="flex-1 space-y-4">
            <div className="flex items-center space-x-4">
              <FaCalendarAlt className="text-blue-500 text-3xl" />
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Start Date</h2>
                <p className="text-lg text-gray-600">{event.startDate}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <FaCalendarAlt className="text-blue-500 text-3xl" />
              <div>
                <h2 className="text-2xl font-bold text-gray-800">End Date</h2>
                <p className="text-lg text-gray-600">{event.endDate}</p>
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <div className="flex items-center space-x-4">
              <FaClock className="text-orange-500 text-3xl" />
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Time</h2>
                <p className="text-lg text-gray-600">{event.time}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <FaFlagCheckered className="text-green-500 text-3xl" />
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Event Type</h2>
                <p className="text-lg text-gray-600">{event.eventType}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-12 mb-8 border-b-2 border-gray-300 pb-8">
          <div className="flex-1 space-y-4">
            <div className="flex items-center space-x-4">
              <FaUsers className="text-purple-500 text-3xl" />
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Audience Type</h2>
                <p className="text-lg text-gray-600">{event.audienceType}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <FaMapMarkerAlt className="text-red-500 text-3xl" />
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Location</h2>
                <p className="text-lg text-gray-600">{event.location}</p>
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <div className="flex items-center space-x-4">
              <FaUniversity className="text-teal-500 text-3xl" />
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Institution(s)</h2>
                <p className="text-lg text-gray-600">{event.institution}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;
