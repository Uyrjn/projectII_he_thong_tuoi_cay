// ==== /backend/services/mqttService.js ====
const mqtt = require('mqtt');
const config = require('../config');
const db = require('../models/db');

let client;

function connectMQTT() {
  client = mqtt.connect(config.mqtt.host, {
    port: config.mqtt.port,
    username: config.mqtt.username,
    password: config.mqtt.password
  });

  client.on('connect', () => {
    console.log('Connected to MQTT broker');
    client.subscribe(config.mqtt.topics.sensor);
  });

  client.on('message', (topic, message) => {
    if (topic === config.mqtt.topics.sensor) {
      const data = JSON.parse(message.toString());
      const { temperature, humidity } = data;
      db.query('INSERT INTO sensor_data (temperature, humidity) VALUES (?, ?)', [temperature, humidity]);
    }
  });
}

function publish(topic, message) {
  if (client && client.connected) {
    client.publish(topic, message);
  }
}

module.exports = { connectMQTT, publish };

