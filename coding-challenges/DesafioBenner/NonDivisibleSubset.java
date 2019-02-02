package desafiobenner;

import java.util.Scanner;

/**
 *
 * @author Djonathan
 */
public class NonDivisibleSubset
{

    public void nonDivisibleSubset()
    {
        Scanner input = new Scanner(System.in);
        
        // Seta n e k
        int n = input.nextInt();
        int k = input.nextInt();

        
        int[] restante = new int[k];
        
        // Verifica quantos valores n são divisíveis por k
        for (int i = 0; i < n; i++)
        {
            int valor = input.nextInt();
            restante[valor % k]++;
        }

        // O restulado é o tamanho do array
        int resultado = restante.length;
        
        System.out.println(resultado);
    }
}
