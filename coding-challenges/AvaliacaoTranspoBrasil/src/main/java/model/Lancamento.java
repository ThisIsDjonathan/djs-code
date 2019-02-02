package model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 *
 * @author Djonathan
 */
@Entity
@Table(name = "Lancamento")
public class Lancamento implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int oid;

    @Column
    @Temporal(TemporalType.DATE)
    private Date dt_inicial;

    @Column
    @Temporal(TemporalType.DATE)
    private Date dt_final;

    @Column
    private float vl_total;

    @Column
    private String observacao;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "lancamentoitem",
            joinColumns = {
                @JoinColumn(name = "oid_lancamento")},
            inverseJoinColumns = {
                @JoinColumn(name = "oid_item")})
    private List<Item> itens = new ArrayList<Item>();

    public Lancamento() {
        super();
    }

    public int getOid() {
        return oid;
    }

    public void setOid(int oid) {
        this.oid = oid;
    }

    public Date getDt_inicial() {
        return dt_inicial;
    }

    public void setDt_inicial(Date dt_inicial) {
        this.dt_inicial = dt_inicial;
    }

    public Date getDt_final() {
        return dt_final;
    }

    public void setDt_final(Date dt_final) {
        this.dt_final = dt_final;
    }

    public float getVl_total() {
        return vl_total;
    }

    public void setVl_total(float vl_total) {
        this.vl_total = vl_total;
    }

    public String getObservacao() {
        return observacao;
    }

    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }

    public List<Item> getItens() {
        return itens;
    }

    public void setItens(List<Item> itens) {
        this.itens = itens;
    }

}
