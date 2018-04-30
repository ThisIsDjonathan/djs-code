package caeaser;


import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Random;
import javax.swing.JOptionPane;

/*
 * @authors Djonathan and Rodrigo
 * Exemplo impl md5: http://www.devmedia.com.br/md5-java-em-poucas-linhas/17213
 * Como funciona o algoritimo md5: https://www.ietf.org/rfc/rfc1321.txt
 */
public class CaesarMD5
{

    public static void main(String args[]) throws Exception
    {
        //Encripta a palavra utilizando o MD5
        String md5 = encripta_md5("senha");
        System.out.println("Encriptação MD5: " + md5);
        
        //Encripta o resultado do MD5 utilizando a cifra de cesar
        String cesarMD5 = encripta_cesar(md5, 1);
        System.out.println("Encriptação Cesar + MD5: " + cesarMD5);
        
        
        //Desencripta o cesar para o MD5 original
        cesarMD5 = desencripta_cesar(cesarMD5, 1);
        System.out.println("Desencriptação Cesar + MD5: " + cesarMD5);
        
        System.out.println("");
        System.out.println(md5);
        System.out.println(cesarMD5);
    }

    //Encriptação com MD5
    public static String encripta_md5(String palavra) throws NoSuchAlgorithmException
    {
        //Nova instância da classe
        MessageDigest digest = MessageDigest.getInstance("MD5");

        //Efetua a encriptação por CaesarMD5
        digest.update(palavra.getBytes(), 0, palavra.length());
        String md5_encriptado = new BigInteger(1, digest.digest()).toString(16); //gera o md5

        return md5_encriptado;
    }

    //Encriptação com cifra de Cesar
    public static String encripta_cesar(String palavra, int chave)
    {
        //Instancia um novo StringBuilder (Permite manipular strings mais facilmente)
        StringBuilder builder = new StringBuilder();

        //Pra cada letra da palavra, faz a cifra de cesar 
        for (int letra = 0; letra < palavra.length(); letra++)
        {
            //pega a letra atual + a chave
            char letra_cifrada = (char) (palavra.charAt(letra) + chave);
            
            //appenda o resultado no builder 
            builder.append(letra_cifrada);
        }

        //Retorna a palavra encriptada
        return builder.toString();
    }

    //Desencriptação da crifra de Cesar
    public static String desencripta_cesar(String palavra, int chave)
    {
        //retorna a encriptação passando a chave negativa
        return encripta_cesar(palavra, -chave);
    }

    
    
    
    
    
    
    
    /* TENTATIVA DE ENCRIPTAÇÃO SEM PASSAR UM HASH ESPECÍFICO - IN PROGRESS*/
    public static String encripta_cesar_sem_hash(String palavra)
    {
        //Istancia a classe StringBuilder()
        StringBuilder builder = new StringBuilder();
        
        //Istancia a classe Random()
        Random random = new Random();

        //Gera um número aleatório entre 10 e 99
        //padrao MAX - MIN + 1 + MIN
        int hash = random.nextInt((99 - 10) + 1) + 10;
        
        //Mostra o hash
        System.out.println("Hash: " + hash);
        
        int tamanhoPalavra = palavra.length();
        
        //Faz um for pra cada caracter da palavra
        for(int caracter = 0; caracter < tamanhoPalavra; caracter++)
        {
            //Se for o último  caracter, add o hash
            if(caracter == tamanhoPalavra - 1)
            {
                builder.append(hash);
            }
            else //Senao continua cifrando
            {
                char carac = palavra.charAt(caracter);
                carac = (char) (carac + hash);

                builder.append(carac);
            }
        }
        
        //Mostra o resultado
        System.out.println(builder.toString());
                
        return builder.toString();
    }
    
    public static String desencripta_cesar_sem_hash(String palavra)
    {
        System.out.println("______________________");
        
        StringBuilder builder = new StringBuilder();
        StringBuilder hash = new StringBuilder();
        int hashInt = 0;
        int tamanhoPalavra = palavra.length();
        
        //Percorre todas as letras da palavra
        for(int caracter = 0; caracter < tamanhoPalavra; caracter++)
        {
            //Se for o último caracter, descobre o hash
            if(caracter == tamanhoPalavra - 1)
            {
                hash.append(palavra.charAt(caracter - 1));
                hash.append(palavra.charAt(caracter));
                
                //Transforma o hash em int
                hashInt = Integer.parseInt(hash.toString());
            }
            else
            {
                //Se for o penúltimo caracter, não appenda no resultado
                if(caracter != tamanhoPalavra - 2)
                    builder.append(palavra.charAt(caracter));
            }
        }
        
        System.out.println("Hash: " + hashInt);
        System.out.println("Encriptado sem o hash: " + builder.toString());
        
        System.out.println("Desencriptado: " + desencripta_cesar(builder.toString(), hashInt));
        System.out.println(desencripta_cesar("}}", 28));
        
        return desencripta_cesar(builder.toString(), hashInt);
        
    }

}
