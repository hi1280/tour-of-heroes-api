const express = require('express');
const app = express();
const pino = require('pino')();
const boom = require('boom');
const compression = require('compression');
const helmet = require('helmet');
const asyncMiddleware = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    if (!err.isBoom) {
      return next(boom.badImplementation(err));
    }
    next(err);
  });
};

app.use(compression());
app.use(helmet());

app.get('/heros', asyncMiddleware(async (req, res) => {
  res.status(200).json({'message': 'Hello World!'});
}));

app.get('*', asyncMiddleware(async (req, res) => {
  throw boom.notFound();
}));

app.use((err, req, res, next) => {
  res.status(err.output.statusCode)
      .json({'error': {'payload': err.output.payload.message}});
});

const port = process.env.PORT || '3000';
app.listen(port, () => pino.info(`API running on localhost:${port}`));
