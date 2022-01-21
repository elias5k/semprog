const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('express-async-errors');

const authenticator = async (request, response, next) => {

	const authorization = request.get('authorization'); // get token and check syntax:
    if (!authorization || !authorization.toLowerCase().startsWith('bearer ')) {
        return response.status(401).send({ error: 'missing token or invalid syntax' });
    }

	const token = authorization.substring(7); // remove the 'bearer ' part from the token
	try {
		userToken = jwt.verify(token, process.env.SECRET); // try to decode and verify token
		user = await User.findOne({ username: userToken.username });
	} catch (e) {
		return response.status(401).send({ error: 'invalid token' }); // if it fails, return 401
	}

	// append user to request, so other parts of the request pipeline can access it:
	request.user = user;
	next();
}


const errorHandler = (error, request, response, next) => {
    logger.error(error.message);
    if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message });
    } else {
		return response.status(500).json({ error: 'internal server error' });
	}
};

module.exports = {
	authenticator,
	errorHandler
}