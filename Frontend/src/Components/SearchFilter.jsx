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
    <div className="p-4 border-2 border-orange-300 rounded-xl bg-gray-50 shadow-md w-[320px] max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">REFINE YOUR SEARCH</h2>

      <div className="mb-4">
        <label className="block mb-2 text-sm text-gray-700 flex items-center">
          <FaSearch className="mr-2 text-red-400 text-base" />
          <span>Search</span>
        </label>
        <input
          type="text"
          placeholder="Search..."
          name="searchTerm"
          value={searchParams.searchTerm || ""}
          onChange={handleChange}
          className="w-full border border-gray-300 px-3 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
        />
      </div>

      {[{ label: "Institute / Department / Centre", icon: <FaBuilding className="text-green-500 text-base" /> },
        { label: "By Location", icon: <FaMapMarkerAlt className="text-blue-500 text-base" /> },
        { label: "By Event Type", icon: <FaMusic className="text-purple-500 text-base" /> },
        { label: "By Audience Type", icon: <FaUsers className="text-orange-500 text-base" /> },
      ].map(({ label, icon }, index) => (
        <div key={index} className="mb-4">
          <label className="block mb-2 text-sm text-gray-700 flex items-center">
            {icon}
            <span className="ml-2">{label}</span>
          </label>
          <select
            name={label}
            value={searchParams[label] || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
          >
            <option value="">Select</option>
            {/* Add relevant options here */}
          </select>
        </div>
      ))}

      <div className="mb-4">
        <label className="block mb-2 text-sm text-gray-700 flex items-center">
          <FaCalendarAlt className="mr-2 text-yellow-500 text-base" />
          <span>From Date</span>
        </label>
        <input
          type="date"
          name="fromDate"
          value={searchParams.fromDate || ""}
          onChange={handleChange}
          className="w-full border border-gray-300 px-3 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm text-gray-700 flex items-center">
          <FaCalendarAlt className="mr-2 text-yellow-500 text-base" />
          <span>To Date</span>
        </label>
        <input
          type="date"
          name="toDate"
          value={searchParams.toDate || ""}
          onChange={handleChange}
          className="w-full border border-gray-300 px-3 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
        />
      </div>

      <button
        className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 text-sm"
        onClick={() => setSearchParams({})} // Reset filters
      >
        Clear Filters
      </button>
    </div>
  );
};


export default SearchFilter;
