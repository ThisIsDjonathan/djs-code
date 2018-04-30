// Declara variáveis aux de cor
float r = 0;
float g = 0;
float b = 0;
float a = 0;

void setup() 
{
  // Tamanho da tela
  size(640, 320);
}

void draw() 
{
  // Se precionar o mouse, preenche a elipse sem cor (transparente)
  if (mousePressed) 
  {
    fill(500);
  }
  // Senão, gera cor aleatória e preenche com a cor
  else 
  {
    cor();
    fill(r, g, b, a);
  }
  
  // Desenha a elipse na posição X, Y do mouse com o tamanho de 80x80 pixels
  ellipse(mouseX, mouseY, 80, 80);
}   

// Gera cor RGB aleatória
void cor()
{
   r = random(0, 255);
   g = random(0, 255);
   b = random(0, 255);
   a = random(0, 255);
}