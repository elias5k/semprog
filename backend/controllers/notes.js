const jwt = require('jsonwebtoken');
const noteRouter = require('express').Router();
const Note = require('../models/note');
const User = require('../models/user');


/**
 * Returns a list of all notes of a user.
 */
noteRouter.get('/', async (request, response) => {

	// find the notes in the database that match the user's id, then return them:
	const notes = await Note.find({user: request.user._id})
	response.json(notes);
});




/**
 * Returns a single note, identified by the id in the request URL.
 * TODO: add authorization
 */
noteRouter.get('/:id', async (request, response) => {

	// check if note exists:
	const note = await Note.findOne({_id: request.params.id});
	if (!note) return response.status(404).send();

	// authorization check:
	if (note.user !== request.user._id.toString())
		response.status(403).send({ error: 'permission denied' });

	response.json(note);
});




/**
 * Accepts a note json object in the request's body and saves it to the notes database.
 * 
 * TODO: this uses the user id from the token, use username instead.
 */
noteRouter.post('/', async (request, response) => {

	// create a database object of the note...
	const note = new Note({
		note: request.body.note,
		user: request.user._id
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

	// search the data in the db, send 404 if it doesn't exist.
	const deletedData = await Note.findById(request.params.id);
	if (!deletedData) return response.status(404).send();

	// do an authorization check:
	if (deletedData.user !== request.user._id.toString()) 
		return response.status(403).send({ error: 'permission denied' });
	
	// delete the data and return 204:
	await deletedData.delete();
	response.status(204).send();
});


module.exports = noteRouter;