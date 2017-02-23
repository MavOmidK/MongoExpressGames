let mongoose = require('mongoose');

// create a model class
let gameSchema = mongoose.Schema({
    name: String,
    rating: Number,
    cost: Number
},
{
  collection: "games"
});

module.exports = mongoose.model('game', gameSchema);
