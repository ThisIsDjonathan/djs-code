package dao;

import helper.HibernateUtil;
import java.util.List;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.validation.Valid;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

/**
 * Classe abstrata para efetuar o DAO de qualquer tabela/classe.
 * @author Djonathan
 * @param <T>
 */
public abstract class DAO<T> {

    @Inject
    protected EntityManager entityManager;

    private Class<T> persistedClass;
    private Session session;

    protected DAO() {
        this.session = HibernateUtil.getSession();
    }

    protected DAO(Class<T> persistedClass) {
        this();
        this.session = HibernateUtil.getSession();
        this.persistedClass = persistedClass;
    }
    /**
     * Insere no banco de dados.
     */
    public void insert(@Valid T entity) {
        if (!this.session.isOpen()) {
            this.session = HibernateUtil.getSession();
        }

        Transaction transaction = null;
        try {
            transaction = session.beginTransaction();
            session.save(entity);
            transaction.commit();
        } catch (Exception ex) {
            if (transaction != null) {
                transaction.rollback();
            }
        } finally {
            try {
                if (session != null) {
                    session.close();
                }
            } catch (Exception ex) {
                System.out.println("Erro ao inserir no banco de dados");
            }
        }
    }

    /**
     * Atualiza dado no banco.
     */
    public void update(@Valid T entity) {
        if (!this.session.isOpen()) {
            this.session = HibernateUtil.getSession();
        }
        Transaction transaction = null;
        try {
            transaction = session.beginTransaction();
            session.update(entity);
            transaction.commit();
        } catch (Exception ex) {
            if (transaction != null) {
                transaction.rollback();
            }
        } finally {
            try {
                if (session != null) {
                    session.close();
                }
            } catch (Exception ex) {
                System.out.println("Erro ao fazer update no banco de dados");
            }
        }
    }

    /**
     * Remove registro do bando de dados.
     * @param id id do registro que será removido.
     */
    public void delete(int id) {
        if (!this.session.isOpen()) {
            this.session = HibernateUtil.getSession();
        }
        T entity = getById(id);
        Transaction transaction = null;
        try {
            transaction = session.beginTransaction();
            session.delete(entity);
            transaction.commit();
        } catch (Exception ex) {
            if (transaction != null) {
                transaction.rollback();
            }
        } finally {
            try {
                if (session != null) {
                    session.close();
                }
            } catch (Exception ex) {
                System.out.println("Erro ao remover do banco de dados");
            }
        }
    }

    /**
     * Recupera dado pelo id dele.
     * @param id do dado.
     * @return Objeto da classe que está chamado o método.
     */
    public T getById(int id) {
        if (!this.session.isOpen()) {
            this.session = HibernateUtil.getSession();
        }
        return (T) session.load(persistedClass, id);
    }

    /**
     * Procura todos os dados da tabela.
     * @return List com os dados.
     */
    public List<T> findAll() {
        if (!this.session.isOpen()) {
            this.session = HibernateUtil.getSession();
        }
        Query query = session.createQuery("from " + persistedClass.getName());
        return query.list();
    }
}
