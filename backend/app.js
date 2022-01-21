const express = require('express');
const app = express();

const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const noteRouter = require('./controllers/notes');
const middleware = require('./utils/middleware');

// connecting to database:
const config = require('./utils/config');
mongoose.connect(config.MONGODB_URI)
    .then(() => { console.log('connected to MongoDB'); })
    .catch((error) => { console.log('error connecting to MongoDB:', error.message); });

// defining all of the used middleware and routers:
app.use(cors()); // enables cross origin resource sharing
app.use(express.json()); // json parser for api requests

// TODO: add authentication with middleware
app.use('/api/login', loginRouter); // no authentication required
app.use('/api/users', userRouter); // authentication added in router
app.use('/api/notes', middleware.authenticator, noteRouter); // authentication added here

app.use(middleware.errorHandler);

module.exports = app;