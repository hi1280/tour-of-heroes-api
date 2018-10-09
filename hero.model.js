const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const heroSchema = new Schema(
    {
      name: String,
      key: String
    },
    {
      collection: 'heroes',
      read: 'nearest',
    }
);
heroSchema.plugin(AutoIncrement, { id: 'id_seq', inc_field: 'id', reference_fields:['key']});

const Hero = mongoose.model('Hero', heroSchema);

module.exports = Hero;
