const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const heroSchema = new Schema(
    {
      id: Number,
      name: String,
    },
    {
      collection: 'heroes',
      read: 'nearest',
    }
);
heroSchema.plugin(AutoIncrement, { inc_field: 'id'});

const Hero = mongoose.model('Hero', heroSchema);

module.exports = Hero;
