"use client";

import { useEffect, useState } from "react";
import allCrops, { CropInfo } from "./cropdata";

const Insights = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [error, setError] = useState("");
  const [cropInfo, setCropInfo] = useState<CropInfo | null>(null);
  const [topCrops, setTopCrops] = useState<string[]>([]); // For storing 3 crop names

  const fetchInsights = async () => {
    if (!lat || !lon) {
      setError("Please enter valid latitude and longitude.");
      return;
    }

    setLoading(true);
    setError("");
    setData(null);
    setCropInfo(null);
    setTopCrops([]);

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/get-crop-recommendation?lat=${lat}&lon=${lon}`;
      const top3Url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/get-top-3-crops?lat=${lat}&lon=${lon}`;

      // Fetch main crop recommendation
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("Failed to fetch insights data.");
      const result = await response.json();
      setData(result);

      // Set main crop info
      if (result["Recommended Crop"]) {
        const recommendedCrop = result["Recommended Crop"];
        const cropKey = Object.keys(allCrops).find(
          (key) => key.toLowerCase() === recommendedCrop.toLowerCase()
        );
        if (cropKey) {
          setCropInfo(allCrops[cropKey]);
        }
      }

      // Fetch top 3 crop names
      const top3Response = await fetch(top3Url);
      if (!top3Response.ok) throw new Error("Failed to fetch top 3 crops.");
      const top3Result = await top3Response.json();

      // Extract only crop names
      console.log("Top 3 Crop API response:", top3Result); // 👈 Add this

const suggestions = Array.isArray(top3Result["Additional Crop Suggestions"])
  ? top3Result["Additional Crop Suggestions"]
  : [];

if (suggestions.length === 0) {
  console.warn("No top crop suggestions found.");
}
setTopCrops(suggestions);


    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const renderNDVIMessage = (ndvi: number | null) => {
    if (ndvi === null || isNaN(ndvi)) return null;

    if (ndvi <= 0) {
      return (
        <>
          <p className="text-gray-600 text-sm mt-2">
            The coordinates you entered indicate water or non-vegetated land features.
          </p>
          <p className="text-gray-600 text-sm mt-2 font-semibold">
            (Show soil and weather data but don’t show crop recommendation for this area even if available)
          </p>
        </>
      );
    } else if (ndvi > 0 && ndvi <= 0.3) {
      return (
        <>
          <p className="text-gray-600 text-sm mt-2">
            The coordinates you entered indicate barren land...
          </p>
          {/* Your full message here */}
        </>
      );
    } else if (ndvi > 0.3 && ndvi <= 0.6) {
      return (
        <p className="text-gray-600 text-sm mt-2">
          The coordinates you entered point to a land with some existing vegetation cover!
        </p>
      );
    } else if (ndvi > 0.6 && ndvi <= 0.9) {
      return (
        <p className="text-gray-600 text-sm mt-2">
          The coordinates you entered point to a land with dense vegetation cover!
        </p>
      );
    } else if (ndvi > 0.9) {
      return (
        <p className="text-gray-600 text-sm mt-2">
          The coordinates you entered point to a rainforest-like region.
        </p>
      );
    }

    return null;
  };

  const ndviValue = data?.NDVI ?? null;

  return (
    <section className="w-full px-8 py-12 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-5xl font-semibold mb-6">Agricultural Insights 🌾</h2>

      {/* Input Form */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        <input
          type="number"
          placeholder="Enter Latitude"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full md:w-auto"
        />
        <input
          type="number"
          placeholder="Enter Longitude"
          value={lon}
          onChange={(e) => setLon(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full md:w-auto"
        />
        <button
          onClick={fetchInsights}
          className="bg-green-500 text-white font-medium py-2 px-4 rounded transition-all hover:bg-green-600 active:scale-95"
        >
          Get Insights
        </button>
      </div>

      {loading && <p className="mt-4 text-gray-500">Loading insights...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      {data && (
        <div className="mt-6 bg-white shadow-lg rounded-lg p-6">
          {/* NDVI Section */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-green-600">🌍 NDVI Analysis</h3>
            <p><strong>NDVI Value:</strong> {ndviValue ?? "N/A"}</p>
            {renderNDVIMessage(ndviValue)}
          </div>

          {/* Soil & Weather Data */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-green-600">🧪 Soil & Weather Insights</h3>
            <ul className="space-y-2">
              <li><strong>Soil pH:</strong> {data["Soil pH"] ?? "N/A"}</li>
              <li><strong>Soil Nitrogen:</strong> {data["Soil Nitrogen"] ?? "N/A"}</li>
              <li><strong>Temperature (°C):</strong> {data["Temperature (°C)"] ?? "N/A"}</li>
              <li><strong>Humidity (%):</strong> {data["Humidity (%)"] ?? "N/A"}</li>
              <li><strong>Rainfall (mm):</strong> {data["Rainfall (mm)"] ?? "N/A"}</li>
            </ul>
          </div>

          

          {/* Recommended Crop Section */}
          {ndviValue > 0 && cropInfo && (
            <div className="mt-6 bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-green-600">🌱 Recommended Crop</h3>
              <h2 className="text-2xl font-bold text-center text-green-700 mt-4 mb-2">
                {cropInfo.name}
              </h2>
              <div className="mt-4 flex flex-wrap gap-4 justify-center">
                {cropInfo.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`${cropInfo.name} image ${i + 1}`}
                    className="w-48 h-48 object-cover rounded-lg shadow-md"
                  />
                ))}
              </div>
              <div className="mt-4">
                <h4 className="text-md font-semibold mb-2 text-gray-800">Benefits:</h4>
                <ul className="list-disc ml-6 text-gray-700 text-sm space-y-1">
                  {cropInfo.benefits.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 text-sm text-gray-700 leading-relaxed space-y-2">
                <p><strong>Soil:</strong> {cropInfo.insights.soil}</p>
                <p><strong>pH Range:</strong> {cropInfo.insights.pH}</p>
                <p><strong>Irrigation:</strong> {cropInfo.insights.irrigation}</p>
                <p><strong>Temperature:</strong> {cropInfo.insights.temperature}</p>
                <p><strong>Fertilization:</strong> {cropInfo.insights.fertilization}</p>
                <p><strong>Technology:</strong> {cropInfo.insights.technology}</p>
              </div>
            </div>
          )}
          {/* Top 3 Crops List */}
          {topCrops.length > 0 && (
            <div className="mt-6 bg-gray-100 p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-green-600">🏆 Top 3 Additional Crop Suggestions</h3>
              <ul className="list-disc ml-6 mt-2 text-gray-700">
                {topCrops.map((crop, index) => (
                  <li key={index} className="text-lg">{crop}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default Insights;