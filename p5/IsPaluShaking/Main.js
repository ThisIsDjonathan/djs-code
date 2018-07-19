/**
 * Japan's earthquakes visualisation by Djonathan Krause 2018/2. 
 * Based on Dan Shiffman's tutorial at The Coding Train https://youtu.be/ZiYdOwOrGyc
 * 
 * Run with a Python3 server: 
 * cd to project's folder and python -m http.server
 */
 
// Params
let MAPBOX_TOKEN = 'pk.eyJ1Ijoib2Rqb25hdGhhbmtyYXVzZSIsImEiOiJjampvdndzOGcwNTN1M3ZwMHlnMHY0MWppIn0.hzoLpCR-_bD-5gQxF3-1ag'
let MAP_BASE = 'https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/'
let EARTHQUAKES_DATA_JSON = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&latitude=35.359384&longitude=136.612750&maxradiuskm=300&minmagnitude=0'
let WIDTH = 800
let HEIGHT = 600
let zoom = 5
let scl = 10

// Globals 
let center
let earthquakes = []
let earthquakesRaw

let ogaki = {
  lat: 35.359384,
  lon: 136.612750,
  pos: {}
}

let Earthquake = function (lat, lon, pos, mag) {
  this.lat = lat
  this.lon = lon
  this.pos = pos
  this.mag = mag
}

/**
 * Load map image and earthquakes from APIs.
 */
function preload () {
  // Load map image from mapbox.com API
  mapimg = loadImage(MAP_BASE + ogaki.lon + ',' + ogaki.lat + ',' + zoom + '/' + WIDTH + 'x' + HEIGHT + '?access_token=' + MAPBOX_TOKEN)

  // Load json with earthquake data from USGS Earthquake Hazards Program API
  let request = new XMLHttpRequest()
  request.open('GET', EARTHQUAKES_DATA_JSON)
  request.responseType = 'json'

  request.onload = () => {
    earthquakesRaw = request.response.features
    transformData(earthquakesRaw)
  }

  request.send()
}

/**
 * Setup function create canvas and set map imagen translanting it to center.
 * Also calculate ogaki cartesian's position and draw an ellipse in this position.
 */
function setup () {
  // Create canvas and draw map
  createCanvas(WIDTH, HEIGHT)
  background(0)
  translate(width / 2, height / 2)
  imageMode(CENTER)
  image(mapimg, 0, 0)

  // Calculate x y of Ogaki
  center = calcMercator({lat: ogaki.lat, lon: ogaki.lon})
  ogaki.pos = calcMercator({lat: ogaki.lat, lon: ogaki.lon})

  // Draw ellipse on ogaki's position
  noStroke()
  fill(255, 0, 199, 100)
  ellipse(ogaki.pos.x - center.x, ogaki.pos.y - center.y, 20, 20)

  // Draw area
  fill(210, 212, 216, 10)
  ellipse(ogaki.pos.x - center.x, ogaki.pos.y - center.y, 500, 500)

  // Draw earthquakes
  drawEarthquakes()
}

/**
 * This function draw earthquakes based on data on earthquakes array.
 */
function drawEarthquakes () {
  if (earthquakes.length > 0) {
    for (earthquake of earthquakes) {
      // Scale magnitude to draw a proportional ellipse with some magical math
      let magnitude = pow(10, earthquake.mag)
      magnitude = sqrt(magnitude)
      let magmax = sqrt(pow(10, 10))
      let d = map(magnitude, 0, magmax, 0, 180) * scl;

      if(d > 3) {
        fill(244, 66, 66, 200);
      } else {
        fill(92, 147, 249, 200);
      }

      // Draw ellipse on earthquake position
      noStroke();
      ellipse(earthquake.pos.x - center.x, earthquake.pos.y - center.y, d, d);
    }
  }
}

/**
 * This transform raw data (earthquake.usgs.gov json) to a Earthquake object and add it to earthquakes array.
 * Set earthquake's lat, lon, pos (cartesian) and magnitude.
 * @param {earthquake.usgs.gov json} raw 
 */
function transformData (raw) {
  for (earthquake of raw) {
    // Create a new Earthquake object
    let e = new Earthquake(earthquake.geometry.coordinates[1],
      earthquake.geometry.coordinates[0],
      null,
      earthquake.properties.mag)

    // Mercator projection of earthquake's coords
    e.pos = calcMercator({lat: e.lat, lon: e.lon})

    // Add it to earthquakes array
    earthquakes.push(e)
  }
}

/**
 * Transform coordinate position to cartesian's with web mercator: https://en.wikipedia.org/wiki/Web_Mercator
 * @param {lat, lon object} coord 
 * @return p5 vector with xy position
 */
function calcMercator (coord) {
  let x = ((256 / PI) * pow(2, zoom)) * (radians(coord.lon) + PI)

  let a = ((256 / PI) * pow(2, zoom))
  let b = tan(PI / 4 + radians(coord.lat) / 2);   
  let c = PI - log(b);
  let y = a * c;

  let pos = createVector(x, y)
  return pos
}
