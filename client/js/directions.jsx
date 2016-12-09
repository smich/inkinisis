import React from 'react';
import ReactDom from 'react-dom';

const API_KEY = "AIzaSyDWX70SmFG_dc15_K-MbMRAAlurTOjEt3w";

const ATHENS_LAT = 37.9838096;
const ATHENS_LNG = 23.727538800000048;

class Directions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      route: {
        distance: 0
        , duration: 0
      }
    };

    this.pickup = {
      coordinates: {}
      , markers: []
    };
    this.destination = {
      coordinates: {}
      , markers: []
    };

    this.addMarkers = this.addMarkers.bind(this);
    this.drawDirections = this.drawDirections.bind(this);
    this.initDirections = this.initDirections.bind(this);
    this.initPickupControl = this.initPickupControl.bind(this);
    this.initDestinationControl = this.initDestinationControl.bind(this);
  }

  componentDidMount() {
    this.initDirections();
  }

  addMarkers(locControl, locData) {
    var places = locControl.getPlaces();
    if (places.length == 0) {
      return;
    }

    // Clear out the old markers
    locData = this.clearLocationMarkers(locData);

    // For each place, get the icon, name and location

    // LatLngBounds represents a rectangle in geographical coordinates, including one that crosses the 180
    // degrees longitudinal meridian
    var bounds = new google.maps.LatLngBounds();

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
      locData.markers.push(new google.maps.Marker({
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
      locData.coordinates.lat = place.geometry.location.lat();
      locData.coordinates.lng = place.geometry.location.lng();
    });

    // Set the viewport to contain the given bounds
    this.map.fitBounds(bounds);

    return locData;
  }

  drawDirections() {
    // Make sure a pickup location is set
    if (!this.pickupInput.value) {
      this.destinationInput.value = "";
      alert('Please choose a pickup location');
      return;
    }
    var places = this.destinationControl.getPlaces();
    if (!places || places.length == 0) {
      console.log('no destination selected');
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

    }, (response, status) => {
      if (status !== 'OK') {
        alert('Error was: ' + status);
      } else {
        // Update route destination and duration estimations
        this.updateDistanceEstimations(response);

        // Remove all location markers
        this.clearMarkers(true);
      }
    });
  }

  initPickupControl() {
    this.pickupInput.addEventListener('change', (evt) => {
      var pickupLoc = evt.target.value;
      if (!pickupLoc || (pickupLoc && pickupLoc.trim() === "")) {
        // Clear directions
        this.clearDirections();
        // Remove pickup markers
        this.pickup = this.clearLocationMarkers(this.pickup);
        // Add direction markers
        this.destination = this.addMarkers(this.destinationControl, this.destination);
      }
    });

    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    this.pickupControl.addListener('places_changed', () => {
      // Add a marker for the pickup location
      this.pickup = this.addMarkers(this.pickupControl, this.pickup);

      if (this.isLocationSet(this.destination)) {
        this.drawDirections();
      }
    });
  }

  initDestinationControl() {
    this.directionsDisplay.setMap(this.map);

    this.destinationInput.addEventListener('change', (evt) => {
      var destinationLoc = evt.target.value;
      if (!destinationLoc || (destinationLoc && destinationLoc.trim() === "")) {
        // Clear directions
        this.clearDirections();
        // Remove destination markers
        this.destination = this.clearLocationMarkers(this.destination);
        // Add pickup markers
        this.pickup = this.addMarkers(this.pickupControl, this.pickup);
      }
    });

    this.destinationControl.addListener('places_changed', () => {
      // Draw directions
      this.drawDirections();
    });
  }

  setPlace(locationInput, locationControl) {
    var request;
    console.log('in set place');
    console.log(locationInput.value);
    if(locationInput.value) {
      request = {
        query: locationInput.value
      };
      if (locationControl.getBounds()) {
        request.bounds = locationControl.getBounds();
      }
      this.placesService.textSearch(request, places => {
        //set the places-property of the SearchBox
        //places_changed will be triggered automatically
        locationControl.set('places', places || []);
      });
    }
  }

  initDirections() {
    // Initialize the map
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
    this.placesService = new google.maps.places.PlacesService(map);

    // Create the search box and link it to the UI element.
    this.pickupControl = new google.maps.places.SearchBox(this.pickupInput);
    this.destinationControl = new google.maps.places.SearchBox(this.destinationInput);

    // Set pickup and destination to draw the route
    this.pickupInput.value = "Minoos 10, Ilion Greece";
    this.destinationInput.value = "Athens International Airport, Attiki Odos, Spata-Artemida, Greece";
    this.setPlace(this.pickupInput, this.pickupControl);
    this.setPlace(this.destinationInput, this.destinationControl);

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

  showEstimations() {
    return this.state.route.duration || this.state.route.distance;
  }

  updateDistanceEstimations(estimations) {
    var state;
    if (estimations && estimations.rows && estimations.rows.length
      && estimations.rows[0].elements && estimations.rows[0].elements.length
    ) {
      var estimation = estimations.rows[0].elements[0];
      state = {
        route: {
          distance: estimation.distance.text
          , duration: estimation.duration.text
        }
      };
    }
    else {
      state = {
        route: {
          distance: 0
          , duration: 0
        }
      };
    }
    this.setState(state);
  }

  clearLocationMarkers(locData, keepCoordinates=false) {
    if (locData.markers && locData.markers.length) {
      locData.markers.forEach(marker => {
        marker.setMap(null);
      });
    }
    locData.markers = [];

    if (!keepCoordinates) {
      locData.coordinates = {};
    }

    return locData;
  }

  clearMarkers(keepCoordinates=false) {
    this.pickup = this.clearLocationMarkers(this.pickup, keepCoordinates);
    this.destination = this.clearLocationMarkers(this.destination, keepCoordinates);
  }

  clearDirections() {
    this.directionsDisplay.set('directions', null);
  }

  centerMap() {
    this.map.setCenter({
      lat: ATHENS_LAT
      , lng: ATHENS_LNG
    });
    this.map.setZoom(11);
  }

  clearMap() {
    this.pickupInput.value = "";
    this.destinationInput.value = "";
    this.setState({
      route: {
        distance: 0
        , duration: 0
      }
    });
    this.clearDirections();
    this.clearMarkers();
    this.centerMap();
  }

  isLocationSet(locData) {
    return locData && locData.coordinates && locData.coordinates.lat && locData.coordinates.lng;
  }

  onClearPickupLocation() {
    // Clear the direction
    this.clearDirections();
    // Remove the pickup location markers, if any
    this.pickup = this.clearLocationMarkers(this.pickup);
    // Add a destination marker
  }

  render() {
    var estimationsStyle = {display: "none"};
    if (this.showEstimations()) {
      estimationsStyle.display = "block";
    }

    return (
      <div>
        <div className="form" ref={elem => {this.form = elem;}}>
          <div className="form__controls">
            <input ref={input => {this.pickupInput = input}} className="controls" type="text" placeholder="Choose pickup location" />
            <input ref={input => {this.destinationInput = input}} className="controls" type="text" placeholder="Choose your destination" />
            <a href="#" onClick={this.clearMap.bind(this)}>Clear</a>
          </div>
          <div className="form__estimation" style={estimationsStyle}>
            Duration: {this.state.route.duration} <br/>
            Distance: {this.state.route.distance}
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
