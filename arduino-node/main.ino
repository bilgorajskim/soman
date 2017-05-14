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

void setup() {

// SENS OTWARTYCH DRZWI
  pinMode(2, INPUT);    
  digitalWrite(2, HIGH); // włączmy pull-up na wejściu 2 dla czujnika magentycznego

//SENSOR DYMU
 // pinMode(7, INPUT); //pin dla czujnika dymu
  
Serial.begin(9600); //Otwieramy port szeregowy
pinMode(sensorPin, INPUT);//Ustawienie pinu czujnika poziomu wody
}

void loop() {
              // czytamy stan wejścia dla czujnika magnetycznego
  state = digitalRead(2);
              //dym = digitalRead(7);
  
liquid_level= analogRead(sensorPin); //arduino reads the value from the liquid level sensor
if (liquid_level>0){

  Serial.print("W1;"); 
}
else 
  Serial.print("W0;"); 
if (state==0){

  Serial.print("D1;"); 
}
else
  Serial.print("D0;");

//SENSOR DYMU

wartoscAnalog = analogRead(A1);
wartoscZmapowana = map(wartoscAnalog, 0, 1023, 0, 100);
sprintf(info, "MQ-2: %d (%d)", wartoscAnalog, wartoscZmapowana);
if (wartoscZmapowana > 20) {
                //Serial.print(info);
  Serial.print(F(" S1;"));
  
}
else {
 Serial.print("S0;");
}
//Serial.print("1");
//delay(1000);//Próbkuj co 1 sekundę
}
