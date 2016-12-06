import React from 'react';
import ReactDom from 'react-dom';

const API_KEY = "AIzaSyDWX70SmFG_dc15_K-MbMRAAlurTOjEt3w";

class Directions extends React.Component {
  constructor(props) {
    super(props);

    this.pickup = {
      coordinates: {}
    };
    this.destination = {
      coordinates: {}
    };

    this.initDirections = this.initDirections.bind(this);
    this.initPickupControl = this.initPickupControl.bind(this);
    this.initDestinationControl = this.initDestinationControl.bind(this);
  }

  componentDidMount() {
    this.initDirections();
  }

  initPickupControl() {
    var markers = [];

    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    this.pickupControl.addListener('places_changed', () => {
      var places = this.pickupControl.getPlaces();
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

      places.forEach(place => {
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
          map: this.map,
          icon: icon,
          title: place.name,
          position: place.geometry.location
        }));
        // Only geocodes have viewport.
        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        }
        else {
          bounds.extend(place.geometry.location);
        }

        // Save coordinates
        this.pickup.coordinates.lat = place.geometry.location.lat();
        this.pickup.coordinates.lng = place.geometry.location.lng();
      });

      // Set the viewport to contain the given bounds
      this.map.fitBounds(bounds);

    });
  }

  initDestinationControl() {

    this.directionsDisplay.setMap(this.map);

    this.destinationControl.addListener('places_changed', () => {
      var places = this.destinationControl.getPlaces();

      console.log('destination places');
      console.log(places);
      if (places.length == 0) {
        console.log('no destination selected')
        return;
      }

      this.directionsService.route({
          origin: this.pickupInput.value.trim(),
          destination: places[0].formatted_address,
          travelMode: 'DRIVING'
        }, (response, status) => {
          if (status === 'OK') {
            this.directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });

      // Save coordinates
      this.destination.coordinates.lat = places[0].geometry.location.lat();
      this.destination.coordinates.lng = places[0].geometry.location.lng();

      var service = this.distanceMatrix;
      service.getDistanceMatrix({
        origins: [this.pickup.coordinates],
        destinations: [this.destination.coordinates],
        travelMode: 'DRIVING',
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false,
        drivingOptions: {
          departureTime: new Date(Date.now() + 10000),
          trafficModel: 'optimistic'
        }

      }, function(response, status) {
        if (status !== 'OK') {
          alert('Error was: ' + status);
        } else {
          var originList = response.originAddresses
            , destinationList = response.destinationAddresses;

          console.log('distance ::: ');
          console.log(response);
        }
      });
    });
  }

  initDirections() {
    const ATHENS_LAT = 37.9838096;
    const ATHENS_LNG = 23.727538800000048;

    // Initialize the mapMinoos 10, Ilion
    var map = new google.maps.Map(this.mapEl, {
      center: {
        lat: ATHENS_LAT, lng: ATHENS_LNG
      },
      zoom: 11,
      mapTypeId: 'roadmap',
      mapTypeControl: false,
      streetViewControl: false
    });

    // Initialize direction services
    this.directionsService = new google.maps.DirectionsService;
    this.directionsDisplay = new google.maps.DirectionsRenderer;
    this.distanceMatrix = new google.maps.DistanceMatrixService;

    // Create the search box and link it to the UI element.
    this.pickupControl = new google.maps.places.SearchBox(this.pickupInput);
    this.destinationControl = new google.maps.places.SearchBox(this.destinationInput);

    this.pickupInput.value = "Minoos 10, Ilion Greece";
    this.destinationInput.value = "Athens International Airport, Attiki Odos, Spata-Artemida, Greece";

    var placesService = new google.maps.places.PlacesService(map);
    var request;
    if(this.pickupInput.value) {
      request = {
        query: this.pickupInput.value
      }
      if (this.pickupControl.getBounds()) {
        request.bounds = this.pickupControl.getBounds();
      }
      placesService.textSearch(request, places => {
        //set the places-property of the SearchBox
        //places_changed will be triggered automatically
        this.pickupControl.set('places', places || []);
      });
    }

    var destRequest;
    if(this.destinationInput.value) {
      destRequest = {
        query: this.destinationInput.value
      }
      if (this.destinationControl.getBounds()) {
        destRequest.bounds = this.destinationControl.getBounds();
      }
      placesService.textSearch(destRequest, places => {
        //set the places-property of the SearchBox
        //places_changed will be triggered automatically
        this.destinationControl.set('places', places || []);
      });
    }

    // Add the form on the map
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(this.form);

    // Bias the SearchBox results towards current map's viewport
    map.addListener('bounds_changed', () => {
      this.pickupControl.setBounds(map.getBounds());
      this.destinationControl.setBounds(map.getBounds());
    });
    this.map = map;

    // Initialize the pickup control
    this.initPickupControl();
    // Initialize the destination control
    this.initDestinationControl();
  }

  render() {
    return (
      <div>
        <div className="form" ref={elem => {this.form = elem;}}>
          <div className="form__controls">
            <input ref={input => {this.pickupInput = input}} className="controls" type="text" placeholder="Choose pickup location" />
            <input ref={input => {this.destinationInput = input}} className="controls" type="text" placeholder="Choose your destination" />
          </div>
          <div className="form__estimation">
            Duration: {} <br/>
            Distance: {}
          </div>
        </div>
        <div id="map" ref={elem => {this.mapEl = elem}}></div>
      </div>
    )
  }
}

if (document.getElementById('directions')) {
  ReactDom.render(<Directions/>, document.getElementById('directions'));
}
