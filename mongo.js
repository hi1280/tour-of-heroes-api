const mongoose = require('mongoose');
require('dotenv').config();

mongoose.Promise = global.Promise;

const mongoUri = process.env.DB_URI || `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

function connect() {
  if(process.env.NODE_ENV !== 'production'){
    mongoose.set('debug', true);
  }
  return mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
  });
}

module.exports = {
  connect,
  mongoose,
};
