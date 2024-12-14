const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");

router.get("/top", eventController.getTopEvents);
router.get("/", eventController.getAllEvents);
router.post("/", eventController.addEvent);
router.get("/details", eventController.getAllEventDetails);

module.exports = router;
