// ==== /backend/controllers/pumpController.js ====
const express = require('express');
const mqttService = require('../services/mqttService');
const config = require('../config');
const router = express.Router();

let pumpState = 'OFF';

router.post('/pump/on-off', (req, res) => {
  const { state } = req.body;
  pumpState = state;
  mqttService.publish(config.mqtt.topics.relay, state);
  res.json({ message: `Pump turned ${state}` });
});

router.get('/pump/state', (req, res) => {
  res.json({ state: pumpState });
});

module.exports = router;
