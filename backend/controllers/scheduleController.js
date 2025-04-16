// ==== /backend/controllers/scheduleController.js ====
const express = require('express');
const db = require('../models/db');
const router = express.Router();

router.get('/schedule', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM watering_schedule');
  res.json(rows);
});

router.post('/schedule', async (req, res) => {
  const { hour, minute, repeat_days, active } = req.body;
  await db.query('INSERT INTO watering_schedule (hour, minute, repeat_days, active) VALUES (?, ?, ?, ?)', [hour, minute, repeat_days, active]);
  res.json({ message: 'Schedule added' });
});

router.delete('/schedule/:id', async (req, res) => {
  await db.query('DELETE FROM watering_schedule WHERE id = ?', [req.params.id]);
  res.json({ message: 'Schedule deleted' });
});

module.exports = router;
