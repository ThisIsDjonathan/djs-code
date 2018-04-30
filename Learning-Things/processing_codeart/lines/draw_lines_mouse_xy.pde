void setup() 
{
  // Tamanho da tela
  size(600, 400);

  // Cor da linha
  stroke(255);
}

// Declara variáveis
int comecoX;
int comecoY;

// Desenha
void draw() 
{
  // Se o mouse for precionado, desenha linha
  if(mousePressed)
  {
    // Se a variavel for 0, seta a linha inicial onde o mouse esta
    if(comecoX == 0)
    {
      comecoX = mouseX;
      comecoY = mouseY;
    }
    
    // Seta nova cor da linha
    stroke(randomR(), randomG(), randomB());
    
    // Desenha linha onde o X, Y inicial é o X, Y final da linha anterior
    line(comecoX, comecoY, mouseX, mouseY);
    comecoX = mouseX;
    comecoY = mouseY;
  }
}

/* Gera random RGB */
int randomR()
{
  float r = random(0, 255);
  return (int) r;
}

int randomG()
{
  float g = random(0, 255);
  return (int) g;
}

int randomB()
{
  float b = random(0, 255);
  return (int) b;
}