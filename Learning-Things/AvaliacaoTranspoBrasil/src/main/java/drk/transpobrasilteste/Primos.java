package drk.transpobrasilteste;

import controller.ItemController;
import controller.LancamentoController;
import java.util.ArrayList;
import java.util.List;
import model.Item;
import model.Lancamento;

/**
 *
 * @author Djonathan
 */
public class Primos {

    public static void main(String[] args) {
        printPrimos();
    }

    /**
     * 9. Criar uma classe na camada de Controle chamada Primos, contendo o
     * método main que imprima todos os números primos entre 41 e 5002.
     */
    private static void printPrimos() {
        for (int i = 41; i <= 5002; i++) {
            boolean isPrimo = true;
            for (int j = 2; j <= i; j++) {
                if (((i % j) == 0) && (j != i)) {
                    isPrimo = false;
                    break;
                }
            }

            if (isPrimo) {
                System.out.println(i);
            }
        }

    }

  

}
