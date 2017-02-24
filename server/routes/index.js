// imports the express object
let express = require('express');
// creates the router for our application
let router = express.Router();
let mongoose = require('mongoose');

// create the game object - represents a document in the games collection
let game = require('../models/games');

/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Home'
   });
});

/* GET contact page. */
router.get('/contact', (req, res, next) => {
  res.render('content/contact', {
    title: 'Contact'
   });
});

module.exports = router;
