const numOfCities = 4;
const startFromIndex = 1;
const popSize = 10; 

var cities = [];
var population = [];
var routeHistory = new Array();

var bestRoute;
var bestDistance;

function setup() {
    createCanvas(800, 600);

    // Create n cities
    for(var i = 0; i < numOfCities; i++) {
        // Create a Vector object to represent the city
        var city = { 'index' : i
                   , 'name'  : "cityName"
                   , 'position' : createVector(random(width), random(height))
            };
        
        // Add this city (vector) to cities list
        cities[i] = city;
    }

    for(var i = 0; i < popSize; i++) {
        population[i] = 
    }


    // Calculate distance between cities and set it as better to start
    var distance = getDistance(cities); 
    bestRoute = cities.slice();
    bestDistance = distance;
    routeHistory.push(cities.position);
}

function draw() {
    background(0);
    var text1 = "With " + numOfCities + " cities the number of possible routes it's " + factorial(numOfCities) + "."
              + " Calculated routes " + routeHistory.length + "\n\n"
              + "Best distance until now it's " + Math.round(bestDistance) + ".";
    noStroke();
    fill(255);
    text(text1, 10, 10, 120, 300);
    
    // Draw an ellipse for each city on cities list and link it with edges
    beginShape();
    for(var i = 0; i < numOfCities; i++) {
        
        if(cities[i].index == startFromIndex) {
            fill(100); 
        } else {
            fill(255);
        }
        noStroke();
        ellipse(cities[i].position.x, cities[i].position.y, 20, 20);
    
        stroke(255);
        strokeWeight(1);
        noFill();
        vertex(cities[i].position.x, cities[i].position.y);
    }    
    endShape();

    // Get two cities to swap positions (get index of it on cities list)
    var i = floor(random(numOfCities));
    var j = floor(random(numOfCities));
    swap(cities, i, j);

    // Get distance between all points with actual sort of cities
    var distance = getDistance(cities);

    // If actual distance it's the better, make a copy of this route to bestRoute and set this as bestDistance
    if(distance < bestDistance) {
        bestRoute = cities.slice();
        bestDistance = distance;
        //console.log(distance);
    }

    // Add this route to history. History has not duplicate routes.
    routeHistory = cities.filter(function(city, pos) {
        return cities.indexOf(city) == pos;
    });

    // Highlight best route to see it better on canvas
    stroke(25, 145, 145);
    strokeWeight(5);
    noFill();
    beginShape();
    for (var i = 0; i < numOfCities; i++) {
        vertex(bestRoute[i].position.x, bestRoute[i].position.y);
    }
    endShape();
}


/**
 * This will swap city1 by city2 position on list.
 * @param c - list of cities.
 * @param i - index of city1.
 * @param j - index of city2.
 */
function swap(cities, i, j) {
    var temp = cities[i];
    cities[i] = cities[j];
    cities[j] = temp;
}

/**
 * Calculates euclidean distance using pythagoras theorem.
 * Distance = square of (x1 - x2)^2 + (y1 - y2)^2. 
 * p5 dist() function help us to do this calc. 
 * @param cities - array where points are.
 * @return totalDist - sum of distances between all points (all cities).
 */
function getDistance(cities) {
    totalDist = 0;
    
    for(var i = 0; i < numOfCities - 1; i++) {
        totalDist += dist(cities[i].position.x, cities[i].position.y, cities[i + 1].position.x, cities[i + 1].position.y);
    }

    return totalDist;
}


/**
 * Calculate factorial value of @param number.
 */
function factorial(num) {
    if (num === 0) { 
        return 1; 
    }
    else { 
        return num * factorial(num - 1); 
    }
}

/**
 * Get index of each city on cities list.
 * @param cities - list of cities.
 * @return indexes - Array of cities indexes.
 */
function getIndexes(cities) {
    indexes = new Array();
    for(var i = 0; i < numOfCities; i++) {
        indexes.push(cities[i].index);
    }
    
    return indexes;
}
