
int arraySize = 80;
int[] x = new int[arraySize];
int[] y = new int[arraySize];
int r, g, b = 0;

void setup() 
{ 
  size(600, 400);
  noStroke();
}

void draw() 
{
  background(0);
  
  // Diminui o valor do X, Y
  for (int i = arraySize - 1; i > 0; i--) 
  {
    x[i] = x[i-1];
    y[i] = y[i-1];
  }
  
  // Da a nova coordenada para o começo do array
  x[0] = mouseX;
  y[0] = mouseY;
  
  // Desenha a elipse
  for (int i = 0; i < arraySize; i++) 
  {
    ellipse(x[i], y[i], 50, 50);
    
    // Preenche com nova cor
    fill(randomR(), randomG(), randomB(), 102);
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