import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
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

  return (
    <MapContainer
      className={classes}
      center={[45.4642, 9.19]}
      zoom={13}
      style={{ width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {polylines.map((line, idx) => (
        <Polyline key={idx} positions={line} color="red" />
      ))}
      {wpts.map((wpt, index) => (
        <Marker
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
