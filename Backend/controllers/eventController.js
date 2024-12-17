// const Event = require("../models/Event");
// const ErrorHandler = require("../utils/errorHandler");
// const catchAsync = require("../utils/catchAsync");

// // GET Top 8 Events
// exports.getTopEvents = catchAsync(async (req, res, next) => {
//   const events = await Event.find().limit(8).sort({ dateOfEvent: -1 });
//   res.status(200).json({ success: true, data: events });
// });

// // GET All Events with Filters
// exports.getAllEvents = catchAsync(async (req, res, next) => {
//   const { eventType, startDate, endDate, location } = req.query;
//   const filters = {};

//   if (eventType) filters.typeOfActivity = eventType;
//   if (startDate && endDate)
//     filters.dateOfEvent = { $gte: startDate, $lte: endDate };
//   if (location) filters.location = location;

//   const events = await Event.find(filters);
//   res.status(200).json({ success: true, data: events });
// });

// // POST Add Event
// exports.addEvent = catchAsync(async (req, res, next) => {
//   const event = new Event(req.body);
//   await event.save();
//   res.status(201).json({ success: true, data: event });
// });

// // GET All Event Details (Admin)
// exports.getAllEventDetails = catchAsync(async (req, res, next) => {
//   const { eventType, startDate, endDate, location } = req.query;
//   const filters = {};

//   if (eventType) filters.typeOfActivity = eventType;
//   if (startDate && endDate)
//     filters.dateOfEvent = { $gte: startDate, $lte: endDate };
//   if (location) filters.location = location;

//   const events = await Event.find(filters);
//   res.status(200).json({ success: true, data: events });
// });
const Event = require("../models/Event");
const ErrorHandler = require("../utils/errorHandler");
const catchAsync = require("../utils/catchAsync");
const path = require("path");

// Middleware for handling image upload
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });


exports.getTopEvents = catchAsync(async (req, res, next) => {
  const events = await Event.find().limit(8).sort({ dateOfEvent: -1 });
  res.status(200).json({ success: true, data: events });
});


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


exports.addEvent = [
  upload.single("image"),
  catchAsync(async (req, res, next) => {
    const { body, file } = req;
    const event = new Event({
      ...body,
      image: file ? `/uploads/${file.filename}` : null,
    });
    await event.save();
    res.status(201).json({ success: true, data: event });
  }),
];
// Define the getAllEventDetails function in your eventController.js
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

