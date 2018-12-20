let myPos = {
  lat: 0,
  lon: 0,
  mapbox: {
    neighboorhood: '',
    city: '',
    uf: '',
    street: '',
    cep: []
  },
  viacep: {
    neighboorhood: '',
    city: '',
    uf: '',
    street: '',
    cep: []
  }
}
let map, marker, mapboxClient, fullAddr, fullCep

/**
 * Get actual device position.
 */
function getPosition() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      myPos.lat = position.coords.latitude
      myPos.lon = position.coords.longitude
      console.log("Latitude: " + myPos.lat + " | Longitude: " + myPos.lon)
      showPosition()
    })
  } else {
    alert("Geolocation is not supported by this browser.")
  }
}

/**
 * Create the map and show myPos.lat and lon.
 * Add a marker to the map on current position.
 */
function showPosition() {  
  // Setup map box 
  mapboxgl.accessToken = config.MAP_BOX_TOKEN
  mapboxClient = mapboxSdk({ accessToken: config.MAP_BOX_TOKEN })
  
  // Create map
  map = new mapboxgl.Map({
      container: 'map', // container id
      style: config.STYLE, // stylesheet location
      center: [myPos.lon, myPos.lat], // position [lng, lat]
      zoom: config.ZOOM // zoom
  })
  
  // Create marker
  marker = new mapboxgl.Marker({
    draggable: true
  }).setLngLat([myPos.lon, myPos.lat]).addTo(map)
    
  // On drag marker run onDragEnd() function
  marker.on('dragend', onDragEnd) 

  // Get position information
  getPositionInfo()
}

/**
 * Get actual position information with viacep.com.br API.
 */
function getPositionInfo() {
  // Geocode position using lat/lon
  mapboxClient.geocoding.reverseGeocode({
    query: [myPos.lon, myPos.lat]
  }).send()
    .then(function (response) {
      let result = response.body.features[0] 

      // Get position information
      myPos.mapbox.neighboorhood = result.context[0].text
      myPos.mapbox.city = result.context[1].text
      myPos.mapbox.uf = result.context[2].short_code.substring(3, 5)
      myPos.mapbox.street = result.text.replace('Rua ', '')
      console.log(myPos)

      let request = new XMLHttpRequest()
      let viacep = 'https://viacep.com.br/ws/' + myPos.mapbox.uf + '/' + myPos.mapbox.city + '/' + myPos.mapbox.street + '/json/'
      request.open('GET', viacep)
      request.responseType = 'json'

      request.onload = () => {
        let viacepResult = request.response
        console.log(viacepResult)
        
        myPos.viacep.city = viacepResult[0].localidade
        myPos.viacep.neighboorhood = viacepResult[0].bairro
        myPos.viacep.street = viacepResult[0].logradouro
        
        fullAddr = 'Cidade: ' + myPos.viacep.city + ', ' 
                 + 'Bairro: ' + myPos.viacep.neighboorhood
                 + ', ' + myPos.viacep.street
        
        // Pode ter mais de um CEP
        if (viacepResult.length > 1) {
          fullCep = 'CEPs: </br>'
          for (let i = 0; i < viacepResult.length; i++) {
            myPos.viacep.cep.push(viacepResult[i].cep)
            fullCep += viacepResult[i].complemento + ': ' + viacepResult[i].cep + '</br>'
          }
        } else {
          myPos.viacep.cep.push(viacepResult[0].cep)
          fullCep = 'CEP: ' + viacepResult[0].cep
        }
        
        document.getElementById("address").innerHTML = fullAddr
        document.getElementById("cep").innerHTML = fullCep
      }
      request.send()
    })
}

/**
 * On drag marker end, refresh data and map.
 */
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


