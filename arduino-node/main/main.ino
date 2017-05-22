#include <dht11.h>
 
dht11 DHT11;

// Digital pins
#define MOTIONPIN 3
#define MAGNETPIN 4
#define AIRPIN 2

// Analog pins
#define SMOKEPIN 1
#define LIQUIDPIN 2
 
// SENSOR DYMU
int wartoscAnalog = 1;
byte wartoscZmapowana = 0;        
char info[96];

// SENSOR WODY
const int sensorPin= 0; //sensor poziomu wody na Analogu
int liquid_level; //zmienna za poziom

//SENSOR OTWARTYH DRZWI
int state; //stan otwartych drzwi - czujnik magnetyczny
int dym;

void handleDHT11() {
  int chk = DHT11.read(AIRPIN);         //sprawdzenie stanu sensora, a następnie wyświetlenie komunikatu na monitorze szeregowym
  switch (chk)
  {
    case DHTLIB_OK: 
        //Serial.print("OK\t"); 
        Serial.print("H");              //wyświetlenie wartości wilgotności
        Serial.print((float)DHT11.humidity, 2);
        Serial.print(";T");           //wyświetlenie temperatury
        Serial.print((float)DHT11.temperature, 2);
        Serial.print(";");
        break;
    case DHTLIB_ERROR_CHECKSUM: 
        Serial.println("DHT_CRCERR;"); 
        break;
    case DHTLIB_ERROR_TIMEOUT: 
        Serial.println("DHT_TIMEOUT;"); 
        break;
    default: 
        Serial.println("DHT_ERR;"); 
        break;
  }
}

void handleMotion() {
  Serial.print("M");
  if (digitalRead(MOTIONPIN) == 1){
    Serial.print("1"); 
  }
  else
  {
    Serial.print("0");
  }
  Serial.print(";");
}

void setup() {

// SENS OTWARTYCH DRZWI
  pinMode(MAGNETPIN, INPUT);   
  pinMode(MOTIONPIN, INPUT);    
  digitalWrite(MAGNETPIN, HIGH); // włączmy pull-up na wejściu 2 dla czujnika magentycznego

//SENSOR DYMU
 // pinMode(7, INPUT); //pin dla czujnika dymu
  
Serial.begin(9600); //Otwieramy port szeregowy
pinMode(LIQUIDPIN, INPUT);//Ustawienie pinu czujnika poziomu wody
}

void loop() {

handleDHT11();
handleMotion();
  
liquid_level= analogRead(LIQUIDPIN); //arduino reads the value from the liquid level sensor

  Serial.print("W");
  Serial.print(String(liquid_level));
  Serial.print(";");
  
if (digitalRead(MAGNETPIN) == 0){
  Serial.print("D1;"); 
}
else
{
  Serial.print("D0;");
}

//SENSOR DYMU

wartoscAnalog = analogRead(SMOKEPIN);
wartoscZmapowana = map(wartoscAnalog, 0, 1023, 0, 100);
Serial.print("S" + String(wartoscZmapowana) + ";");

delay(500);//Próbkuj co 1 sekundę
}
