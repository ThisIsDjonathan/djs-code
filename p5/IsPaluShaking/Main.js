// https://earthquake.usgs.gov/earthquakes/feed/v1.0/csv.php

let MAPBOX_TOKEN = "pk.eyJ1Ijoib2Rqb25hdGhhbmtyYXVzZSIsImEiOiJjampvdndzOGcwNTN1M3ZwMHlnMHY0MWppIn0.hzoLpCR-_bD-5gQxF3-1ag"; 
let MAP_BASE = "https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/";
let WIDTH = 800;
let HEIGHT = 600;
let zoom = 1;
let scl = 10;

let earthquakes;
let center;

let ogaki = {
    coord: {
      lat: 35.359384,
      lon: 136.612750
    }
  };
              

function preload() {  
  mapimg = loadImage(MAP_BASE + 0 + ',' + 0 + ',' + zoom + '/' 
                   + WIDTH + 'x' + HEIGHT + '?access_token=' + MAPBOX_TOKEN);
  //earthquakes = loadStrings("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.csv");
  earthquakes = loadStrings("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.csv");
}


function setup() {
  createCanvas(WIDTH, HEIGHT);
  background(0);
  translate(width / 2, height / 2);
  imageMode(CENTER);
  image(mapimg, 0, 0);
  
  center = calcMercator({lat: 0, lon: 0});
  let pos = calcMercator(ogaki.coord);

  noStroke();
  fill(255, 0, 199, 100);
  ellipse(pos.x - center.x, pos.y - center.y, 20, 20);

  sclSlider = createSlider(10, 100, 1);

  drawEarthquakes();
}

function draw() {
  if(sclSlider.value() != scl) {
    scl = sclSlider.value();
    drawEarthquakes();
  }
}


function drawEarthquakes() {
  // Load data from usgs earthquake API
  for (let i = 1; i < earthquakes.length; i++) {
    // Split screen on comma
    let data = earthquakes[i].split(/,/);
    
    // Get earthquake's coordinates and magnitude
    let earthquake = {coord: {lat: data[1],
                              lon: data[2] 
                            },
                      mag: data[4]
                    };
    
    // Mercator projection of earthquake's coords
    let pos = calcMercator(earthquake.coord);

    // Scale magnitude to draw a proportional ellipse
    let magnitude = pow(10, earthquake.mag);
    magnitude = sqrt(magnitude);
    let magmax = sqrt(pow(10, 10));
    let d = map(magnitude, 0, magmax, 0, 180) * scl;

    // Draw ellipse on earthquake position
    noStroke();
    fill(92, 147, 249, 200);
    ellipse(pos.x - center.x, pos.y - center.y, d, d);
  }
}


/**
 * https://en.wikipedia.org/wiki/Web_Mercator
 * @param {*} coord 
 */
function calcMercator(coord) {
  let x = ((256 / PI) * pow(2, zoom)) * (radians(coord.lon) + PI);
  
  let a = ((256 / PI) * pow(2, zoom));
  let b = tan(PI / 4 + radians(coord.lat) / 2);
  let c = PI - log(b);
  let y = a * c;

  let pos = createVector(x, y);
  return pos;
}
