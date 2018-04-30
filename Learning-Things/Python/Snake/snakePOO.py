#!/usr/bin/env python
 
import pygame
from pygame.locals import *

import random

class JogoCobrinha:

    comprimento = 800
    altura = 600
    
    posCobra = [300, 300]
    movimento_em_x = 3
    movimento_em_y = 3

    numObjetivos = 0

    ecra = 0
    cobra = ""
    grass = ""
    objetivo = ""
    
    mudouRotacao = False
    teclaAnterior = []

    def __init__(self, pathRecursos):
        self.pathRecursos = pathRecursos 
        
        pygame.init()
        self.ecra = pygame.display.set_mode((self.comprimento, self.altura))

        self.cobra = self.carregaImagem("cobra.png")
        self.grass = self.carregaImagem("Grama.png")
        self.objetivo = self.carregaImagem("objetivo.png")



    def carregaImagem(self, nomeArquivo):
        imagem = pygame.image.load(self.pathRecursos + "/" + nomeArquivo)
        return imagem

    

    def mostraImagens(self):
        for x in range(int(self.comprimento / self.grass.get_width() + 1)):
                for y in range(int(self.altura / self.grass.get_height() + 1)):
                    self.ecra.blit(self.grass,(x*100, y*100))
                    
        self.ecra.blit(self.cobra, (self.posCobra[0], self.posCobra[1]))
            
        self.ecra.blit( self.objetivo, ( self.posObjetivo[0], self.posObjetivo[1]))
        self.numObjetivos += 1

        

    def movimentaPersonagem(self, teclaPressionada):
        
        if teclaPressionada[K_a]:
            if self.posCobra[0] >= 0:
                self.posCobra[0] -= self.movimento_em_x                
                self.rotacionaCobra(0)
         
        if teclaPressionada[K_d]:
            if self.posCobra[0] <= self.comprimento - 25:
                self.posCobra[0] += self.movimento_em_x                
                self.rotacionaCobra(180)
                
        if teclaPressionada[K_w]:
            if self.posCobra[1] >= 0:               
                self.posCobra[1] -= self.movimento_em_y                  
                self.rotacionaCobra(270)
         
        if teclaPressionada[K_s]:
            if self.posCobra[1] <= self.altura - 25:            
                self.posCobra[1] += self.movimento_em_y                  
                self.rotacionaCobra(90)

        self.teclaAnterior = teclaPressionada
                

    def rotacionaCobra(self, angulo):
        if self.mudouRotacao == False: 
            self.cobra = pygame.transform.rotate(self.cobra, angulo)
        self.mudouRotacao = True 
        
    
    def calculaColisao(self, imagemObjeto1, imagemObjeto2, posicaoObjeto1, posicaoObjeto2):
        objeto1Rect = pygame.Rect(imagemObjeto1.get_rect())
        objeto1Rect.top = posicaoObjeto1[1]
        objeto1Rect.left = posicaoObjeto1[0]

        objeto2Rect = pygame.Rect(imagemObjeto2.get_rect())
        objeto2Rect.top = posicaoObjeto2[1]
        objeto2Rect.left = posicaoObjeto2[0]

        if objeto1Rect.colliderect(objeto2Rect):
            self.numObjetivos = 0

            
                    
    def executa(self):
        while True:
            pygame.display.flip()
            
            if self.numObjetivos == 0:
                self.posObjetivo = [random.randint(5, self.comprimento), random.randint(5, self.altura)]
            
            self.mostraImagens()

            self.calculaColisao(self.cobra, self.objetivo, self.posCobra, self.posObjetivo)

            teclaPressionada = pygame.key.get_pressed()
         
            self.movimentaPersonagem(teclaPressionada)
                    
            for event in pygame.event.get():
                pass


class Main:
    jogo = JogoCobrinha("C:/Users/djonathan.krause/Desktop/Snake")
    
    jogo.executa()





