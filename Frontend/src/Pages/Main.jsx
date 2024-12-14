import React, { useState } from 'react';
import { FaCalendarAlt, FaBullhorn, FaPhotoVideo, FaArrowRight } from 'react-icons/fa'; // Icons
import EventCard from './cards/EventCard';
import AnnouncementCard from './cards/AnnouncementCard';
import MediaCard from './cards/MediaCard';
import { Link } from 'react-router-dom';

const Main = () => {
  const [activeTab, setActiveTab] = useState('events'); // State to track the current tab

  return (
    <div className="bg-gray-100 py-8">
      {/* Tab Bar */}
      <div className="bg-white pt-10 flex flex-wrap justify-between pb-10 items-center mb-2 w-full">
        {/* Centered Buttons Container */}
        <div className="flex justify-center items-center ml-[70px] flex-1 space-x-8 md:flex-row flex-col mb-4 md:mb-0">
          {/* Events Button */}
          <button
            onClick={() => setActiveTab('events')}
            className={`flex items-center space-x-2 px-7 py-2  ml-[80px] rounded-md text-2xl font-semibold transition-all duration-300 ${
              activeTab === 'events' ? 'text-red-600' : 'text-gray-500 hover:text-red-500'
            }`}
          >
            <FaCalendarAlt size={30} /> <span>Events</span>
          </button>

          {/* Announcements Button */}
          <button
            onClick={() => setActiveTab('announcements')}
            className={`flex items-center space-x-2 px-6 py-2 ml-[80px] rounded-md text-2xl  font-semibold transition-all duration-300 ${
              activeTab === 'announcements' ? 'text-blue-600' : 'text-gray-500 hover:text-blue-500'
            }`}
          >
            <FaBullhorn size={20} /> <span>Announcements</span>
          </button>

          {/* Media Button */}
          <button
            onClick={() => setActiveTab('media')}
            className={`flex items-center space-x-2 px-6 py-2 ml-[70px] rounded-md text-2xl font-semibold transition-all duration-300 ${
              activeTab === 'media' ? 'text-green-600' : 'text-gray-500 hover:text-green-500'
            }`}
          >
            <FaPhotoVideo size={20} /> <span>Media</span>
          </button>
        </div>

        {/* Rightmost "More Events" Button */}
        <Link
          to="/more-events"
          className="flex items-center space-x-2 px-6 py-2 rounded-md text-lg font-semibold transition-all duration-300 text-purple-600 hover:text-purple-700 ml-auto"
        >
          <span>More Events</span>
          <FaArrowRight size={20} />
        </Link>
      </div>

  
      <div className="space-y-12 px-4">
        {activeTab === 'events' && <EventCard />}
        {activeTab === 'announcements' && <AnnouncementCard />}
        {activeTab === 'media' && <MediaCard />}
      </div>
    </div>
  );
};

export default Main;
