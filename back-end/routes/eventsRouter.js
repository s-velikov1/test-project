const express = require('express');

const eventsController = require('../controllers/eventsController');

const router = express.Router();

router
    .route('/')
    .get(eventsController.getAllEvents)
    .post(eventsController.createEvent);

router
    .route('/:id')
    .get(eventsController.getEventsByUserId)
    .delete(eventsController.deleteEvent);

module.exports = router;