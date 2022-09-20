public class Node 
{
    public bool IsRoot { get; set; } = false;

    public int Depth { get; set; } = 0;
    public int? Value { get; set; }
    public Node RightNode { get; set; }
    public Node LeftNode { get; set; }
    
    public Node(int? value)
    {
        this.Value = value;
    }

    public void Print() 
    {
        Console.WriteLine(this.Value);
    }

    public void Print(string prefix, Node node, bool isLeft) 
    {
        if (node != null) 
        {
            string arrow = "";
            if(isLeft)
                arrow = "|-- L:";
            else 
                arrow = "\\-- R:";

            Console.WriteLine(prefix + arrow + "(" + node.Value + ")");

            this.Print(prefix + (isLeft ? "|   " : "    "), node.LeftNode, true);
            this.Print(prefix + (isLeft ? "|   " : "    "), node.RightNode, false);
        }
    }
}

