import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import eventIcon from '../../assets/3.jpg'; // Replace with event icon
import eventImage from '../../assets/3.jpg'; // Replace with event image
import eventData  from '../Data/eventData'; // Import the event data

const EventCard = () => {
  return (
    <div className="bg-gray-50 py-8 px-4 lg:px-12">
      <h2 className="text-4xl font-extrabold text-center mb-8 text-red-600 drop-shadow-lg">
        Events
      </h2>

      {/* Flex container with horizontal scroll on larger devices */}
      <div className="flex flex-wrap lg:flex-nowrap overflow-x-auto space-x-6 p-4 scrollbar-hide">
        {eventData.map((event, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl shadow-2xl min-w-[280px] md:min-w-[320px] lg:min-w-[350px] 
                       transition-transform transform hover:scale-105 hover:shadow-3xl mb-6 first:ml-0"
          >
            <img
              src={eventImage}
              alt={event.title}
              className="h-48 w-full object-cover rounded-t-3xl"
            />
            <div className="p-6">
              <div className="flex items-center mb-4">
                <img
                  src={eventIcon}
                  alt="Icon"
                  className="h-8 w-8 mr-3"
                />
                <h3 className="text-2xl font-bold text-gray-800">
                  {/* Link to the Event Detail Page */}
                  <Link
                    to={`/event-detail/${event.id}`}
                    className="text-blue-500 hover:text-blue-700 transition-colors"
                  >
                    {event.title}
                  </Link>
                </h3>
              </div>
              <p className="text-lg text-gray-600 mb-2 font-semibold">
                📅 {event.startDate}
              </p>
              <p className="text-gray-500 text-md font-medium italic">
                📍 {event.institution}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCard;
