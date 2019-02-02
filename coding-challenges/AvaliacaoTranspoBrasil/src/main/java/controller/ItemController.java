package controller;

import dao.ItemDAO;
import model.Item;

import java.io.Serializable;
import java.util.List;
import javax.annotation.ManagedBean;
import javax.inject.Named;
import javax.enterprise.context.SessionScoped;

@ManagedBean("itemController")
@Named("itemController")
@SessionScoped
public class ItemController implements Serializable {

    private ItemDAO dao;
    private Item selected;
    private List<Item> items;

    public ItemController() {
        dao = new ItemDAO();
        selected = new Item();
        items = (List<Item>) dao.findAll();
    }
    
    public void insert() {
        dao.insert(selected);
    }

    public void delete(Item item) {
        dao.delete(item.getOid());
        items.remove(item);
    }
    
    public void update(Item i) {
        dao.update(i);
    }

    public Item getSelected() {
        return selected;
    }

    public void setSelected(Item selected) {
        this.selected = selected;
    }

    public List<Item> getItems() {
        return dao.findAll();
    }

    
    

}
