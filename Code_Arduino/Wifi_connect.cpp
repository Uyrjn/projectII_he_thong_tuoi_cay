#include "Wifi_connect.h"
#include <Arduino.h>

const char* ssid = "KhanhHuyen";  // Đổi thành tên WiFi của bạn
const char* password = "23272004";  // Đổi thành mật khẩu WiFi của bạn

void wifi_set()
{
    Serial.println("\nbat dau ket noi wifi...");
    WiFi.begin(ssid,password);
    Serial.print("dang ket noi wifi.1.2.3...");

    while (WiFi.status() != WL_CONNECTED) 
    {
        delay(500);
        Serial.print(".1.2.3...");
    }

    Serial.println("\n Ket noi WiFi thanh cong!");
    Serial.print(" dia chi IP: ");
    Serial.println(WiFi.localIP()); // In địa chỉ IP của ESP8266
}