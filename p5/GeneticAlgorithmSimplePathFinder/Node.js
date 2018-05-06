class Node {
  constructor(description, x, y, id) {
    this.id = id;
    this.status = "";
    this.description = description;
    this.adjacentNodes = new Array();
    this.nodeEdges = new Array();
    this.x = x;
    this.y = y;

    this.radius = GLOBAL_NODE_RADIUS;
    this.diameter = this.radius * 2;

    this.color = {
      'r' : random(1, 255),
      'g' : random(1, 255),
      'b' : random(1, 255),
      'a' : random(1, 255)
    };

  }
}
