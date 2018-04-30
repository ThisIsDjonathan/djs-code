package desafiobenner;

import java.util.Scanner;

/**
 *
 * @author Djonathan
 */
public class PlusMinus
{

    public void plusMinus()
    {
        // Pega input
        Scanner input = new Scanner(System.in);
        
        // Tamanho input
        int tamanhoInput = input.nextInt();
        
        // Variaveis aux
        double qtdNegativos = 0.0, qtdPositivos = 0.0, qtdZeros = 0.0;
        
        // Declara array de valores
        int valores[] = new int[tamanhoInput];
        
        // Monta array
        for (int i = 0; i < tamanhoInput; i++)
        {
            valores[i] = input.nextInt();
            
            // Verifica se o valor é maior, menor ou igual a zero
            if(valores[i] < 0)
                qtdNegativos++;
            else if(valores[i] == 0)
                qtdZeros++;
            else
                qtdPositivos++;
        }

        // Calcula valores
        double a, b, c;
        a = qtdPositivos / tamanhoInput;
        b = qtdNegativos/tamanhoInput;
        c = qtdZeros/tamanhoInput;

        // Prita como decimal
        System.out.printf("%.6f\n%.6f\n%.6f",a,b,c);

    }
}
