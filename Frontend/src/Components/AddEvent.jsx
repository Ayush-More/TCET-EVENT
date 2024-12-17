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
} from "react-icons/fa";

const AddEvent = () => {
  const [event, setEvent] = useState({
    activityName: "",
    dateOfEvent: "",
    location: "",
    institution: "",
    typeOfActivity: "",
    audienceType: "",
    activityHead: "",
    facultyAssigned: [""], // Keep the array for faculty
    nonTeachingStaff: [""], // Keep the array for non-teaching staff
    timeOfActivity: { start: "", end: "" },
    organizedBy: "", // This is now a string
    objective: "",
    outcomes: "",
    image: null,
  });

  // Handle input changes for text fields
  const handleChange = (e, fieldName, index) => {
    const { value } = e.target;

    if (fieldName.includes(".")) {
      const [parentKey, childKey] = fieldName.split(".");
      setEvent((prev) => ({
        ...prev,
        [parentKey]: {
          ...prev[parentKey],
          [childKey]: value,
        },
      }));
    } else if (Array.isArray(event[fieldName])) {
      const updatedField = [...event[fieldName]];
      updatedField[index] = value;
      setEvent((prev) => ({ ...prev, [fieldName]: updatedField }));
    } else {
      setEvent((prev) => ({ ...prev, [fieldName]: value }));
    }
  };

  // Add faculty member
  const handleAddFaculty = () => {
    setEvent((prev) => ({ ...prev, facultyAssigned: [...prev.facultyAssigned, ""] }));
  };

  // Remove faculty member
  const handleRemoveFaculty = (index) => {
    const updatedFaculty = [...event.facultyAssigned];
    updatedFaculty.splice(index, 1);
    setEvent((prev) => ({ ...prev, facultyAssigned: updatedFaculty }));
  };

  // Add non-teaching staff member
  const handleAddNonTeachingStaff = () => {
    setEvent((prev) => ({ ...prev, nonTeachingStaff: [...prev.nonTeachingStaff, ""] }));
  };

  // Remove non-teaching staff member
  const handleRemoveNonTeachingStaff = (index) => {
    const updatedStaff = [...event.nonTeachingStaff];
    updatedStaff.splice(index, 1);
    setEvent((prev) => ({ ...prev, nonTeachingStaff: updatedStaff }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("activityName", event.activityName);
    formData.append("dateOfEvent", event.dateOfEvent);
    formData.append("location", event.location);
    formData.append("institution", event.institution);
    formData.append("typeOfActivity", event.typeOfActivity);
    formData.append("audienceType", event.audienceType);
    formData.append("activityHead", event.activityHead);
    formData.append("timeOfActivity[start]", event.timeOfActivity.start);
    formData.append("timeOfActivity[end]", event.timeOfActivity.end);
    formData.append("objective", event.objective);
    formData.append("outcomes", event.outcomes);

    // Append arrays
    event.facultyAssigned.forEach((faculty) => {
      formData.append("facultyAssigned[]", faculty);
    });

    event.nonTeachingStaff.forEach((staff) => {
      formData.append("nonTeachingStaff[]", staff);
    });

    // Append the "organizedBy" as a single string
    formData.append("organizedBy", event.organizedBy);

    // Append image if exists
    if (event.image) {
      formData.append("image", event.image);
    }

    try {
      const response = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to add event");
      }

      const responseData = await response.json();
      console.log("Event added successfully:", responseData);
    } catch (error) {
      console.error("Error submitting event:", error);
    }
  };

  // Handle image removal
  const handleRemoveImage = () => {
    setEvent((prev) => ({ ...prev, image: null }));
  };

  return (
    <div className="bg-orange-200 min-h-screen flex items-center justify-center">
      <div className="p-10 bg-orange-100 shadow-xl rounded-lg w-full max-w-7xl mx-auto border-4 border-black">
        <h2 className="text-5xl font-bold italic text-center text-orange-600 mb-9">Add New Event</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-6">
          {/* Form fields for Event details */}
          {[{ label: "Event Title", name: "activityName", icon: <FaTag />, type: "text" },
            { label: "Start Date", name: "dateOfEvent", icon: <FaCalendarAlt />, type: "date" },
            { label: "Location", name: "location", icon: <FaMapMarkerAlt />, type: "text" },
            { label: "Institution", name: "institution", icon: <FaBuilding />, type: "text" },
            { label: "Event Type", name: "typeOfActivity", icon: <FaTag />, type: "text" },
            { label: "Audience Type", name: "audienceType", icon: <FaUsers />, type: "text" },
            { label: "Activity Head", name: "activityHead", icon: <FaUserTie />, type: "text" },
            { label: "Start Time", name: "timeOfActivity.start", icon: <FaClock />, type: "time" },
            { label: "End Time", name: "timeOfActivity.end", icon: <FaClock />, type: "time" },
            { label: "Objective", name: "objective", icon: <FaClipboardCheck />, type: "text" },
            { label: "Outcome", name: "outcomes", icon: <FaClipboardCheck />, type: "text" },
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
                className="w-full p-2 border border-black rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              />
            </div>
          ))}

          {/* Organizers, Faculty Assignment, Non-Teaching Staff */}
          <div className="col-span-3">
            <label className="flex items-center text-black font-medium text-lg mb-2">
              <FaUsers className="mr-2 text-orange-500" /> Organized By
            </label>
            <input
              type="text"
              name="organizedBy"
              value={event.organizedBy}
              onChange={(e) => handleChange(e, "organizedBy")}
              placeholder="Enter organizer's name"
              className="w-full p-2 border border-black rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
            />
          </div>

          {/* Faculty and Non-Teaching Staff Inputs */}
          {/* Faculty Assignment */}
          <div className="col-span-3">
            <label className="flex items-center text-black font-medium text-lg mb-2">
              <FaUserTie className="mr-2 text-orange-500" /> Faculty Assigned
            </label>
            {event.facultyAssigned.map((faculty, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={faculty}
                  onChange={(e) => handleChange(e, "facultyAssigned", index)}
                  placeholder="Enter faculty name"
                  className="w-full p-2 border border-black rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveFaculty(index)}
                  className="ml-2 text-red-500"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddFaculty}
              className="w-full bg-green-500 text-white p-2 rounded-lg shadow-md hover:bg-green-600"
            >
              Add Faculty
            </button>
          </div>

          {/* Non-Teaching Staff Assignment */}
          <div className="col-span-3">
            <label className="flex items-center text-black font-medium text-lg mb-2">
              <FaUserTie className="mr-2 text-orange-500" /> Non-Teaching Staff Assigned
            </label>
            {event.nonTeachingStaff.map((staff, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={staff}
                  onChange={(e) => handleChange(e, "nonTeachingStaff", index)}
                  placeholder="Enter non-teaching staff name"
                  className="w-full p-2 border border-black rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveNonTeachingStaff(index)}
                  className="ml-2 text-red-500"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddNonTeachingStaff}
              className="w-full bg-green-500 text-white p-2 rounded-lg shadow-md hover:bg-green-600"
            >
              Add Non-Teaching Staff
            </button>
          </div>

          {/* Image Upload */}
          <div className="col-span-3 text-center">
            <label className="flex items-center justify-center text-black font-medium text-lg mb-4">
              <FaImage className="mr-2 text-orange-500" /> Upload Image
            </label>
            <input
              type="file"
              name="image"
              onChange={(e) => setEvent((prev) => ({ ...prev, image: e.target.files[0] }))}
              className="w-full p-2 border border-black rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {event.image && (
              <div className="mt-4 relative inline-block">
                <img
                  src={URL.createObjectURL(event.image)}
                  alt="Event"
                  className="w-32 h-32 rounded-full object-cover"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-0 right-0 text-white bg-red-500 rounded-full p-1"
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
