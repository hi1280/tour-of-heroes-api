const express = require('express');
const app = express();
const pino = require('pino')();
const boom = require('boom');
const compression = require('compression');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const routes = require('./routes');
const asyncMiddleware = require('./util');

app.use(compression());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', routes);

app.get('*', asyncMiddleware(async () => {
  throw boom.notFound();
}));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.output.statusCode)
      .json({error: {payload: err.output.payload.message}});
});

const port = process.env.PORT || '3000';
app.listen(port, () => pino.info(`API running on localhost:${port}`));

