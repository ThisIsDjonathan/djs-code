// Biblioteca:
#include <LiquidCrystal.h>

// initialize the library with the numbers of the interface pins
LiquidCrystal lcd(8,9,4,5,6,7);

//catacter personalizado coração 
byte heart[8] = 
{
  0b00000,
  0b01010,
  0b11111,
  0b11111,
  0b11111,
  0b01110,
  0b00100,
  0b00000
};

void setup() 
{
  //Cria um novo caracter
  lcd.createChar(1, heart);
 
  // seta o numero de colunas e linhas do LCD
  lcd.begin(16, 2);
  
  // Printa a msg
  lcd.print("Fucking caracter"); 
  lcd.setCursor(1, 2);
  lcd.print(" --> ");
  lcd.write(1);
}

void loop() 
{

}

