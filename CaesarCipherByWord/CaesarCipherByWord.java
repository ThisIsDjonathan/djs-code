package caeaser;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Random;

/**
 * @author djonathan.krause
 */
public class CaesarCipherByWord
{

    public static void main(String[] args)
    {
        System.out.println("Palavra desencriptada: " + desencripta(encripta("SenhaMarota")));
    }

    public static String encripta(String palavra)
    {
        //Instância a classe StringBuilder() usada para a manipulação de Strings
        StringBuilder palavraEncriptada = new StringBuilder();

        //Instancia a classe Random() 
        Random random = new Random();

        //Array de hashs
        ArrayList hashs = new ArrayList();

        for (int i = 0; i < palavra.length(); i++)
        {
            // Pega o caracter da posição i
            char caracter = palavra.charAt(i);

            // Gera um hash aleatório
            int hash = random.nextInt(100);

            //Add o hash gerado ao array de hashs
            hashs.add(hash);

            //Faz a encriptação da letra
            caracter = (char) (caracter + hash);

            //System.out.println("Caracter: " + caracter + " |  Hash: " + hashs.get(i));

            palavraEncriptada.append(caracter);
        }

        palavraEncriptada.append(hashs);

        System.out.println("Palavra Encriptada: " + palavraEncriptada.toString());

        return palavraEncriptada.toString();
    }

    public static String desencripta(String palavra)
    {
        StringBuilder palavraDesencriptada = new StringBuilder();

        //Encontra os Hashs dentro da String
        String string = palavra;
        String[] parts = string.split("\\[");
        String splitPalavra = parts[0]; // Palavra
        String splitHash = parts[1]; // Conteudo dos Colchetes);

        splitHash = splitHash.replace("]", "");

        //Transforma o splitHash num array
        String array = splitHash;
        String[] items = array.replaceAll("\\[", "").replaceAll("\\]", "").replaceAll("\\s", "").split(",");

        int[] arrayDeHashs = new int[items.length];

        for (int i = 0; i < items.length; i++)
        {
            arrayDeHashs[i] = Integer.parseInt(items[i]);
        }

        System.out.println("Array de Hashs: " + Arrays.toString(arrayDeHashs));
        
        //Define o tamanho da palavra sem os hashs para usar no for
        int tamanhoSplitHash = splitHash.length() + 2;
       
        //Descifra pra cada letra
        for (int i = 0; i < palavra.length() - tamanhoSplitHash; i++)
        {
            //Pega o char do caracter i
            char caract = palavra.charAt(i);
            
            //Desencripta o char i
            caract = (char) (caract - arrayDeHashs[i]);
            
            //Appenda na String de resultado
            palavraDesencriptada.append(caract);
            
            //System.out.println("Caracter: " + carac + " | Array: " + arrayDeHashs[i]);
        }

        return palavraDesencriptada.toString();
    }

}
