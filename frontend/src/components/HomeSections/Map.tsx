import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Place } from "../../features/trips/types";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

function MapContent({ places }: { places: Place[] }) {
  const marker = L.icon({
    iconUrl: "/icons/pin.svg",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });
  return (
    <MapContainer
      className="h-[calc(100vh-var(--navbar-height))]"
      center={[45.3, 9.0]}
      zoom={8}
      style={{ width: "100%" }}
    >
      <TileLayer
        attribution="Map data © OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {places.map((place, index) => (
        <Marker
          icon={marker}
          key={index}
          position={[parseFloat(place.lat), parseFloat(place.lon)]}
        >
          <Popup>{place.display_name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapContent;
