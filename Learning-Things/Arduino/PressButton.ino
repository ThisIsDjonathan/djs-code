// include the library code:
#include <LiquidCrystal.h>

// initialize the library with the numbers of the interface pins
LiquidCrystal lcd(8, 9, 4, 5, 6, 7);

void setup() 
{
  // set up the LCD's number of columns and rows:
  lcd.begin(16, 2);
  
  // Print a message to the LCD.
  lcd.setCursor(0,0);
  lcd.print("Precione");
  lcd.setCursor(0,1);
  lcd.print("um botao");
}

void loop() 
{
  int x;
  x = analogRead (0);
  
  lcd.setCursor(10,1);
  if (x < 60) 
  {
    lcd.print ("--->  ");
  }
  
  else if (x < 200) 
  {
    lcd.print ("Cima  ");
  }
  
  else if (x < 400)
  {
    lcd.print ("Baixo ");
  }
  
  else if (x < 600)
  {
    lcd.print ("<---  ");
  }
  
  else if (x < 800)
  {
    lcd.print ("Select");
  }
}

