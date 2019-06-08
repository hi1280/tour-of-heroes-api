const Hero = require('./hero.model');
const ReadPreference = require('mongodb').ReadPreference;
const pino = require('pino')();

require('./mongo').connect();

function getHeroes(req, res) {
  const query = { key: req.query.key };
  if (req.query.name) {
    query.name = new RegExp(req.query.name, 'i');
  }
  const docquery = Hero.find(query).select('-_id id name').read(ReadPreference.NEAREST).limit(50);
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
  const query = {
    id,
    key: req.query.key
  }
  const docquery = Hero.findOne(query).select('-_id id name').read(ReadPreference.NEAREST);
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
  const originalHero = {
    name: req.body.name,
    key: req.query.key
  };
  const hero = new Hero(originalHero);
  hero.save(error => {
    if (checkServerError(res, error)) return;
    res.status(201).json({ id: hero.id, name: hero.name });
    pino.info('Hero created successfully!');
  });
}

function putHero(req, res) {
  const id = parseInt(req.params.id, 10)
  const originalHero = {
    id,
    name: req.body.name,
    key: req.query.key
  };
  Hero.findOne({ id: originalHero.id, key: originalHero.key }, (error, hero) => {
    if (checkServerError(res, error)) return;
    if (!checkFound(res, hero)) return;

    hero.name = originalHero.name;
    hero.save(error => {
      if (checkServerError(res, error)) return;
      res.status(200).json({ id: hero.id, name: hero.name });
      pino.info('Hero updated successfully!');
    });
  });
}

function deleteHero(req, res) {
  const id = parseInt(req.params.id, 10)
  const query = {
    id,
    key: req.query.key
  }
  Hero.findOneAndRemove(query)
    .then(hero => {
      if (!checkFound(res, hero)) return;
      res.status(200).json({ id: hero.id, name: hero.name });
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
