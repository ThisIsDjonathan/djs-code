var graph;
var positions = [];
var dragging = false;
var foundPos = false;

function setup() {
  createCanvas(800,600);

  // Create out undirected graph
  graph = new Graph(false);

  // Create nodes
  position = getRandPosition();
  node1 = new Node("N1", position.x, position.y);
  graph.addNode(node1);

  position = getRandPosition();
  node2 = new Node("N2", position.x, position.y);
  graph.addNode(node2);

  position = getRandPosition();
  node3 = new Node("N3", position.x, position.y);
  graph.addNode(node3);

  // Create edges
  edge1 = new Edge("N1-N2", node1, node2);
  edge2 = new Edge("N1-N3", node1, node3);

  // Add edges to graph
  graph.addEdge(edge1);
  graph.addEdge(edge2);
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

function mouseReleased() {
  dragging = false;
}


/**
 * When mouse click and drag on a node, move it with to mouse position
 */
function mouseDragged() {
  // Verify if click position colide with some node
  for(var i = 0; i < graph.order; i++) {
    actualNode = graph.nodes[i];

    // Calculate distance to check colision
    var distance = dist(actualNode.x, actualNode.y, mouseX, mouseY)

    // If click colide with node, update node position to mouse position
    if(distance < actualNode.radius) {
      if(!colideAnotherNode(actualNode)) {
        dragging = true;
        actualNode.x = mouseX;
        actualNode.y = mouseY;
      }
    }
  }

  // prevent default
  return false;
}

function colideAnotherNode(actualNode) {
  for(var i = 0; i < graph.order; i++) {
    //debugger;
    if(graph.nodes[i] !== actualNode) {
      if(dist(graph.nodes[i].x, graph.nodes[i].y, actualNode.x, actualNode.y) < GLOBAL_NODE_RADIUS * 2) {
        console.log("Colide with " + graph.nodes[i].description);
        return true;
      }
    }
  }

  return false;
}

/**
 * Found a  position that is not in use for any node avoiding colision.
 */
function getRandPosition() {
  // Get and random XY
  var xy = {"x" : random(0 + GLOBAL_NODE_RADIUS, width - GLOBAL_NODE_RADIUS),
            "y" : random(0 + GLOBAL_NODE_RADIUS, height - GLOBAL_NODE_RADIUS)
          };

  // While dont found a position that is not in use, loop
  while(!foundPos) {
    xy = {"x" : random(0 + GLOBAL_NODE_RADIUS, width - GLOBAL_NODE_RADIUS),
          "y" : random(0 + GLOBAL_NODE_RADIUS, height - GLOBAL_NODE_RADIUS)
      };

    // For each position already used
    for(var i = 0; i < positions.length; i++) {
      // Calculate distance to check colision
      var distance = dist(positions[i].x, positions[i].y, xy.x, xy.y);

      // If colide, find new position
      if(distance < GLOBAL_NODE_RADIUS * 2) {
        foundPos = false;
      }
    }

    // If position do not colide with any other, it can be used
    foundPos = true;
  }

  // Add this position to array and return
  positions.push(xy);
  return xy;
}
