const Event = require('./../models/eventModel');

const removeAllEventsByUserId = async (userId) => {
    try {
        await Event.deleteMany({ userId: userId });
    } catch (err) {
        console.log('removeAllEventsByUserId helper error', err);
    }
}

module.exports.removeAllEventsByUserId = removeAllEventsByUserId;