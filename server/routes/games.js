// imports the express object
let express = require('express');
// creates the router for our application
let router = express.Router();

// import mongoose connnection
let mongoose = require('mongoose');

// create the game object - represents a document in the games collection
let game = require('../models/games');

/* GET games page. */
router.get('/', (req, res, next) => {
  // find all games in the games collection

  game.find((err, games) => {

    if (err) {
      return console.error(err);
    }
    else {
      res.render('games/index', {
        title: 'Games',
        games: games
      });
    }
  });
});

  // GET add page - show the BLANK details pager
  router.get('/add', (req, res, next) =>{
    res.render('games/details', {
      title: 'Add a New Game',
      games: ''
    });

  
  });

  // POST add page
  router.post('/add', (req, res, next) =>{
    game.create({
      "name" : req.body.name,
      "cost": req.body.cost,
      "rating": req.body.rating
      }, (err, game) => {
      if(err){
      console.log(err);
      res.end(err);
    }
    else{
      res.redirect('/games');
    }
    });
  })

/* GET edit - show current game to edit */
router.get('/:id', (req, res, next) => {
    // get a ference to the ID of the game to edit
    let id = req.params.id;

    //find the game to edit by it's ID in the games collection    
    game.findById(id, (err, games) =>{

        if(err){
            console.error(err);
            res.end(error);
        }
        else{
            // show the edit view
            res.render('games/details', {
              title: 'Games',
              games: games
            });
        }
    });
});

/* GET edit - proccess the game to edit */
router.post('/:id', (req, res, next) => {
    // get a ference to the ID of the game to edit
    let id = req.params.id;

    // create a new games object to hold the changes
    let games = new game({
      "_id": id,
      "name": req.body.name,
      "cost": req.body.cost,
      "rating": req.body.rating
    });    
    
    game.update({ _id: id}, games, (err) => {
      if (err){
        console.log(err);
        res.end(error);
      }
      else{
        res.redirect('/games');
      }
    });
});

// GET delete - should delete by id
router.get('/delete/:id', (req, res, next) => {
  let id = req.params.id;

  game.remove({_id: id}, (err) =>{
    if (err){
      console.log(err);
      res.end(err);
    }
    else{
      res.redirect('/games');
    }
  });
});

module.exports = router;