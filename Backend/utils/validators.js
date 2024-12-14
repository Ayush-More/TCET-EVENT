exports.validateEventInput = (data) => {
  const errors = {};
  if (!data.activityName || data.activityName.trim() === "")
    errors.activityName = "Activity name is required";
  if (!data.dateOfEvent) errors.dateOfEvent = "Date of event is required";
  if (
    !data.timeOfActivity ||
    !data.timeOfActivity.start ||
    !data.timeOfActivity.end
  ) {
    errors.timeOfActivity = "Start and end time are required";
  }
  return errors;
};
