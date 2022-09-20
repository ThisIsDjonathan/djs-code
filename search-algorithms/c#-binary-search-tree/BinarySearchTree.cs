public class BinarySearchTree 
{
    Node? Root;

    public BinarySearchTree() 
    {
        Console.WriteLine("Starting binary search tree...");
    }

    public void Insert(Node nodeToInsert)
    {
        if (this.Root == null)
        {
            this.Root = nodeToInsert;
            return;
        }
        
        Node parentNode = this.GetBestParentNodeToInsertNewOne(nodeToInsert);

        if (nodeToInsert.Value < parentNode.Value)
            parentNode.LeftNode = nodeToInsert;
        else
            parentNode.RightNode = nodeToInsert;
    }

    private Node GetBestParentNodeToInsertNewOne(Node nodeToInsert) 
    {
        Node previousNode = null;
        Node nextNode = this.Root;
 
        while (nextNode != null)
        {
            previousNode = nextNode;
            
            // left?
            if (nodeToInsert.Value < nextNode.Value) 
                nextNode = nextNode.LeftNode;
            // right? 
            else if (nodeToInsert.Value > nextNode.Value) 
                nextNode = nextNode.RightNode;
            else
            {
                if (this.Root != null )
                    throw new Exception("Same value already exists in the tree");
            }    
        }

        return previousNode;
    }

    public Node Find(int valueToFind) 
    {
        return this.Find(valueToFind, this.Root);
    }

    private Node Find(int valueToFind, Node parent)
    {
        if (parent != null)
        {
            if (valueToFind == parent.Value) 
                return parent;
            if (valueToFind < parent.Value)
                return Find(valueToFind, parent.LeftNode);
            else
                return Find(valueToFind, parent.RightNode);
        }
 
        return new Node(null);
    }

    public void Print()
    {
        this.Root.Print("", this.Root, false);
    }

} 