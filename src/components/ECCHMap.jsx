
import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function ECCHMap() {
  useEffect(() => {
    const map = L.map("map", {
      zoomControl: false,
      attributionControl: false
    }).setView([25.3217, 51.4244], 15);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    fetch("/data/ecch_buildings.geojson")
      .then((res) => res.json())
      .then((data) => {
        L.geoJSON(data, {
          style: (feature) => ({
            color:
              feature.properties.cluster === "Always-On"
                ? "#ff4d4d"
                : feature.properties.cluster === "Weekend Saver"
                ? "#33cc33"
                : "#3399ff",
            weight: 1.5,
            fillOpacity: 0.6,
          }),
          onEachFeature: (feature, layer) => {
            layer.bindPopup(
              `<div style='font-family:Arial, sans-serif; font-size:13px;'>
                <strong>${feature.properties.name}</strong><br/>
                Cluster: ${feature.properties.cluster}<br/>
                CO₂ Saved: ${feature.properties.co2_saved} kg<br/>
                Energy Used: ${feature.properties.energy_kwh} kWh
              </div>`
            );
          },
        }).addTo(map);
      });
  }, []);

  return (
    <div className="w-full h-[80vh] bg-black rounded-2xl shadow-lg p-2">
      <h2 className="text-white text-xl font-semibold mb-2">📍 ECCH Energy Map</h2>
      <div
        id="map"
        className="rounded-xl"
        style={{ height: "100%", width: "100%", minHeight: "500px" }}
      ></div>
    </div>
  );
}
