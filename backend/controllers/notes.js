const jwt = require('jsonwebtoken');
const noteRouter = require('express').Router();
const Note = require('../models/note');


/**
 * Returns a list of all notes of a user.
 */
noteRouter.get('/', async (request, response) => {

	// the authentication process starts here:
	const authorization = request.get('authorization'); // get token and check syntax:
    if (!authorization || !authorization.toLowerCase().startsWith('bearer ')) {
        return response.status(401).send({ error: 'missing token or invalid syntax' });
    }
	const token = authorization.substring(7); // remove the 'bearer ' part from the token, since we don't need it.
	let userObject;
	try {
		userObject = jwt.verify(token, process.env.SECRET); // try to decode and verify token
	} catch (e) {
		return response.status(401).send({ error: 'invalid token' }); // if it fails, return 401
	} // authentication done :)


	// find the notes in the database that match the user's id, then return them:
	const notes = await Note.find({user: userObject.id})
	response.json(notes);
});




/**
 * Returns a single note, identified by the id in the request URL.
 * TODO: add authorization
 */
noteRouter.get('/:id', async (request, response) => {

	// the authentication process starts here:
	const authorization = request.get('authorization'); // get token and check syntax:
    if (!authorization || !authorization.toLowerCase().startsWith('bearer ')) {
        return response.status(401).send({ error: 'missing token or invalid syntax' });
    }
	const token = authorization.substring(7); // remove the 'bearer ' part from the token, since we don't need it.
	let userObject;
	try {
		userObject = jwt.verify(token, process.env.SECRET); // try to decode and verify token
	} catch (e) {
		return response.status(401).send({ error: 'invalid token' }); // if it fails, return 401
	} // authentication done :)


	// find the note in the database, then return it:
	const note = await Note.findOne({_id: request.params.id});
	response.json(note);
});




/**
 * Accepts a note json object in the request's body and saves it to the notes database.
 * 
 * TODO: this uses the user id from the token, use username instead.
 */
noteRouter.post('/', async (request, response) => {

	// the authentication process starts here:
	const authorization = request.get('authorization'); // get token and check syntax:
    if (!authorization || !authorization.toLowerCase().startsWith('bearer ')) {
        return response.status(401).send({ error: 'missing token or invalid syntax' });
    }
	const token = authorization.substring(7); // remove the 'bearer ' part from the token, since we don't need it.
	let userObject
	try {
		userObject = jwt.verify(token, process.env.SECRET); // try to decode and verify token
	} catch (e) {
		return response.status(401).send({ error: 'invalid token' }); // if it fails, return 401
	} // authentication done :)


	// create a database object of the note...
	const note = new Note({
		note: request.body.note,
		user: userObject.id
	})
		
	// ... and save it in the database, then return the saved note in the response.
	const savedNote = await note.save();
	return response.json(savedNote);
});




/**
 * Deletes a note, identified by the id in the request URL.
 * 
 * TODO: this uses the user id from the token, use username instead.
 */
noteRouter.delete('/:id', async (request, response) => {

	// the authentication process starts here:
	const authorization = request.get('authorization'); // get token and check syntax:
    if (!authorization || !authorization.toLowerCase().startsWith('bearer ')) {
        return response.status(401).send({ error: 'missing token or invalid syntax' });
    }
	const token = authorization.substring(7); // remove the 'bearer ' part from the token, since we don't need it.
	let userObject;
	try {
		userObject = jwt.verify(token, process.env.SECRET); // try to decode and verify token
	} catch (e) {
		return response.status(401).send({ error: 'invalid token' }); // if it fails, return 401
	} // authentication done :)


	// search the data in the db, send 404 if it doesn't exist.
	const deletedData = await Note.findById(request.params.id);
	if (!deletedData) return response.status(404).send();

	// do an authorization check:
	if (deletedData.id !== userObject.id) 
		return response.status(403).send({ error: 'permission denied' });
	
	// delete the data and return 204:
	await deletedData.delete();
	response.status(204).send();
});


module.exports = noteRouter;