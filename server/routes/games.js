// imports the express object
let express = require('express');
// creates the router for our application
let router = express.Router();

// import mongoose connnection
let mongoose = require('mongoose');

// create the game object - represents a document in the games collection
let game = require('../models/games');








module.exports = router;