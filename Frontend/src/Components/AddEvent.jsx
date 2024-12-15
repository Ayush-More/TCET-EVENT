import React, { useState, useEffect } from "react";
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

  const [facultySuggestions, setFacultySuggestions] = useState([]);
  const [assignedFaculty, setAssignedFaculty] = useState([]);

  useEffect(() => {
    // Fetch the faculty data from your backend API (replace with your actual API URL)
    fetch("your-api-url/faculty-suggestions")
      .then((response) => response.json())
      .then((data) => setFacultySuggestions(data))
      .catch((error) => console.error("Error fetching faculty data:", error));
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!event.title) newErrors.title = "Event title is required.";
    if (!event.startDate) newErrors.startDate = "Start date is required.";
    if (!event.endDate) newErrors.endDate = "End date is required.";
    if (new Date(event.endDate) < new Date(event.startDate)) {
      newErrors.endDate = "End date must be after the start date.";
    }
    if (!event.location) newErrors.location = "Location is required.";
    if (!event.institution) newErrors.institution = "Institution is required.";
    if (!event.eventType) newErrors.eventType = "Event type is required.";
    if (!event.audienceType) newErrors.audienceType = "Audience type is required.";
    if (!event.activityHead) newErrors.activityHead = "Activity head is required.";
    if (event.facultyAssigned.some((faculty) => !faculty)) {
      newErrors.facultyAssigned = "Faculty assigned cannot be empty.";
    }
    if (event.nonTeachingStaff.some((staff) => !staff)) {
      newErrors.nonTeachingStaff = "Non-teaching staff cannot be empty.";
    }
    if (!event.objective) newErrors.objective = "Objective is required.";
    if (!event.outcome) newErrors.outcome = "Outcome is required.";
    if (!event.image) newErrors.image = "Image is required.";

    // Display alerts for errors
    if (Object.keys(newErrors).length > 0) {
      alert(Object.values(newErrors).join("\n"));
      return false;
    }
    
    return true;
  };

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
    if (validate()) {
      console.log("Event added:", event);

      fetch('your-api-url', {
        method: 'POST',
        body: JSON.stringify(event),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => console.log('Success:', data))
        .catch((error) => console.error('Error:', error));
    }
  };

  // Check if faculty is assigned
  const getFacultyColor = (facultyName) => {
    return assignedFaculty.includes(facultyName) ? "text-green-500" : "text-red-500";
  };

  return (
    <div className="bg-orange-200 min-h-screen flex items-center justify-center">
      <div className="p-10 bg-orange-100 shadow-xl rounded-lg w-full max-w-7xl mx-auto border-4 border-black">
        <h2 className="text-5xl font-bold italic text-center text-orange-600 mb-9">
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
                className="w-full p-2 border border-black rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              />
            </div>
          ))}

          {/* Faculty, Non-teaching Staff, and Organized By */}
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
                      className="w-full p-2 border border-black rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
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

          {/* Faculty Assignment Suggestions */}
          <div className="col-span-3">
            <label className="text-black font-medium text-lg mb-2">Assign Faculty</label>
            <div className="flex flex-wrap gap-4">
              {facultySuggestions.map((faculty, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setAssignedFaculty((prev) => [...prev, faculty])}
                  className={`px-4 py-2 rounded-lg ${
                    assignedFaculty.includes(faculty)
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {faculty}
                </button>
              ))}
            </div>
          </div>

          {/* Image Upload */}
          <div className="col-span-3 text-center">
            <label className="flex items-center justify-center text-black font-medium text-lg mb-4">
              <FaImage className="mr-2 text-orange-500" /> Upload Image
            </label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="w-full p-2 border border-black rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500"
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
