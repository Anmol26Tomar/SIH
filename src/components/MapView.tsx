import React from "react";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export type MarkerType = "capital" | "approved" | "pending" | "rejected";

export interface MarkerData {
  position: [number, number];
  label: string;
  type: MarkerType;
}

interface MapViewProps {
  center: [number, number];
  zoom?: number;
  markers?: MarkerData[];
  geoJsonData?: any;
}

const iconMap: Record<MarkerType, L.Icon> = {
  capital: new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/252/252025.png",
    iconSize: [25, 25],
  }),
  approved: new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/190/190411.png",
    iconSize: [20, 20],
  }),
  pending: new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/565/565547.png",
    iconSize: [20, 20],
  }),
  rejected: new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/1828/1828665.png",
    iconSize: [20, 20],
  }),
};

const MapView: React.FC<MapViewProps> = ({ center, zoom = 6, markers = [], geoJsonData }) => {
  return (
    <MapContainer center={center} zoom={zoom} style={{ height: "400px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {geoJsonData && <GeoJSON data={geoJsonData} style={{ color: "green", weight: 2 }} />}
      {markers.map((marker, idx) => (
        <Marker key={idx} position={marker.position} icon={iconMap[marker.type]}>
          <Popup>{marker.label}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
