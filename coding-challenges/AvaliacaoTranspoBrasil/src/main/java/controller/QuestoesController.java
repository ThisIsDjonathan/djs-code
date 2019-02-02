package controller;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.ManagedBean;
import javax.enterprise.context.SessionScoped;
import javax.inject.Named;
import model.Item;
import model.Lancamento;

/**
 *
 * @author Djonathan
 */
@ManagedBean("questoesController")
@Named("questoesController")
@SessionScoped
public class QuestoesController implements Serializable {

    private List<Lancamento> items;
    private int intervalo1valor1, intervalo1valor2, intervalo2valor1, intervalo2valor2;
    private String retornoIntersecao;

    /**
     * 10. Fazer uma consulta para somar o total dos lançamentos, cujo a média
     * dos itens foi maior ou igual à R$ 100,00.
     *
     * @return uma List de Lancamentos onde a média dos itens for maior ou igual 100
     */
    public List<Lancamento> getLancamentosAcimaDaMedia() {
        List<Lancamento> lancamentos = new ArrayList();
        LancamentoController lancamentoCtrl = new LancamentoController();
        double somaValor = 0;
        int qtdItens = 0;

        // Percorre todos os lançamentos
        for (Lancamento lancamento : lancamentoCtrl.getItems()) {
            // Percorre todos os itens dos lançamentos e soma os valores dele
            for (Item i : lancamento.getItens()) {
                somaValor += i.getValor();
                qtdItens += 1;
            }

            // Se a média de itens do lançamento for maior ou igual a media desejada add ela na lista e printa obs
            if (somaValor / qtdItens >= 100) {
                lancamentos.add(lancamento);
            }
        }
        
        this.items = lancamentos;
        return lancamentos;
    }

    /**
     * 11. Fazer uma consulta para trazer os 10 lançamentos que possuam o maior
     * valor de itens e tenham a descrição começando com a letra A. Sendo que só
     * devem mostrar lançamentos no qual o somatório desses itens sejam maiores
     * que R$ 50,00.
     *
     * @return
     */
    public List<Lancamento> getMaioresLancamentos() {
        List<Lancamento> lancamentos = new ArrayList();
        LancamentoController lancamentoCtrl = new LancamentoController();

        // Percorre todos os lançamentos
        for (Lancamento lancamento : lancamentoCtrl.getItems()) {
            // Se começar com A
            if (lancamento.getObservacao().toUpperCase().charAt(0) == 'A') {
                // Se o valor total for maior que 50
                if (lancamento.getVl_total() > 50) {
                    // Add o lançamento na lista
                    lancamentos.add(lancamento);
                }
            }
        }
        
        this.items = lancamentos;
        return lancamentos;

    }

    /**
     * Verifica se existe interseção entre intervalos.
     * @return true se houver interseção.
     */
    public boolean verIntersecao() {
        // Validação de inputs
        if (intervalo1valor1 >= intervalo1valor2) {
            retornoIntersecao = "O segundo valor tem que ser maior do que o primeiro";
            return false;
        } else if (intervalo2valor1 >= intervalo2valor2) {
            retornoIntersecao = "O segundo valor tem que ser maior do que o primeiro";
            return false;
        }
        
        // Variáveis auxiliares
        int cont = 0;
        boolean temIntersecao = false;        

        // Cria vetores
        int vetA[] = new int[intervalo1valor2 - intervalo1valor1 + 1];
        int vetB[] = new int[intervalo2valor2 - intervalo2valor1 + 1];
        
        // Monta os vetores A e B com o intervalo entre os valores informados
        for(int i = intervalo1valor1; i <= intervalo1valor2; i++) {
            vetA[cont] = i;
            cont++;
        }
        
        cont = 0;
        for(int i = intervalo2valor1; i <= intervalo2valor2; i++) {
            vetB[cont] = i;
            cont++;
        }
        
        // Pra cada valor do vetor A
        for (int i = 0; i < vetA.length; i++) {
            // Pra cada valro do vetor B
            for (int j = 0; j < vetB.length; j++) {
                // Se houver um valor onde A == B, tem interseção!
                if (vetA[i] == vetB[j]) {
                    temIntersecao = true;
                    break;
                }
            }
        }
        
        // Atualiza a mensagem de retorno para mostrar na tela
        if(temIntersecao) {
            retornoIntersecao = "Existe interseção entre a faixa 1 [" + intervalo1valor1 + " - " + intervalo1valor2 + "] e faixa 2 [" +
                    intervalo2valor1 + " - " + intervalo2valor2 + "]";
            return true;
        } else {
            retornoIntersecao = "Não existe interseção entre a faixa 1 [" + intervalo1valor1 + " - " + intervalo1valor2 + "] e faixa 2 [" +
                    intervalo2valor1 + " - " + intervalo2valor2 + "]";
            return false;
        }
    }

    
    // Gets e sets
    public int getIntervalo1valor1() {
        return intervalo1valor1;
    }

    public void setIntervalo1valor1(int intervalo1valor1) {
        this.intervalo1valor1 = intervalo1valor1;
    }

    public int getIntervalo1valor2() {
        return intervalo1valor2;
    }

    public void setIntervalo1valor2(int intervalo1valor2) {
        this.intervalo1valor2 = intervalo1valor2;
    }

    public int getIntervalo2valor1() {
        return intervalo2valor1;
    }

    public void setIntervalo2valor1(int intervalo2valor1) {
        this.intervalo2valor1 = intervalo2valor1;
    }

    public int getIntervalo2valor2() {
        return intervalo2valor2;
    }

    public void setIntervalo2valor2(int intervalo2valor2) {
        this.intervalo2valor2 = intervalo2valor2;
    }

    public String getRetornoIntersecao() {
        return retornoIntersecao;
    }

    public void setRetornoIntersecao(String retornoIntersecao) {
        this.retornoIntersecao = retornoIntersecao;
    }
}
