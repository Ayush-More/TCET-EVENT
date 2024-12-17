import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaMusic, FaBuilding, FaUserTie, FaBullseye, FaTrophy } from "react-icons/fa";
import eventIcon from "../assets/3.jpg"; // Default event image

const AdEventCard = () => {
  const [events, setEvents] = useState([]);
  const [activeTab, setActiveTab] = useState("upcoming"); // Tabs: "upcoming" or "past"
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/events");
        const result = await response.json();
        console.log("Fetched Events:", result); // Log the result for debugging

        if (result.success && Array.isArray(result.data)) {
          setEvents(result.data);
        } else {
          console.log("No events found or incorrect data format.");
          setEvents([]);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        setEvents([]);
      } finally {
        setLoading(false);
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

  // Check for empty events list
  console.log("Displayed Events:", displayedEvents);

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

      {/* Loading State */}
      {loading && <p className="text-center text-gray-500">Loading events...</p>}

      {/* Render Events */}
      <div className="w-full max-w-4xl">
        {displayedEvents.length === 0 && !loading ? (
          <p className="text-center text-gray-500">No events found in this category.</p>
        ) : (
          displayedEvents.map((event, index) => (
            <div
              key={index}
              className="flex flex-col lg:flex-row items-start bg-gradient-to-r from-blue-100 via-red-100 to-orange-200 p-4 border-2 border-orange-300 rounded-lg shadow-md mb-1 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex-1 space-y-4">
                <h3 className="text-2xl font-bold text-gray-800 break-words">{event.activityName}</h3>
                <div>
                  <p className="text-sm text-gray-600 mb-1 flex items-center">
                    <FaCalendarAlt className="mr-2 text-blue-500" />
                    <span>
                      {new Date(event.dateOfEvent).toLocaleDateString()} - {new Date(event.timeOfActivity?.end).toLocaleDateString()}
                    </span> | {event.timeOfActivity?.start || 'N/A'}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-green-500" />
                    <span>{event.location}</span>
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  {[{ label: "Event Type:", value: event.typeOfActivity, icon: <FaMusic className="text-orange-500" /> },
                    { label: "Audience Type:", value: event.audienceType, icon: <FaUsers className="text-purple-500" /> },
                    { label: "Institution:", value: event.institution, icon: <FaBuilding className="text-teal-500" /> },
                    { label: "Activity Head:", value: event.activityHead, icon: <FaUserTie className="text-red-500" /> },
                    { label: "Outcome:", value: event.outcome, icon: <FaTrophy className="text-yellow-500" /> },
                    { label: "Objective:", value: event.objective, icon: <FaBullseye className="text-green-500" /> },
                    { label: "Faculty Assigned:", value: event.facultyAssigned?.join(", "), icon: <FaUserTie className="text-blue-500" /> },
                    { label: "Non-Teaching Staff:", value: event.nonTeachingStaff?.join(", "), icon: <FaUsers className="text-gray-500" /> },
                    { label: "Organized By:", value: event.organizedBy, icon: <FaBuilding className="text-indigo-500" /> },
                  ].map(({ label, value, icon }, idx) => (
                    <div key={idx} className="flex items-center text-gray-700">
                      {icon && <span className="mr-2">{icon}</span>}
                      <span className="font-semibold w-32">{label}</span>
                      <span className="font-medium break-words">{value || "N/A"}</span>
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
          ))
        )}
      </div>
    </div>
  );
};

export default AdEventCard;
