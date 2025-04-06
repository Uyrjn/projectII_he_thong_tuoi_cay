// 1: Module DHT22
#include "DHT22_hehe.h" // khai báo thư viện của mình
#define DHT_Ketnoi D2
#define DHT_Type DHT22
DHT dht(DHT_Ketnoi,DHT_Type);// khởi tạo đối tượng

// 2: LED
#include "LED_hehe.h" // khai báo thư viện của mk


// 3: Màn hình OLED
#include "OLED.h"

// 4: Kết nối wifi
#include "Wifi_connect.h"


// 5: kết nối HiveMQ 
#include "MQTT.h"

// 6: các biến
#include "cac_bien.h"
int t_check=millis();
int t_bat=millis();

// 7: button
#include "button.h"



void setup()
{

    // khởi tạo ban đầu
    Serial.begin(115200); 
    delay(500);


    // 1: DHT22 begin
    dht.begin(); // cho DHT chạy
    


    // 2: LED begin
    init_LED_LOW(LED);
   


    // 3: Wifi Begin
    wifi_set();
  
    
    // 4: Kết nối MQTT với TLS Begin
    espClient.setInsecure(); // Không kiểm tra chứng chỉ SSL
    client.setServer(mqtt_sever, mqtt_port);// kết nối
    client.setCallback(callback);// xử lý tin nhắn
    reconnect();

    // 5: Hiển thị OLED
    OLED_SET();

    // 6: nút nhấn 4 chân
    pinMode(BUTTON_PIN,INPUT_PULLUP);

    
}



void loop()
{
  
  // 1 gửi dữ liệu tới MQTT: cứ 5 giây thì gửi nhiệt độ độ ẩm lên HiveMQ
  do_am=dht.readHumidity();
  nhiet_do=dht.readTemperature();

  if(millis()-t_check>=5000)
  {
    

    t_check=millis();

    if (!isnan(nhiet_do) && !isnan(do_am)) // nếu ko bị lỗi thu dữ liệu thì gửi
    {
      sendData_ToMQTT(nhiet_do, do_am);
    } 
    else 
    {
      Serial.println("Ko nhan dc du lieu tu cam bien DHT.");
    }
  }



  // 2: sau 1 giây thì tính điểm và cập nhiệt nhiệt độ, độ ẩm lên OLED
  if(millis()-t_bat>=1000)// sau 1 giây thì cập nhập biến điểm point
  {
    // 2.1 cập nhật điểm
      t_bat=millis();
      if(LedOn==false)// nếu chưa tưới cây
      {
        if(nhiet_do>30 || do_am<70) // nóng hoặc khô
        {
          point+=2;
        }
        else {point+=1;}
        Serial.print("point= ");
        Serial.println(point);
      }
      else // đang tưới
      {
        Serial.print("point = ");
        Serial.println(point);
      }
      
      
    // 2.2 kiểm tra điểm max
      if(point >= Limit_point) // nếu nới điểm "Khát nước" thì tưới nước
      {
        digitalWrite(LED,HIGH);
        t_truocOfLed=millis();
        LedOn=true;
        point=0;
      }

  }

  // 2.3 in ra nhiệt độ, độ ẩm trên OLED
  if(Oled_On==true) OledPrint_Infor(nhiet_do,do_am); // in ra nhiệt độ độ ẩm trên OLED


  // 3: nếu thời gian tưới cây quá watering_time thì thiết lập lại
  if(LedOn==true && millis() - t_truocOfLed >= watering_time)
  {
    digitalWrite(LED,LOW);
    LedOn=false;
    point=0;
  }

  

  // 3: kết nối wifi nếu xịt begin
  if (WiFi.status() != WL_CONNECTED) 
    {
        Serial.println("Mat ket noi WiFi! Dang thu ket noi lai...");
        WiFi.disconnect();
        WiFi.begin(ssid, password);
    }



  // 4: MQTT begin
  if(!client.connected())
  {
    reconnect();// gọi hàm kết nối lại
  }
  client.loop(); // duy trì kết nối MQTT

  // 5: button begin
  button_loop();


  delay(200);

}