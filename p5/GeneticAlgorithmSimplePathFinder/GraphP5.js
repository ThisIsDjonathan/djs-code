var graph;

function setup() {
  createCanvas(800,600);

  // Create undirected graph
  graph = new Graph(false);

  // Create nodes (cities)
  indaial = new Node("Indaial", 150, 300);
  graph.addNode(indaial);

  blumenau = new Node("Blumenau", 277, 99);
  graph.addNode(blumenau);

  florianopolis = new Node("Florianopolis", 469, 398);
  graph.addNode(florianopolis);

  // Create edges
  edge1 = new Edge("Indaial-Blumenau", indaial, blumenau);
  edge2 = new Edge("Indaial-Blumenau", indaial, florianopolis);
  edge3 = new Edge("Blumenau-Florianopolis", blumenau, florianopolis);

  // Add edges to graph
  graph.addEdge(edge1);
  graph.addEdge(edge2);
  graph.addEdge(edge3);


  /*função AlgoritmoGenético(população, função-objetivo) saídas: indivíduo
  entradas: população→ uma lista de indivíduos
            função-objetivo→ uma função que recebe um indivíduo e retorna um número real.
  repetir
     lista de pais := seleção(população, função-objetivo)
     população := reprodução(lista de pais)
  enquanto nenhuma condição de parada for atingida
  retorna o melhor indivíduo da população de acordo com a função-objetivo*/

}


/**
 * Generate initial population. It will be a list of possibilites routes.
 */
function generateInitialPopulation() {
  // Population size will be the number of nodes (cities) on graph
  var popSize = graph.order;

  // Get N chromosomes
  for (var i = 0; i < popSize; i++) {
    // Generate random sequence of genes to this chromosome of population
    var gene = randPerm(popSize);

    // Add chromosome to population list
    population.push(new Chromosome(gene));
  } 
  
}


function draw() {
  background(206, 231, 232);
  strokeWeight(1);

  // Draw nodes iterating for each node object on graph
  for(var n = 0; n < graph.order; n++) {
    // Set actual node to make easy access values
    actualNode = graph.nodes[n];

    // Draw elipse on node X and Y with it radius
    ellipse(actualNode.x, actualNode.y, actualNode.diameter, actualNode.diameter);

    // Draw node description inside it
    textSize(20);
    fill(25, actualNode.color.g / 2, actualNode.color.b / 2);
    text(actualNode.description, actualNode.x, actualNode.y);

    // Fill with it color
    fill(actualNode.color.r,actualNode.color.g, actualNode.color.b, actualNode.color.a);
  }

  // Draw edges iterating for each edge object on graph
  for(var e = 0; e < graph.size; e++) {
    // Set origin and dest node of actual edge
    var origin = graph.edges[e].originNode;
    var dest = graph.edges[e].destNode;

    // Draw a line between XY of origin and dest nodes
    line(origin.x + origin.radius, origin.y, dest.x, dest.y - origin.radius);
  }
}


/**
 * Get a random permutation of a range similar to randperm in Matlab/Octave 
 */ 
function randPerm(maxValue) {
  // Get numbers from 1 to maxValue
  var values = new Array();
  for(var i = 0; i < maxValue; i++) {
    values[i] = i;
  }

  // Shuffle it to be random
  for (var i = values.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = values[i];
    values[i] = values[j];
    values[j] = temp;
  }
  
  return values;
}