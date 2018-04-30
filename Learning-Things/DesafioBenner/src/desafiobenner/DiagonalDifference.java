package desafiobenner;

import java.util.Scanner;

/**
 *
 * @author Djonathan
 */
public class DiagonalDifference
{

    public void diagonalDifference()
    {
        // Input da matriz
        Scanner matriz = new Scanner(System.in);

        // Verifica o tamanho matriz, primeiro valor do input
        int tamanhoMatriz = Integer.parseInt(matriz.nextLine());

        // Declara as diagonais
        int diagonal01 = 0, diagonal02 = 0;
        int x;

        // Percorre matriz
        for (int i = 0; i < tamanhoMatriz; i++)
        {
            // Separa por linha
            String[] linha = matriz.nextLine().split(" ");

            // Soma valor da posição atual na diagonal 01 (faz um cast de String pra int)
            diagonal01 += Integer.parseInt(linha[i]);

            // Soma valor X na diagonal 02
            // X é o valor da posição do comprimento da linha - 1 (pra pegar o índice do valor que começa em 0) - i que é a linha
            x = linha.length - 1 - i;
            diagonal02 += Integer.parseInt(linha[x]);
        }

        // Depois de percorrer a matriz e somar as diagonais, calcula a diferença entre elas
        // System.out.println((diagonal01 - diagonal02) * -1);
        // Usa o math.abs pra trazer o valor absoluto por causa dos valores negativos
        System.out.println(Math.abs(diagonal01 - diagonal02));
    }
}
