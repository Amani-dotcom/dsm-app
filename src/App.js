
import React from "react";
import ECCHMap from "./components/ECCHMap";
import "./index.css";

function App() {
  return (
    <div className="bg-black min-h-screen p-4">
      <h1 className="text-white text-2xl font-bold mb-4">DSM+SAT Dashboard</h1>
      <ECCHMap />
    </div>
  );
}

export default App;
