const User = require('./../models/userModel');

const updateEventsCount = async (userId) => {
    try {
        const Event = require('./../models/eventModel');
        const eventsCount = await Event.countDocuments({ userId: userId });
        await User.findByIdAndUpdate(userId, { eventsCount: eventsCount });
    } catch (err) {
        console.log('updateEventsCount helper error', err);
    }
};

const updateNextEventDate = async (userId) => {
    try {
        console.log('update entry');
        const Event = require('./../models/eventModel');
        const eventsCount = await Event.countDocuments({ userId: userId });
        if (eventsCount > 0) {
            const events = await Event.find({ userId: userId }).sort({ startDate: 'asc' });
            await User.findByIdAndUpdate(userId, { nextEventDate: events[0].startDate });
        }
    } catch (err) {
        console.log('updateNextEventDate helper error', err);
    }
};

module.exports.updateEventsCount = updateEventsCount;
module.exports.updateNextEventDate = updateNextEventDate;