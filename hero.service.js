const Hero = require('./hero.model');
const ReadPreference = require('mongodb').ReadPreference;
const pino = require('pino')();

require('./mongo').connect();

function getHeroes(_, res) {
  const docquery = Hero.find({}).select('-_id id name').read(ReadPreference.NEAREST);
  docquery
    .exec()
    .then(heroes => {
      res.status(200).json(heroes);
    })
    .catch(error => {
      res.status(500).json(error);
      return;
    });
}

function getHero(req, res) {
  const id = parseInt(req.params.id, 10)
  const docquery = Hero.findOne({ id }).select('-_id id name').read(ReadPreference.NEAREST);
  docquery
    .exec()
    .then(hero => {
      res.status(200).json(hero);
    })
    .catch(error => {
      res.status(500).json(error);
      return;
    });
}

function postHero(req, res) {
  const originalHero = { name: req.body.name };
  const hero = new Hero(originalHero);
  hero.save(error => {
    if (checkServerError(res, error)) return;
    res.status(201).json(hero);
    pino.info('Hero created successfully!');
  });
}

function putHero(req, res) {
  const originalHero = {
    id: parseInt(req.params.id, 10),
    name: req.body.name
  };
  Hero.findOne({ id: originalHero.id }, (error, hero) => {
    if (checkServerError(res, error)) return;
    if (!checkFound(res, hero)) return;

    hero.name = originalHero.name;
    hero.save(error => {
      if (checkServerError(res, error)) return;
      res.status(200).json(hero);
      pino.info('Hero updated successfully!');
    });
  });
}

function deleteHero(req, res) {
  const id = parseInt(req.params.id, 10);
  Hero.findOneAndRemove({ id: id })
    .then(hero => {
      if (!checkFound(res, hero)) return;
      res.status(200).json(hero);
      pino.info('Hero deleted successfully!');
    })
    .catch(error => {
      if (checkServerError(res, error)) return;
    });
}

function checkServerError(res, error) {
  if (error) {
    res.status(500).json(error);
    return error;
  }
}

function checkFound(res, hero) {
  if (!hero) {
    res.status(404).json('Hero not found.');
    return;
  }
  return hero;
}

module.exports = {
  getHeroes,
  getHero,
  postHero,
  putHero,
  deleteHero
};
