const Event = require('./../models/eventModel');

const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();

        res.status(200).json({
            status: 'success',
            data: {
                events: events
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

const getEventsByUserId = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;
        const skip = (page - 1) * limit;

        let events = null;

        const numEvents = await Event.countDocuments({ userId: req.params.id });
        if (numEvents > 0) {
            const query = Event.find({ userId: req.params.id }).sort({ startDate: "desc" }).skip(skip).limit(limit);

            if (req.query.page) {
                if (skip >= numEvents) {
                    throw new Error('This page doesn\'t exist');
                }
            }

            events = await query;
        }

        res.status(201).json({
            status: 'success',
            numEvents,
            data: {
                events: events
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

const createEvent = async (req, res) => {
    try {
        const { updateEventsCount, updateNextEventDate } = require('./../helpers/userHelpers');
        const events = await Event.find({ startDate: { $lte: req.body.startDate }, endDate: { $gte: req.body.startDate } }).exec();
        
        if (events.length) {
            res.json({
                status: 'validation error',
                message: 'You can\'t create event for this time'
            });
            return;
        }

        const newEvent = await Event.create(req.body);
        const userId = req.body.userId;

        await updateEventsCount(userId);
        await updateNextEventDate(userId);

        res.status(201).json({
            status: 'success',
            data: {
                event: newEvent
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
}

const deleteEvent = async (req, res, next) => {
    try {
        const { updateEventsCount, updateNextEventDate } = require('./../helpers/userHelpers');
        const event = await Event.findByIdAndDelete(req.params.id);

        await updateEventsCount(event.userId);
        await updateNextEventDate(event.userId);

        res.status(200).json({
            status: 'success'
        });
    } catch (err) {
        console.log(err);
        res.status(404).json({
            status: 'fail'
        });
    }
}

module.exports.getAllEvents = getAllEvents;
module.exports.getEventsByUserId = getEventsByUserId;
module.exports.createEvent = createEvent;
module.exports.deleteEvent = deleteEvent;