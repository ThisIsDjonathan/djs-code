class Graph {
  constructor(isDirected) {
    this.nodes = new Array();
    this.edges = new Array();
    this.isDirected = isDirected;
    this.order = 0;
    this.size = 0;
  }

  /**
  * Add an edge to Graph. Will increase by one the graph size.
  * @param edge - Edge to be added.
  */
  addEdge(edge) {
      //Add this edge to the NodeEdges list
      //edge.getOriginNode().getNodeEdges().push(edge);

      // If itsn't a directed graph, add this edge also to the destination NodeEdges list
      //if(!this.isDirected)
        //edge.getDestNode().getNodeEdges().push(edge);

      // Add it to list
      this.edges.push(edge);

      // Increase graph size
      this.size++;
  }

  /**
   * Add a node to Graph. This will increase by one the graph order.
   * @param node - Node to be added.
   */
  addNode(node)
  {
      this.nodes.push(node);
      this.order++;
  }



}
