#include <dht11.h>

// Digital pins
#define MOTIONPIN 3
#define MAGNETPIN 4
#define MAGNETPIN2 5
#define AIRPIN 2

// Analog pins
#define SMOKEPIN 5
#define LIQUIDPIN 2
#define LIQUIDPIN2 3

// Digital LEDs
#define LED_LIQUIDPIN 13
#define LED_LIQUIDPIN2 12
#define LED_SMOKEPIN 11
#define LED_MOTIONPIN 10
#define LED_MAGNETPIN 9
#define LED_MAGNETPIN2 8

void handleDHT11() {
  dht11 DHT11;
  int chk = DHT11.read(AIRPIN);
  switch (chk)
  {
    case DHTLIB_OK:
        Serial.print("H:");
        Serial.print((float)DHT11.humidity, 2);
        Serial.print(";T:");
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
  int value = digitalRead(MOTIONPIN);
  Serial.print("M:" + String(value) + ";");
  if (value == 1) {
    digitalWrite(LED_MOTIONPIN, HIGH);
  }
  else {
    digitalWrite(LED_MOTIONPIN, LOW);
  }
}

void setup() {
  pinMode(SMOKEPIN, INPUT);   
  pinMode(AIRPIN, INPUT);   
  pinMode(MOTIONPIN, INPUT);    
  digitalWrite(MAGNETPIN, HIGH);
  digitalWrite(MAGNETPIN2, HIGH);
  pinMode(LED_LIQUIDPIN, OUTPUT);
  pinMode(LED_LIQUIDPIN2, OUTPUT);
  pinMode(LED_SMOKEPIN, OUTPUT);
  pinMode(LED_MOTIONPIN, OUTPUT);
  pinMode(LED_MAGNETPIN, OUTPUT);
  pinMode(LED_MAGNETPIN2, OUTPUT);
  Serial.begin(9600);
}

void handleLiquid1() {
  int value = analogRead(LIQUIDPIN);
  Serial.print("W1:" + String(value) + ";");
  if (value > 20) {
    digitalWrite(LED_LIQUIDPIN, HIGH);
  }
  else {
    digitalWrite(LED_LIQUIDPIN, LOW);
  }
}

void handleLiquid2() {
  int value = analogRead(LIQUIDPIN2);
  Serial.print("W2:" + String(value) + ";");
  if (value > 20) {
    digitalWrite(LED_LIQUIDPIN2, HIGH);
  }
  else {
    digitalWrite(LED_LIQUIDPIN2, LOW);
  }
}

void handleMagnet1() {
  int value = !digitalRead(MAGNETPIN);
  Serial.print("D1:" + String(value) + ";");
  if (value == 0) {
    digitalWrite(LED_MAGNETPIN, HIGH);
  }
  else {
    digitalWrite(LED_MAGNETPIN, LOW);
  }
}

void handleMagnet2() {
  int value = !digitalRead(MAGNETPIN2);
  Serial.print("D2:" + String(value) + ";");
  if (value == 0) {
    digitalWrite(LED_MAGNETPIN2, HIGH);
  }
  else {
    digitalWrite(LED_MAGNETPIN2, LOW);
  }
}

void handleSmoke() {
  int value = analogRead(SMOKEPIN);
  Serial.print("S:" + String(value) + ";");
  if (value > 250) {
    digitalWrite(LED_SMOKEPIN, HIGH);
  }
  else {
    digitalWrite(LED_SMOKEPIN, LOW);
  }
}

void loop() {
  handleDHT11();
  handleMotion();
  handleLiquid1();
  handleLiquid2();
  handleMagnet1();
  handleMagnet2();
  handleSmoke();
  delay(500);
}
