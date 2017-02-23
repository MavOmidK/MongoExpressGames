let mongoose = require('mongoose'); // imports the mongoose npm package

// create a model class
let gameSchema = mongoose.Schema({
    name: String,
    rating: String,
    cost: String
},
{
  collection: "games"
});

module.exports = mongoose.model('game', gameSchema);
