const { validateEventInput } = require("../utils/validators");

exports.validateEvent = (req, res, next) => {
  const errors = validateEventInput(req.body);
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }
  next();
};
