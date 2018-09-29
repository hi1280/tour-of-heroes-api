const express = require('express');
const router = express.Router();
const asyncMiddleware = require('./util');
const heroService = require('./hero.service');

const API_URL = '/heroes';

router.get(API_URL, asyncMiddleware(async (req, res) => {
  heroService.getHeroes(req, res);
}));

router.get(`${API_URL}/:id`, asyncMiddleware(async (req, res) => {
  heroService.getHero(req, res);
}));

router.post(API_URL, asyncMiddleware(async (req, res) => {
  heroService.postHero(req, res);
}));

router.put(`${API_URL}/:id`, asyncMiddleware(async (req, res) => {
  heroService.putHero(req, res);
}));

router.delete(`${API_URL}/:id`, asyncMiddleware(async(req, res) => {
  heroService.deleteHero(req, res);
}));

module.exports = router;
