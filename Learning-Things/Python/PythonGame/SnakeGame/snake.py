import pygame
from pygame.locals import *
 
 
pygame.init()




#tela
width, height = 800, 600
screen = pygame.display.set_mode((width, height))


#carrega as imagens(mas nao mostra)
snake = pygame.image.load("C:/Users/djonathan.krause/Desktop/Snake/snake.png") #add snake
objetivo = pygame.image.load("C:/Users/djonathan.krause/Desktop/Snake/objetivo.png") #add player

snakepos = [200, 100]

bg = (255, 240 , 230)

running = 1
while running:

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            exit(0)

    rotate = pygame.transform.rotate(snake, 180)
    screen.blit(rotate, snakepos)

                               
    screen.fill(bg)
    screen.blit(snake, (snakepos[0], snakepos[1]))
    pygame.display.flip()



    key = pygame.key.get_pressed()
    if key[pygame.K_w]:
        if snakepos[1] >= -50:
            snakepos[1] -= 1

    if key[pygame.K_s]:
        if snakepos[1] <= (height - 80):
            snakepos[1] += 1


    if key[pygame.K_a]:
            if snakepos[0] >= -50:
                    snakepos[0] -= 1

                
    if key[pygame.K_d]:
            if snakepos[0] <= (width - 80):
                    snakepos[0] += 1

    
