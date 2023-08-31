import { loadScript } from "./utils/MapsUtil";
import { useRef, useEffect, useState } from "react";

function GoogleMap() {
  const mapRef = useRef(null);
  var marker = null;
  useEffect(() => {
    loadScript(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCy129A92aYbS6qnodzLjaGFsytmgKiKYk&libraries=places",
      () => {
        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat: 37.3073, lng: -121.8906 },
          zoom: 8,
        });

        map.addListener("click", (e) => {
          var pos = { lat: e.latLng.lat(), lng: e.latLng.lng() };
          addMarker(e.latLng, map);
          console.log(pos);
        });

        // You can add markers or additional map functionality here.
      }
    );
  }, []);

  function addMarker(pos, map) {
    if (marker) {
      marker.setMap(null);
    }
    marker = new google.maps.Marker({
      position: pos,
      map: map,
      title: "Location",
    });
  }

  return <div ref={mapRef} className="w-full h-80" />;
}

export default GoogleMap;
