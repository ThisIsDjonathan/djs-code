console.log("Starting...")

let myPos = {}, map, marker

let config = {
  MAP_BOX_TOKEN: 'pk.eyJ1Ijoib2Rqb25hdGhhbmtyYXVzZSIsImEiOiJjampvdndzOGcwNTN1M3ZwMHlnMHY0MWppIn0.hzoLpCR-_bD-5gQxF3-1ag',
  STYLE: 'mapbox://styles/mapbox/streets-v9',
  ZOOM: 15
}

function showPosition() {
  mapboxgl.accessToken = config.MAP_BOX_TOKEN
  
  map = new mapboxgl.Map({
      container: 'map', // container id
      style: config.STYLE, // stylesheet location
      center: [myPos.lon, myPos.lat], // starting position [lng, lat]
      zoom: config.ZOOM // starting zoom
  })
  
  marker = new mapboxgl.Marker({
    draggable: true
  }).setLngLat([myPos.lon, myPos.lat])
    .addTo(map)
    
  marker.on('dragend', onDragEnd) 

  getPositionInfo()
}

function getPositionInfo() {
  var mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken })
  mapboxClient.geocoding.reverseGeocode({
    query: [myPos.lon, myPos.lat]
  }).send()
    .then(function (response) {
      let result = response.body.features[0] 
      console.log(result)

      myPos.neighboorhood = result.context[0].text
      myPos.city = result.context[1].text
      myPos.uf = result.context[2].short_code.substring(3, 5)
      myPos.street = result.text.replace('Rua ', '')
      console.log(myPos)


      let request = new XMLHttpRequest();
      let viacep = 'https://viacep.com.br/ws/' + myPos.uf + '/' + myPos.city + '/' + myPos.street + '/json/'
      request.open('GET', viacep)
      request.responseType = 'json'

      request.onload = () => {
        let viacepResult = request.response
        console.log(viacepResult)
      }
      request.send()
    })
}

function onDragEnd() {
  let lngLat = marker.getLngLat()
  myPos.lon = lngLat.lng
  myPos.lat = lngLat.lat

  map.flyTo({
    center: [myPos.lon, myPos.lat]
  })

  getPositionInfo()
  console.log("Latitude: " + myPos.lat + " | Longitude: " + myPos.lon)
}


function getPosition() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      myPos.lat = position.coords.latitude
      myPos.lon = position.coords.longitude
      console.log("Latitude: " + myPos.lat + " | Longitude: " + myPos.lon)
      showPosition()
    })
  } else {
    console.log("Geolocation is not supported by this browser.")
  }
}
