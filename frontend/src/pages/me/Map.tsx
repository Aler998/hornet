import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useEffect } from "react";
import { useGetTripsQuery } from "../../features/trips/tripsApi";
import { Link, useNavigate } from "react-router-dom";
import EmptyLayout from "../../components/Layout/EmptyLayout";

function Map() {
  const { data: trips, isLoading, isError, error } = useGetTripsQuery({});
  const navigate = useNavigate();

  useEffect(() => {
    if (isError && error && typeof error === "object" && "status" in error) {
      const status = (error as { status: number }).status;
      navigate(`/${status}`);
    }
  }, [isError, error, navigate]);

  const marker = L.icon({
    iconUrl: "/icons/pin.svg",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });
  return (
    <EmptyLayout isLoading={isLoading} title="IlMotoDiario - Mappa">
      <Link
        to="/me"
        className="z-[99999] no-underline fixed bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white rounded-full px-5 py-2"
      >
        Indietro
      </Link>
      <MapContainer
        className="h-100svh"
        center={[45.3, 9.0]}
        zoom={8}
        style={{ width: "100%" }}
      >
        <TileLayer
          attribution="Map data © OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {trips?.flatMap((trip) =>
          trip.places?.map((place, index) => (
            <Marker
              icon={marker}
              key={index}
              position={[parseFloat(place.lat), parseFloat(place.lon)]}
            >
              <Popup>{place.display_name}</Popup>
            </Marker>
          ))
        )}
      </MapContainer>
    </EmptyLayout>
  );
}

export default Map;
