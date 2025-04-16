// ==== /backend/config.js ====
module.exports = {
    mqtt: {
      host: 'mqtt://broker.hivemq.com',
      port: 8883,
      username: 'esp8266_tuoicay',
      password: 'QuanUyenVinh3tuoicay',
      topics: {
        relay: 'ON/OFF_Relay',
        sensor: 'temperature_humidity',
        setTime: 'set_watering_time',
        setPoint: 'set_watering_point'
      }
    },
    db: {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'iot_plant'
    }
  };