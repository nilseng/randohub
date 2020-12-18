import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1Ijoibmlsc2VuZyIsImEiOiJja2lyYmZoNnoyNHRoMnlxam42M2FhYTRzIn0.bNB_zGEjaXfrs-4cfz6V6w";

const Map = () => {
  const [mapState] = useState({
    lng: 8.739,
    lat: 61.448,
    zoom: 12,
  });

  const mapEl = useRef();

  useEffect(() => {
    if (mapEl) {
      new mapboxgl.Map({
        container: mapEl.current,
        style: "mapbox://styles/nilseng/ckiuk1uf02ykx19szgx4psp19",
        center: [mapState.lng, mapState.lat],
        zoom: mapState.zoom,
      });
    }
  }, [mapEl, mapState]);

  return (
    <div
      ref={mapEl}
      id="map"
      className="vw-100"
      style={{
        position: "relative",
        height: "calc(100vh - 58px)",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
      }}
    ></div>
  );
};

export default Map;
