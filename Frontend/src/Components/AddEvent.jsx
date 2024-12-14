import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaBuilding,
  FaCalendarAlt,
  FaUsers,
  FaTag,
  FaImage,
  FaTrash,
  FaUserTie,
  FaClock,
  FaClipboardCheck,
  FaPlus,
  FaChalkboardTeacher,
  FaRegAddressBook,
  FaHandshake,
} from "react-icons/fa";

const AddEvent = () => {
  const [event, setEvent] = useState({
    title: "",
    startDate: "",
    endDate: "",
    location: "",
    institution: "",
    eventType: "",
    audienceType: "",
    activityHead: "",
    facultyAssigned: [""],
    nonTeachingStaff: [""],
    timeOfActivity: "",
    organizedBy: [""],
    objective: "",
    outcome: "",
    image: null,
  });

  const handleChange = (e, fieldName, index) => {
    const { value } = e.target;
    const updatedField = [...event[fieldName]];
    updatedField[index] = value;
    setEvent((prev) => ({ ...prev, [fieldName]: updatedField }));
  };

  const handleAddField = (fieldName) => {
    setEvent((prev) => ({ ...prev, [fieldName]: [...prev[fieldName], ""] }));
  };

  const handleRemoveField = (fieldName, index) => {
    const updatedField = [...event[fieldName]];
    updatedField.splice(index, 1);
    setEvent((prev) => ({ ...prev, [fieldName]: updatedField }));
  };

  const handleImageChange = (e) => {
    setEvent((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleImageRemove = () => {
    setEvent((prev) => ({ ...prev, image: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Event added:", event);
  };

  return (
    <div className="bg-orange-200 min-h-screen flex items-center">
      <div className="p-8 bg-orange-100 shadow-xl rounded-lg max-w-full w-full mx-auto border-4 border border-black">
        <h2 className="text-5xl font-bold italic ml-10 text-center text-orange-600 mb-9">
          Add New Event
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-6">
          {[{ label: "Event Title", name: "title", icon: <FaTag />, type: "text" },
            { label: "Start Date", name: "startDate", icon: <FaCalendarAlt />, type: "date" },
            { label: "End Date", name: "endDate", icon: <FaCalendarAlt />, type: "date" },
            { label: "Location", name: "location", icon: <FaMapMarkerAlt />, type: "text" },
            { label: "Institution", name: "institution", icon: <FaBuilding />, type: "text" },
            { label: "Event Type", name: "eventType", icon: <FaTag />, type: "text" },
            { label: "Audience Type", name: "audienceType", icon: <FaUsers />, type: "text" },
            { label: "Activity Head", name: "activityHead", icon: <FaUserTie />, type: "text" },
            { label: "Time of Activity", name: "timeOfActivity", icon: <FaClock />, type: "time" },
            { label: "Objective", name: "objective", icon: <FaClipboardCheck />, type: "text" },
            { label: "Outcome", name: "outcome", icon: <FaClipboardCheck />, type: "text" },
          ].map((field, index) => (
            <div key={index}>
              <label className="flex items-center text-black font-medium text-lg mb-2">
                <span className="mr-2">{field.icon}</span>
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={event[field.name]}
                onChange={(e) => handleChange(e, field.name, 0)}
                placeholder={`Enter ${field.label.toLowerCase()}`}
                className="w-full p-3 border border-black rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          ))}
          
          {/* Dynamic fields for faculty assigned, non-teaching staff, and organized by */}
          {["facultyAssigned", "nonTeachingStaff", "organizedBy"].map((field, index) => (
            <div key={index} className="col-span-3">
              <label className="flex items-center justify-start text-black font-medium text-lg mb-4">
                <span className="mr-2">{field === "facultyAssigned" ? <FaChalkboardTeacher /> : field === "nonTeachingStaff" ? <FaRegAddressBook /> : <FaHandshake />}</span>
                {field === "facultyAssigned" ? "Faculty Assigned" : field === "nonTeachingStaff" ? "Non-Teaching Staff" : "Organized By"}
              </label>
              <div className="flex flex-col gap-4">
                {event[field].map((value, idx) => (
                  <div key={idx} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => handleChange(e, field, idx)}
                      placeholder={`Enter ${field === "facultyAssigned" ? "faculty" : field === "nonTeachingStaff" ? "non-teaching staff" : "organizer"}`}
                      className="w-full p-3 border border-black rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveField(field, idx)}
                      className="text-red-500"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddField(field)}
                  className="flex items-center text-teal-500 mt-2"
                >
                  <FaPlus className="mr-2" /> Add more
                </button>
              </div>
            </div>
          ))}

          {/* Image Upload */}
          <div className="col-span-3 text-center">
            <label className="flex items-center justify-center text-black font-medium text-lg mb-4">
              <FaImage className="mr-2 text-orange-500" /> Upload Image
            </label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="w-full p-3 border border-black rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {event.image && (
              <div className="relative mt-4 inline-block border rounded-lg">
                <img
                  src={URL.createObjectURL(event.image)}
                  alt="Event"
                  className="w-32 h-32 rounded-full object-cover mx-auto"
                />
                <button
                  type="button"
                  onClick={handleImageRemove}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-2 shadow-md"
                >
                  <FaTrash />
                </button>
              </div>
            )}
          </div>

          <div className="col-span-3">
            <button
              type="submit"
              className="w-full bg-orange-500 text-white p-4 rounded-lg shadow-md hover:bg-orange-600 transition duration-300"
            >
              Add Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
