#include "MQTT.h"
#include <Arduino.h>

  const char* mqtt_sever="60294ba1a7534e358c2dc4bc7b7cc9f9.s1.eu.hivemq.cloud";
  const int mqtt_port=8883;
  const char* mqtt_user="esp8266_tuoicay";
  const char* mqtt_pass="QuanUyenVinh3tuoicay";

  const char* mqtt_topic1="ON/OFF_Relay";
  const char* mqtt_topic2="temperature_humidity";
  const char* mqtt_topic3="set_watering_time";
  const char* mqtt_topic4="set_watering_point";

  WiFiClientSecure espClient;
  PubSubClient client(espClient);

// 1: Hàm gửi dữ liệu nhiệt độ độ ẩm lên MQTT
void sendData_ToMQTT(float temperature, float humidity) 
{
  String payloadz1 = "{\"temperature\": " + String(temperature);
  String payloadz2 = "{\"humidity\": " + String(humidity);
  
  if (client.publish(mqtt_topic2, payloadz1.c_str()) && client.publish(mqtt_topic2, payloadz2.c_str())) 
  {
    Serial.println("gui toi to MQTT: " + payloadz1);
    Serial.println("gui toi to MQTT: " + payloadz2);
  } 
  else 
  {
    Serial.println("Failed to send data to MQTT.");
  }
}

// 2: hàm kết nối lại
void reconnect()
{
  while(!client.connected()) // nếu vẫn chưa kết nối
  {
    Serial.print("dang ket noi voi MQTT....");
    String clientId="ESP8266-";
    clientId+=String(random(0xffff),HEX);

  // kết nối được với..
    if(client.connect(clientId.c_str(),mqtt_user,mqtt_pass))
    {
      Serial.println("ket noi thanh cong");
      if(client.subscribe(mqtt_topic1)){Serial.println("Subscribed to topic1 successfully!");};// đăng ký topic1
      if(client.subscribe(mqtt_topic2)){Serial.println("Subscribed to topic2 successfully!");};// đăng ký topic2
      if(client.subscribe(mqtt_topic3)){Serial.println("Subscribed to topic3 successfully!");};// đăng ký topic3
      if(client.subscribe(mqtt_topic4)){Serial.println("Subscribed to topic4 successfully!");};// đăng ký topic4

    }
    else // nếu ko kết nối đc
    {
      Serial.print("that bai, ma loi: ");
      Serial.println(client.state()); // lấy mã lỗi nếu kết nối thất bại
      delay(3000);
    }
  }
}

// 3: xử lý tin nhắn từ MQTT
void callback(char* topic, byte* payload, unsigned int length) 
{
  // Kiểm tra xem tin nhắn có độ dài hợp lệ không
  if (length > 1) 
  {
    // 1: lấy ra dữ liệu
    char message[length + 1];  // Tạo một mảng mới để chứa chuỗi có ký tự kết thúc
    memcpy(message, payload, length);
    message[length] = '\0';  // Thêm ký tự kết thúc chuỗi
    String msg = String(message);
    msg.trim();

    Serial.print("da nhan lenh lenh la: <");
    Serial.print(msg);
    Serial.print(">:");
    Serial.println(msg.length());

    // 2.1: nếu là topic 1: ON thì bật đèn
    if (msg == "ON") 
    {
      Serial.println("_____Received 'ON' message from MQTT broker!_____");
      client.publish(mqtt_topic1, "da nhan duoc lenh 'ON' ");
      digitalWrite(LED, HIGH);
      t_truocOfLed = millis();// thiết bị thời gian 3 giây bắt đầu
      LedOn = true;
      point = 0;
    }

    // 2.2: topic 2: không có nhận mà chỉ gửi


    // 2.3: nếu là topic 3: thời gian tưới cây 
    else if(msg.startsWith("3:"))
    { 
      String x=msg.substring(3);// lấy từ index = 3
      watering_time=x.toInt();
      Serial.print("_____Received message from topic 3 of MQTT: ");
      client.publish(mqtt_topic3, "da nhan duoc lenh thay doi watering_time ");
      Serial.println(watering_time);
    }


    // 2.4: nếu là topic 4: thay đổi điểm tưới cây
    else if(msg.startsWith("4:"))
    {
      String x=msg.substring(3); //lấy từ index = 3
      Limit_point=(x.toInt())*1000;
      Serial.print("_____Received message from topic 4 of MQTT: ");
      client.publish(mqtt_topic4, "da nhan duoc lenh thay doi watering_point ");
      Serial.println(Limit_point);
    }
  } 
  
}