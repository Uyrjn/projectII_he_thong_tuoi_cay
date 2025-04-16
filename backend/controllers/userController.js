// ==== /backend/controllers/userController.js ====
const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../models/db');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
  if (rows.length > 0) return res.status(409).json({ message: 'Username exists' });
  const hash = await bcrypt.hash(password, 10);
  await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hash]);
  res.json({ message: 'Registered successfully' });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
  if (rows.length === 0) return res.status(401).json({ message: 'User not found' });
  const match = await bcrypt.compare(password, rows[0].password);
  if (!match) return res.status(401).json({ message: 'Wrong password' });
  res.json({ message: 'Login successful' });
});

module.exports = router;