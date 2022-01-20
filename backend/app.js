const express = require('express');
const app = express();

const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const noteRouter = require('./controllers/notes');

// connecting to database:
const config = require('./utils/config');
mongoose.connect(config.MONGODB_URI)
    .then(() => {
        console.log('connected to MongoDB');
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message);
    });

// defining all of the used middleware and routers:
app.use(cors()); // enables cross origin resource sharing
app.use(express.json()); // json parser for api requests

// TODO: add authentication with middleware
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use('/api/notes', noteRouter);

module.exports = app;