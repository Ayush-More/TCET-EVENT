// const mongoose = require("mongoose");

// const EventSchema = new mongoose.Schema({
//   activityName: { type: String, required: true },
//   dateOfEvent: { type: Date, required: true },
//   activityHead: { type: String, required: true },
//   facultyAssigned: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Faculty",
//       validate: {
//         validator: async function (facultyId) {
//           const conflictingEvents = await this.constructor.find({
//             dateOfEvent: this.dateOfEvent,
//             "timeOfActivity.start": { $lt: this.timeOfActivity.end },
//             "timeOfActivity.end": { $gt: this.timeOfActivity.start },
//             facultyAssigned: facultyId,
//           });
//           return conflictingEvents.length === 0;
//         },
//         message:
//           "Faculty is already assigned to another event at the same time.",
//       },
//     },
//   ],
//   nonTeachingStaff: { type: [String] },
//   timeOfActivity: {
//     start: { type: String, required: true },
//     end: { type: String, required: true },
//   },
//   typeOfActivity: { type: String, required: true },
//   organizedBy: { type: String, required: true },
//   objective: { type: String },
//   outcomes: { type: String },
//   location: { type: String, required: true },
// });

// module.exports = mongoose.model("Event", EventSchema);


const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  activityName: { type: String, required: true },
  dateOfEvent: { type: Date, required: true },
  activityHead: { type: String, required: true },
  facultyAssigned: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty",
      validate: {
        validator: async function (facultyId) {
          const conflictingEvents = await this.constructor.find({
            dateOfEvent: this.dateOfEvent,
            "timeOfActivity.start": { $lt: this.timeOfActivity.end },
            "timeOfActivity.end": { $gt: this.timeOfActivity.start },
            facultyAssigned: facultyId,
          });
          return conflictingEvents.length === 0;
        },
        message: "Faculty is already assigned to another event at the same time.",
      },
    },
  ],
  nonTeachingStaff: { type: [String] },
  timeOfActivity: {
    start: { type: String, required: true },
    end: { type: String, required: true },
  },
  typeOfActivity: { type: String, required: true },
  organizedBy: { type: String, required: true },
  objective: { type: String },
  outcomes: { type: String },
  location: { type: String, required: true },
  image: { type: String }, // Store the path of the uploaded image
});

module.exports = mongoose.model("Event", EventSchema);
