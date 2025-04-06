#include "cac_bien.h"

bool LedOn=false;   // trạng thái vòi
unsigned long t_truocOfLed=0; // thời gian bắt đầu vòi bật
int watering_time=3000;  // thời gian tưới nước
int point=0;  // điểm của cảnh báo tưới nước hiện tại
int Limit_point=20;// khi point đạt max thì tự động tưới

float do_am=0;
float nhiet_do=0;

bool Oled_On=true;