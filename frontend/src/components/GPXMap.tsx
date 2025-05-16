import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { gpx } from "@tmcw/togeojson";
import {
  Feature,
  FeatureCollection,
  GeoJsonProperties,
  Geometry,
} from "geojson";
import { Point as GeoPoint } from "geojson";
import { useEffect } from "react";

const FitBounds = ({ bounds }: { bounds: L.LatLngBounds }) => {
  const map = useMap();

  useEffect(() => {
    map.fitBounds(bounds, { padding: [20, 20] });
  }, [map, bounds]);

  return null;
};

const extractTrackInfo = (xml: Document) => {
  const track = xml.querySelector("trk");
  const gpduration = track?.querySelector("gpduration")?.textContent || "N/A";
  const gpmovingtime =
    track?.querySelector("gpmovingtime")?.textContent || "N/A";
  const gpdistance = track?.querySelector("gpdistance")?.textContent || "N/A";

  return { gpduration, gpmovingtime, gpdistance };
};

const GPXMap = ({
  serverData,
  classes,
}: {
  serverData: string;
  classes?: string;
}) => {
  const parser = new DOMParser();
  const xml = parser.parseFromString(serverData, "application/xml");
  const geojson = gpx(xml);
  const { gpduration, gpmovingtime, gpdistance } = extractTrackInfo(xml);

  const marker = L.icon({
    iconUrl: "/icons/marker.svg",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });

  const extractPolylineCoords = (
    geojson: FeatureCollection<Geometry, GeoJsonProperties>,
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const coords: any[] = [];
    geojson.features.forEach((feature) => {
      if (feature.geometry.type === "LineString") {
        coords.push(
          feature.geometry.coordinates.map(([lon, lat]) => [lat, lon]),
        );
      }
    });
    return coords;
  };

  const polylines = extractPolylineCoords(geojson);

  const wpts: Feature<GeoPoint, GeoJsonProperties>[] = geojson.features.filter(
    (feature): feature is Feature<GeoPoint, GeoJsonProperties> =>
      feature.geometry !== null && feature.geometry.type === "Point",
  );

  // Calcola tutti i punti delle linee e waypoint
  const allCoords: [number, number][] = [
    ...polylines.flat(),
    ...wpts.map((wpt) => [
      wpt.geometry.coordinates[1],
      wpt.geometry.coordinates[0],
    ]),
  ];

  // Crea i bounds usando LatLngBounds
  const bounds =
    allCoords.length > 0
      ? L.latLngBounds(allCoords)
      : L.latLngBounds([
          [45.4642, 9.19],
          [45.4642, 9.19],
        ]);

  return (
    <MapContainer
      className={classes}
      // center={[45.4642, 9.19]}
      zoom={13}
      style={{ width: "100%" }}
    >
      <TileLayer
        crossOrigin="anonymous"
        attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitBounds bounds={bounds} />
      {polylines.map((line, idx) => (
        <Polyline key={idx} positions={line} color="red">
          <Popup>
            <strong>Distanza totale:</strong> {gpdistance} km
            <br />
            <strong>Durata:</strong> {gpduration} sec
            <br />
            <strong>Tempo di movimento:</strong> {gpmovingtime} sec
          </Popup>
        </Polyline>
      ))}
      {wpts.map((wpt, index) => (
        <Marker
          icon={marker}
          key={index}
          position={[wpt.geometry.coordinates[1], wpt.geometry.coordinates[0]]}
        >
          <Popup>
            <strong>{wpt.properties?.name || "Waypoint"}</strong>
            {wpt.properties?.desc && <p>{wpt.properties?.desc}</p>}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default GPXMap;
