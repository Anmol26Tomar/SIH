import React from "react";
import { useParams } from "react-router-dom";
import { AlertCircle, MapPin } from "lucide-react";
import MapView from "../components/MapView";
import type { MarkerData } from "../components/MapView"; // ✅ type-only import
import mpGeoJson from "../data/madhyaPradesh.json";
import tripuraGeoJson from "../data/tripura.json";
import odishaGeoJson from "../data/odisha.json";
import telanganaGeoJson from "../data/telangana.json";

const geoJsonMap: Record<string, any> = {
  "madhya-pradesh": mpGeoJson,
  tripura: tripuraGeoJson,
  odisha: odishaGeoJson,
  telangana: telanganaGeoJson,
};

const stateInfo: Record<string, any> = {
  "madhya-pradesh": {
    name: "Madhya Pradesh",
    capital: "Bhopal",
    coordinates: [23.2599, 77.4126],
    approvedDistricts: [
      { name: "District A", position: [23.5, 77.5], status: "approved" },
      { name: "District B", position: [23.0, 77.0], status: "pending" },
    ],
  },
  tripura: {
    name: "Tripura",
    capital: "Agartala",
    coordinates: [23.8315, 91.2868],
    approvedDistricts: [
      { name: "District X", position: [23.8, 91.2], status: "approved" },
      { name: "District Y", position: [23.9, 91.3], status: "pending" },
    ],
  },
  odisha: {
    name: "Odisha",
    capital: "Bhubaneswar",
    coordinates: [20.2961, 85.8245],
    approvedDistricts: [
      { name: "District M", position: [20.3, 85.8], status: "approved" },
      { name: "District N", position: [20.2, 85.9], status: "rejected" },
    ],
  },
  telangana: {
    name: "Telangana",
    capital: "Hyderabad",
    coordinates: [17.385, 78.4867],
    approvedDistricts: [
      { name: "District P", position: [17.4, 78.5], status: "approved" },
      { name: "District Q", position: [17.3, 78.4], status: "pending" },
    ],
  },
};

const StateDetail: React.FC = () => {
  const { stateId } = useParams<{ stateId: string }>();
  const state = stateInfo[stateId || ""];

  if (!state) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900">State not found</h2>
        </div>
      </div>
    );
  }

  const markers: MarkerData[] = [
    { position: state.coordinates, label: `${state.capital} - Capital`, type: "capital" },
    ...state.approvedDistricts.map((d: any) => ({
      position: d.position,
      label: `${d.name} - ${d.status}`,
      type: d.status,
    })),
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mb-6 flex items-center space-x-3">
        <MapPin className="h-8 w-8 text-green-900" />
        <h1 className="text-3xl font-bold">{state.name}</h1>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Geographical Overview</h2>
        <MapView center={state.coordinates} zoom={7} markers={markers} geoJsonData={geoJsonMap[stateId || ""]} />
      </div>
    </div>
  );
};

export default StateDetail;
