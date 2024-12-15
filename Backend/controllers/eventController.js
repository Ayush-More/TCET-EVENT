const Event = require("../models/Event");
const ErrorHandler = require("../utils/errorHandler");
const catchAsync = require("../utils/catchAsync");

// GET Top 8 Events
exports.getTopEvents = catchAsync(async (req, res, next) => {
  const events = await Event.find().limit(8).sort({ dateOfEvent: -1 });
  res.status(200).json({ success: true, data: events });
});

// GET All Events with Filters
exports.getAllEvents = catchAsync(async (req, res, next) => {
  const { eventType, startDate, endDate, location } = req.query;
  const filters = {};

  if (eventType) filters.typeOfActivity = eventType;
  if (startDate && endDate)
    filters.dateOfEvent = { $gte: startDate, $lte: endDate };
  if (location) filters.location = location;

  const events = await Event.find(filters);
  res.status(200).json({ success: true, data: events });
});

// POST Add Event
exports.addEvent = catchAsync(async (req, res, next) => {
  const event = new Event(req.body);
  await event.save();
  res.status(201).json({ success: true, data: event });
});

// GET All Event Details (Admin)
exports.getAllEventDetails = catchAsync(async (req, res, next) => {
  const { eventType, startDate, endDate, location } = req.query;
  const filters = {};

  if (eventType) filters.typeOfActivity = eventType;
  if (startDate && endDate)
    filters.dateOfEvent = { $gte: startDate, $lte: endDate };
  if (location) filters.location = location;

  const events = await Event.find(filters);
  res.status(200).json({ success: true, data: events });
});
