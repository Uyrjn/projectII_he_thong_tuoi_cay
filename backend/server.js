// ==== /backend/server.js ====
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const mqttService = require('./services/mqttService');
const db = require('./models/db');
const userRoutes = require('./controllers/userController');
const pumpRoutes = require('./controllers/pumpController');
const sensorRoutes = require('./controllers/sensorController');
const scheduleRoutes = require('./controllers/scheduleController');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api', userRoutes);
app.use('/api', pumpRoutes);
app.use('/api', sensorRoutes);
app.use('/api', scheduleRoutes);

mqttService.connectMQTT();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

