#include "OLED.h"


Adafruit_SSD1306 Display_Oled(128,64,&Wire,-1);

void OLED_SET()
{
  Wire.begin(D4,D3);
  // kết nối với OLED
  if(!Display_Oled.begin(SSD1306_SWITCHCAPVCC, 0x3C))
  {
    Serial.println(F("Khong the khoi tao OLED!"));
  }
  else
  {
    Display_Oled.clearDisplay(); //xóa màn hình ban đầu;
    Display_Oled.setTextSize(1); // cài đặt kích thước chữ
    Display_Oled.setTextColor(SSD1306_WHITE);

    Display_Oled.setCursor(1,0); // vị trí bắt đầu chữ
    Display_Oled.println("Ta Minh Quan");

    Display_Oled.display();
  }
}

void OledPrint_Infor(float nhiet_do,float do_am)
{
    Display_Oled.clearDisplay();

    Display_Oled.setCursor(1,0); // vị trí bắt đầu chữ
    Display_Oled.println("Ta Minh Quan\n");

    //Display_Oled.setCursor(1,16); 
    Display_Oled.print("Temperature: ");

    //Display_Oled.setCursor(78,16);
    Display_Oled.println(nhiet_do);

    //Display_Oled.setCursor(1,36);
    Display_Oled.print("\nHumidity   : ");

   // Display_Oled.setCursor(78,36);
    Display_Oled.println(do_am);

    Display_Oled.display();
}







