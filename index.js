const express = require('express');
const app = express();
const cors = require('cors')
const pino = require('pino')();
const boom = require('boom');
const compression = require('compression');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const routes = require('./routes');
const auth = require('./auth');
const asyncMiddleware = require('./util');
const { check, validationResult } = require('express-validator/check');

app.use(auth);
app.use(compression());
app.use(helmet());
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', [
  check('key').exists()
],
(req, _res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    throw boom.badData();
  }
  next();
}, routes);

app.all('*', asyncMiddleware(async () => {
  throw boom.notFound();
}));

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  pino.error(err);
  res.status(err.output.statusCode)
      .json({error: {payload: err.output.payload.message}});
});

const port = process.env.PORT || '3000';
app.listen(port, () => pino.info(`API running on localhost:${port}`));
