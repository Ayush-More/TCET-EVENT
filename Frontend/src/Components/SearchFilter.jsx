import React from "react";
import { FaSearch, FaBuilding, FaMapMarkerAlt, FaMusic, FaUsers, FaCalendarAlt } from "react-icons/fa";

const SearchFilter = ({ searchParams, setSearchParams }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prevParams) => ({
      ...prevParams,
      [name]: value,
    }));
  };

  return (
    <div className="p-6 border rounded-md bg-gray-50 shadow-xl w-[300px] max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">REFINE YOUR SEARCH</h2>

      {/* Search Input */}
      <div className="mb-6">
        <label className="block mb-2 text-lg text-gray-700 flex items-center">
          <FaSearch className="mr-2 text-red-400 text-xl" />
          <span>Search</span>
        </label>
        <input
          type="text"
          placeholder="Search..."
          name="searchTerm"
          value={searchParams.searchTerm}
          onChange={handleChange}
          className="w-full border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition-all text-lg"
        />
      </div>

      {/* Dropdowns */}
      {[
        { label: "Institute / Department / Centre", icon: <FaBuilding className="text-green-500 text-xl" /> },
        { label: "By Location", icon: <FaMapMarkerAlt className="text-blue-500 text-xl" /> },
        { label: "By Event Type", icon: <FaMusic className="text-purple-500 text-xl" /> },
        { label: "By Audience Type", icon: <FaUsers className="text-orange-500 text-xl" /> },
      ].map(({ label, icon }, index) => (
        <div key={index} className="mb-6">
          <label className="block mb-2 text-lg text-gray-700 flex items-center">
            {icon}
            <span className="ml-2">{label}</span>
          </label>
          <select
            name={label}
            value={searchParams[label]}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition-all text-lg"
          >
            <option>Select</option>
          </select>
        </div>
      ))}

      {/* Date Pickers */}
      <div className="mb-6">
        <label className="block mb-2 text-lg text-gray-700 flex items-center">
          <FaCalendarAlt className="mr-2 text-yellow-500 text-xl" />
          <span>From Date</span>
        </label>
        <input
          type="date"
          name="fromDate"
          value={searchParams.fromDate}
          onChange={handleChange}
          className="w-full border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition-all text-lg"
        />
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-lg text-gray-700 flex items-center">
          <FaCalendarAlt className="mr-2 text-yellow-500 text-xl" />
          <span>To Date</span>
        </label>
        <input
          type="date"
          name="toDate"
          value={searchParams.toDate}
          onChange={handleChange}
          className="w-full border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition-all text-lg"
        />
      </div>

      {/* Clear Filters Button */}
      <button
        className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition-all text-lg"
        onClick={() => setSearchParams({})} // Reset filters
      >
        Clear Filters
      </button>
    </div>
  );
};

export default SearchFilter;
