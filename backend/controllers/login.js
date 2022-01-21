const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');


/**
 * Accepts a username and password in the request's body;
 * if the data is valid, returns a json web token. 
 * 
 * The user can use this token to prove their identity to protected API endpoints and
 * access their private data.
 */
loginRouter.post('/', async (request, response) => {

	// get the login data from the request, search the DB for a user that matches:
	const body = request.body;
	const user = await User.findOne({ username: body.username });

	// check if the provided login data is valid:
	const validData = user === null 
		? false 
		: await bcrypt.compare(body.password, user.passwordHash);
	if (!validData) return response.status(401).json({ error: "invalid username or password" });
	
	// prepare the data saved within the json web token:
	const userObject = { username: user.username }

	// create the token and send it back in the response, along with additional information:
	const token = jwt.sign(userObject, process.env.SECRET);
	response.json({
		token,
		role: user.role,
		username: user.username,
		name: user.name
	});
});


module.exports = loginRouter;