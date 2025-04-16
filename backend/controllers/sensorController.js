// ==== /backend/controllers/sensorController.js ====
const express = require('express');
const db = require('../models/db');
const router = express.Router();

router.get('/sensor/latest', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM sensor_data ORDER BY timestamp DESC LIMIT 1');
  res.json(rows[0]);
});

module.exports = router;
