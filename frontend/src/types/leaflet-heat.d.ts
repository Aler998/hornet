import * as L from "leaflet";

declare module "leaflet" {
  function heatLayer(
    latlngs: L.LatLngExpression[],
    options?: { radius?: number; blur?: number; maxZoom?: number }
  ): L.Layer;
}
