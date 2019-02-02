package desafiobenner;

import java.io.BufferedWriter;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.util.Scanner;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Djonathan
 */
public class SuperDigit
{
    public void superDigit()
    {
        // Pega input
        Scanner input = new Scanner(System.in);
        
        int valor = input.nextInt();
        int vezes = input.nextInt();
        String valorTotal = "";
        int resultado = 0;

        // Concatena o valor x n vezes
        String valorConcatenado = concatenaValor(valor, vezes);
                
        // Soma o valor carac por carac
        System.out.println(somaValores(valorConcatenado));
        
        int resultadoFinal = somaValores(valorConcatenado);
        BufferedWriter log = new BufferedWriter(new OutputStreamWriter(System.out));

        try
        {
            log.write(resultadoFinal);
            log.flush();
        } catch (IOException ex)
        {
            Logger.getLogger(SuperDigit.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        
        //148 3
    }
    
    /**
     * Concatena o valor X N vezes
     * @param valor - valor que será concatenado
     * @param vezes - vezes que o valor será concatenado
     * @return valorConcatenado
     */
    public String concatenaValor(int valor, int vezes)
    {
        String concatenado = "";
        
        for(int i = 0; i < vezes; i++)
            concatenado += valor;
        
        return concatenado;
    }
    
    /**
     * Soma os valores da string carac a carac
     * @param valorConcatenado - valor que será dividido e somado
     * @return soma dos caracs do valor passado
     */
    public int somaValores(String valorConcatenado)
    {
        int resultado = 0;
        char auxChar;
        int auxInt;
        
        // Percorre cada digito do valor
        for (int i = 0; i < valorConcatenado.length(); i++)
        {
           // Pega o digito da posicao i 
           auxChar = valorConcatenado.charAt(i);
           
           // Casteia o digito pra int
           auxInt = Character.getNumericValue(auxChar);
           
           // Soma no resultado
           resultado += auxInt;
        }
        
        // Se o resultado tiver mais de 1 digito, faz o processo novamente com o valor do resultado
        if(resultado > 9)
            return somaValores(String.valueOf(resultado));
        else
            return resultado;
        
    }
    

}
