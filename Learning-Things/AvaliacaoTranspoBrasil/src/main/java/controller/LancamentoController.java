/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controller;

import dao.LancamentoDAO;
import model.Item;

import java.io.Serializable;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import javax.annotation.ManagedBean;
import javax.inject.Named;
import javax.enterprise.context.SessionScoped;
import model.Lancamento;

/**
 *
 * @author Djonathan
 */
@ManagedBean("lancamentoController")
@Named("lancamentoController")
@SessionScoped
public class LancamentoController implements Serializable {

    private LancamentoDAO dao;
    private Lancamento selected;
    private List<Lancamento> items;
    private String dtIni, dtFim, retornoLancamento;

    public LancamentoController() {
        dao = new LancamentoDAO();
        selected = new Lancamento();
        items = (List<Lancamento>) dao.findAll();
    }

    /**
     * Insere novo lancaçemento.
     */
    public void insert() {
        // Faz a conversão das datas
        Date dateIni = null, dateFim = null;
        SimpleDateFormat fmtIni = new SimpleDateFormat("dd/MM/yyyy");
        SimpleDateFormat fmtFim = new SimpleDateFormat("dd-MM-yyyy");
        try {
            dateIni = fmtIni.parse(dtIni);
            dateFim = fmtFim.parse(dtFim);
        } catch (ParseException e) {
            retornoLancamento = "Erro ao converter datas";
            System.out.println("Erro ao converter a data " + e.getMessage());
        }

        // Seta as datas convertidas 
        selected.setDt_inicial(dateIni);
        selected.setDt_final(dateFim);

        // Insere no banco
        dao.insert(selected);
    }

    /**
     * Remove lançamento do banco.
     *
     * @param item que será removido
     */
    public void delete(Lancamento item) {
        dao.delete(item.getOid());
        items.remove(item);
    }

    /**
     * Associa item a lançamento que está sendo criado.
     *
     * @param item que será associado.
     */
    public void addItem(Item item) {
        // Add o item na lista de itens do lançamento
        if (!selected.getItens().contains(item)) {
            selected.getItens().add(item);

            // Atualiza o valor total do lançamento
            float valorTotal = selected.getVl_total() + item.getValor();
            selected.setVl_total(valorTotal);
            retornoLancamento = "";
        } else {
            retornoLancamento = "Item já adicionado!";
        }

    }

    public void update(Lancamento item) {
        dao.update(item);
    }

    // gets e sets
    public Lancamento getSelected() {
        return selected;
    }

    public void setSelected(Lancamento selected) {
        this.selected = selected;
    }

    public List<Lancamento> getItems() {
        if (items == null) {
            return dao.findAll();
        }
        return items;
    }

    public String getDtIni() {
        return dtIni;
    }

    public void setDtIni(String dtIni) {
        this.dtIni = dtIni;
    }

    public String getDtFim() {
        return dtFim;
    }

    public void setDtFim(String dtFim) {
        this.dtFim = dtFim;
    }

    public String getRetornoLancamento() {
        return retornoLancamento;
    }

    public void setRetornoLancamento(String retornoLancamento) {
        this.retornoLancamento = retornoLancamento;
    }

}
