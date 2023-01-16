const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const usersRouter = require('./routes/usersRouter');
const eventsRouter = require('./routes/eventsRouter');

const DB = process.env.DATABASE_LOCAL || 'mongodb://127.0.0.1:27017/test-project';

mongoose.set('strictQuery', true);
mongoose.connect(DB, {
    useNewUrlParser: true
}).then(con => { console.log('DB connection successful!'); });

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/users', usersRouter);
app.use('/api/events', eventsRouter);

app.listen(8000, () => console.log('Server has been started'));