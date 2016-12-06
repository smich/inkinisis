import React from 'react';
import ReactDom from 'react-dom';

const API_KEY = "AIzaSyDWX70SmFG_dc15_K-MbMRAAlurTOjEt3w";

function initPickupControl(map, pickupControl) {

  var markers = [];

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  pickupControl.addListener('places_changed', function() {
    var places = pickupControl.getPlaces();
    if (places.length == 0) {
      return;
    }

    // Clear out the old markers
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location

    // LatLngBounds represents a rectangle in geographical coordinates, including one that crosses the 180
    // degrees longitudinal meridian
    var bounds = new google.maps.LatLngBounds();
    console.log('da places');
    console.log(places);

    // place.address_components
    // 5.types[0]['locality']: 5.long_name, e.g Kalivia
    // 2.types[0]['administrative_area_level_5']: 2.long_name e.g Kropia
    // 2.types[0]['administrative_area_level_4']: 2.long_name <- e.g Koropi
    // 3.types[0]['administrative_area_level_3']: 3.long_name <- e.g Anatoliki Attiki
    // 3.types[0]['administrative_area_level_2']: 3.long_name <- e.g Attica
    // 3.types[0]['administrative_area_level_1']: 3.long_name <- e.g Attica
    // 4.types[0]['country']: 5.long_name, 4.short_name, e.g Greece, GR
    // 5.types[0]['postal_code']: 5.long_name, 113 45

    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));
      console.log('location');
      console.log(place.geometry.location.lat(), place.geometry.location.lng());
      // Only geocodes have viewport.
      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport);
      }
      else {
        bounds.extend(place.geometry.location);
      }
    });

    // Set the viewport to contain the given bounds
    map.fitBounds(bounds);

  });
}

function initDestinationControl(map, destinationControl) {

  // Initialize direction services
  var directionsService = new google.maps.DirectionsService
    , directionsDisplay = new google.maps.DirectionsRenderer;

  directionsDisplay.setMap(map);

  destinationControl.addListener('places_changed', function() {
    var places = destinationControl.getPlaces();

    console.log('destination places');
    console.log(places);
    if (places.length == 0) {
      console.log('no destination selected')
      return;
    }

    directionsService.route({
      origin: document.getElementById('pickup-input').value.trim(),
      destination: places[0].formatted_address,
      travelMode: 'DRIVING'
    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });

  });
}

function initDirections() {
  const ATHENS_LAT = 37.9838096;
  const ATHENS_LNG = 23.727538800000048;

  // Initialize the map
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: ATHENS_LAT, lng: ATHENS_LNG
    },
    zoom: 13,
    mapTypeId: 'roadmap'
  });

  // Create the search box and link it to the UI element.
  var pickupInput = document.getElementById('pickup-input')
    , pickupControl = new google.maps.places.SearchBox(pickupInput)
    , destinationInput = document.getElementById('destination-input')
    , destinationControl = new google.maps.places.SearchBox(destinationInput);

  // Add the pickup control on the map
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(pickupInput);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(destinationInput);

  // Bias the SearchBox results towards current map's viewport
  map.addListener('bounds_changed', function() {
    pickupControl.setBounds(map.getBounds());
    destinationControl.setBounds(map.getBounds());
  });

  // Initialize the pickup control
  initPickupControl(map, pickupControl);
  // Initialize the destination control
  initDestinationControl(map, destinationControl);
}

class Directions extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    initDirections();
  }

  render() {
    return (
      <div>
        <label>Search box</label>
        <br/>
        <input id="pickup-input" className="controls" type="text" placeholder="Search Box" />
        <input id="destination-input" className="controls" type="text" placeholder="Pick your destination" />
          <br/>
        <label>Map</label>
            <br/>
        <div id="map"></div>
              <br/>
      </div>
    )
  }
}

if (document.getElementById('directions')) {
  ReactDom.render(<Directions/>, document.getElementById('directions'));
}
