"""
tutorial:
http://www.raywenderlich.com/24252/beginning-game-programming-for-teens-with-python


sounds and effects:
http://cdn3.raywenderlich.com/downloads/BB_Resources.zip

"""

# 1 - importa biblioteca 
import pygame 
from pygame.locals import *

import math
import random
import sys


#2 - inizializa o jogo e o tamanho da tela
pygame.init()
width, height = 800, 600
screen = pygame.display.set_mode((width, height))

badtimer = 100
badtimer1 = 0
badguys = [[640,100]]
healthvalue = 194


#flechas
acc = [0,0]
arrows = []

#teclas WASD
keys = [False, False, False, False]
playerpos = [200, 100] #player position. Onde ele desenha o player.

#3 - carrega as imagens(mas nao mostra)
player = pygame.image.load("C:/Users/djonathan.krause/Desktop/PythonGame/resources/images/vikingBarco.png") #add player
grass = pygame.image.load("C:/Users/djonathan.krause/Desktop/PythonGame/resources/images/grass.png") #add grama
castle = pygame.image.load("C:/Users/djonathan.krause/Desktop/PythonGame/resources/images/barco.png") #add castelo
arrow = pygame.image.load("C:/Users/djonathan.krause/Desktop/PythonGame/resources/images/peixeBala.png") #add flechas
badguyimg1 = pygame.image.load("C:/Users/djonathan.krause/Desktop/PythonGame/resources/images/badguy.png") #add inimigos
badguyimg = badguyimg1
healthbar = pygame.image.load("C:/Users/djonathan.krause/Desktop/PythonGame/resources/images/healthbar.png") #add barra de vida
health = pygame.image.load("C:/Users/djonathan.krause/Desktop/PythonGame/resources/images/health.png") #add vida
gameover = pygame.image.load("C:/Users/djonathan.krause/Desktop/PythonGame/resources/images/gameover.png") #add img gameover
youwin = pygame.image.load("C:/Users/djonathan.krause/Desktop/PythonGame/resources/images/youwin.png") #add img win


#4
running = 1
while running:
        badtimer -= 1
        #5 - limpa a tela antes de printar de novo
        screen.fill(0)
	#6 - printa os elementos
        #Printa bg azul
        for x in range(int(width / grass.get_width() + 1)):
                for y in range(int(height / grass.get_height() + 1)):
                        screen.blit(grass,(x*100, y*100))
        #Printa castelos
        screen.blit(castle, (15, 30))		
        screen.blit(castle, (15, 135))
        screen.blit(castle, (15, 240))
        screen.blit(castle, (15, 345))
        screen.blit(castle, (15, 450))
             
	#6.1 - Printa o player na posicao
        position = pygame.mouse.get_pos()
        #angle = math.atan2(position[1] - (playerpos[1] + 32), position[0] - (playerpos[0] + 26)) original
        angle = math.atan2(position[0] - (playerpos[0] + 300), position[1]) #gambiarra
        playerrot = pygame.transform.rotate(player, 360 - angle * 57.29)
        playerpos1 = (playerpos[0] - playerrot.get_rect().width / 2, playerpos[1] - playerrot.get_rect().height / 2)
        screen.blit(playerrot, playerpos1)

        #6.2 - Printa flechas
        for bullet in arrows:
                index = 0
                velx = math.cos(bullet[0]) * 10
                vely = math.sin(bullet[0]) * 10
                bullet[1] += velx
                bullet[2] += vely

                if bullet[1] < -64 or bullet[2] < -64 or bullet[2] > height:
                        arrows.pop(index)
                index += 1

                for projectile in arrows:
                        arrow1 = pygame.transform.rotate(arrow, 360 - projectile[0] * 57.29)
                        screen.blit(arrow1, (projectile[1], projectile[2]))
 
        # 6.3 - DesenhaInimigos
        if badtimer == 0:
                badguys.append([width, random.randint(50, height)])
                badtimer = 100 - (badtimer1*2)

        if badtimer1 >= 35:
                badtimer1 = 35
        else:
                badtimer1 += 5
        index = 0

        for badguy in badguys:
                if badguy[0] < -64:
                        badguys.pop(index)
                badguy[0] -= 7

                # 6.3.1 - Attack castle
                badrect = pygame.Rect(badguyimg.get_rect())
                badrect.top = badguy[1]
                badrect.left = badguy[0]
                if badrect.left < 64:
                        healthvalue -= random.randint(5, 20)
                        badguys.pop(index)

                #6.3.2 - Check for collisions
                index1 = 0
                for bullet in arrows:
                        bullrect = pygame.Rect(arrow.get_rect())
                        bullrect.left = bullet[1]
                        bullrect.top = bullet[2]
                        if badrect.colliderect(bullrect):
                                acc[0] += 1
                                badguys.pop(index)
                                arrows.pop(index1)
                                index1 += 1

                # 6.3.3 - Next bad guy
                index += 1

        for badguy in badguys:
                screen.blit(badguyimg, badguy)

        """        
        # 6.4 - Draw clock
        font = pygame.font.Font(None, 24)
        survivedtext = font.render(str((90000-pygame.time.get_ticks())/60000)+":"+str((90000-pygame.time.get_ticks())/1000%60).zfill(2), True, (0,0,0))
        textRect = survivedtext.get_rect()
        textRect.topright=[635,5]
        screen.blit(survivedtext, textRect)
        """

        # 6.5 - Desenha barra de vida
        screen.blit(healthbar, (5, 5))
        for health1 in range(healthvalue):
                screen.blit(health, (health1 + 8, 8))

        #lose
                #if health1 == 0:

	#7 - update da screen
        pygame.display.flip()
	
 


	#8 - loopa entre os eventos
        for event in pygame.event.get():
                #sai do jogo se chegar aqui
                if event.type == pygame.QUIT:
                        pygame.quit()
                        exit(0)

                #se o evento de mouse click for disparado
                if event.type == pygame.MOUSEBUTTONDOWN:
                        position = pygame.mouse.get_pos()
                        acc[1] += 1
                        arrows.append([math.atan2(position[1] - (playerpos1[1] + 32), position[0] - (playerpos1[0] + 26)),playerpos1[0] + 32,playerpos1[1] + 32])


        #movimenta o personagem
        key = pygame.key.get_pressed() 
        if key[pygame.K_w]:
                if playerpos[1] >= 5:
                        playerpos[1] -= 5
                else:
                        playerpos[1] = playerpos[1]
        if key[pygame.K_s]:
                if playerpos[1] <= (height - 5):
                        playerpos[1] += 5
                else:
                        playerpos[1] = playerpos[1]
        if key[pygame.K_a]:
                if playerpos[0] >= 10:
                        playerpos[0] -= 5
                else:
                        playerpos[0] = playerpos[0]
        if key[pygame.K_d]:
                if playerpos[0] <= width:
                        playerpos[0] += 5
                else:
                        playerpos[0] = playerpos[0]


        #10 - Win/Lose check
        if healthvalue <= 150:
                running=0
                exitcode=0
                print('game over')

# 11 - Win/lose display        
if exitcode == 0:
        screen.blit(gameover, (0,0))

else:
        pygame.font.init()
        screen.blit(youwin, (0,0))

while 1:
        for event in pygame.event.get():
                if event.type == pygame.QUIT:
                        pygame.quit()
                        exit(0)
        pygame.display.flip()
        key = pygame.key.get_pressed() 
        if key[pygame.K_r]:
                print('rokl')








