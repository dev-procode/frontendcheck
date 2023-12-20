import React, { useState, useEffect } from "react";
import { Map, GoogleApiWrapper, DirectionsRenderer } from "google-maps-react";

const MapContainer = ({ google }) => {
  const [directions, setDirections] = useState(null);

  useEffect(() => {
    const directionsService = new google.maps.DirectionsService();

    const origin = "45.63"; // Replace with the starting place
    const destination = "52.5"; // Replace with the destination place

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: "DRIVING", // You can change this for other travel modes like 'WALKING', 'BICYCLING', or 'TRANSIT'
      },
      (result, status) => {
        if (status === "OK") {
          setDirections(result);
        } else {
          console.error("Error fetching directions:", result);
        }
      }
    );
  }, [google]);

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <Map
        google={google}
        zoom={14}
        initialCenter={{
          lat: 40.7128, // Replace with the latitude of the map's initial center
          lng: -74.006, // Replace with the longitude of the map's initial center
        }}
      >
        {directions && <DirectionsRenderer directions={directions} />}
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyCgSs1fHR2ewGs6Isom3kLkyt9MirGbOdU", // Replace with your Google Maps API key
})(MapContainer);
