const userRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const middleware = require('../utils/middleware');
require('express-async-errors');


/**
 * This route is used to register new users, which is a public feature,
 * so this does not need authentication or authorization.
 */
userRouter.post('/', async (request, response) => {

	// first we do some checks to see if the input is valid:
    const body = request.body;
    if (!body.username || !body.password) {
        return response.status(400).json({ error: 'missing username or password' });
    } else if (body.username.length < 3 || body.password.length < 3) {
        return response.status(400).json({ error: 'username & password require a minimum length of 3' });
    }

	// then we encrypt the password:
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);
	
	// we create a database object...
    const user = new User(
		{
			username: body.username,
			name: body.name,
			passwordHash: passwordHash,
			role: 'user'
		}
	);

	// ... then store it in the database:
    const savedUser = await user.save();

	// remove internal information and return object:
	const userObject = savedUser.toJSON();
	delete userObject.id;
	delete userObject.role;
    response.json(userObject);
});




/**
 * This route responds with a list of all registered users.
 * It is used by the admin dashboard, so this should ensure only admins can retrieve this data.
 */
userRouter.get('/', middleware.authenticator, async (request, response) => {
	
	// this is the authorization check:
	if (request.user.role !== 'admin') {
		return response.status(403).send({ error: 'permission denied' });
	}

	// get all users from the db and return them in the response's body as a json array:
    response.json(await User.find({}));
});




/**
 * This route is used by the admin dashboard to promote or demote users.
 * To change a users' role, send a request to this path and add the users' id at the end of the url
 * like this: "http://.../api/users/<id here>"
 * In the request body, add a json object with a "role" key and either "admin" or "user" as value.
 * 
 * TODO: add role authorization!
 */
userRouter.put('/:id', middleware.authenticator, async (request, response) => {
	
	// this is the authorization check:
	if (request.user.role !== 'admin') {
		return response.status(403).send({ error: 'permission denied' });
	}
	
	// get the user from the database and check if it actually exists:
	const promotedUser = await User.findById(request.params.id);
	if (!promotedUser) return response.status(404).send();

	// check if the request is a promotion or demotion, set the role of the user accordingly:
	if (request.body.role === 'admin') {
		promotedUser.role = 'admin';
	} else if (request.body.role === 'user') {
		promotedUser.role = 'user';
	} else {
		return response.status(409).send({ error: 'invalid role provided' });
	} 

	// save the changes to the user and return the updated user object in the response:
	await promotedUser.save();
	response.json(promotedUser);
});


module.exports = userRouter;