package helper;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;
import org.hibernate.service.ServiceRegistry;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Cria e retorna sessions.
 * @author Djonathan
 */
public class HibernateUtil {

    @Autowired
    private static SessionFactory sessionFactory;
    private static Session session;

    public static Session getSession() {
        try {
            // Create the SessionFactory from standard (hibernate.cfg.xml) config file.
            sessionFactory = createSessionFactory();
            session = sessionFactory.openSession();
        } catch (Throwable ex) {
            // Log the exception. 
            System.err.println("Initial SessionFactory creation failed." + ex);
            throw new ExceptionInInitializerError(ex);
        }
        return session;
    }

    public static SessionFactory createSessionFactory() {
        Configuration configuration = new Configuration();
        configuration.configure();
        ServiceRegistry serviceRegistry = new StandardServiceRegistryBuilder().applySettings(configuration.getProperties()).build();
        sessionFactory = configuration.buildSessionFactory(serviceRegistry);
        return sessionFactory;
    }
}
