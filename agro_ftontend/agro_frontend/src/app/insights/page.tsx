"use client";

import { useEffect, useState } from "react";

const Insights = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [error, setError] = useState("");
  const [cropInfo, setCropInfo] = useState<any>(null);

  const fetchInsights = async () => {
    if (!lat || !lon) {
      setError("Please enter valid latitude and longitude.");
      return;
    }

    setLoading(true);
    setError("");
    setData(null);
    setCropInfo(null);

    const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/get-crop-recommendation?lat=${lat}&lon=${lon}`;
    console.log("Fetching from:", apiUrl);

    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error("Failed to fetch insights data.");
      }

      const result = await response.json();
      setData(result);

      if (result["Recommended Crop"]) {
        fetchCropDetails(result["Recommended Crop"]);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCropDetails = async (cropName: string) => {
    try {
      const cropApiUrl = `https://api.pexels.com/v1/search?query=${cropName}&per_page=1`;
      const response = await fetch(cropApiUrl, {
        headers: { Authorization: process.env.NEXT_PUBLIC_PEXELS_API_KEY as string },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch crop image.");
      }

      const data = await response.json();
      const imageUrl = data?.photos?.[0]?.src?.medium || "";

      setCropInfo({ name: cropName, image: imageUrl });
    } catch (err: any) {
      console.error("Error fetching crop details:", err);
    }
  };

  return (
    <section className="w-full px-8 py-12 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-5xl font-semibold mb-6">
        Agricultural Insights 🌾
      </h2>

      {/* Input Fields */}
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
            <h3 className="text-xl font-semibold text-blue-600">🌍 NDVI Analysis</h3>
            <p><strong>NDVI Value:</strong> {data.NDVI ?? "N/A"}</p>
            <p className="text-gray-600 text-sm mt-2">
              The NDVI (Normalized Difference Vegetation Index) measures vegetation health.  
              - Higher values (0.6 - 1.0) indicate lush green crops.  
              - Moderate values (0.2 - 0.6) suggest growing crops.  
              - Low values (0 - 0.2) may indicate dry or barren land.  
              This helps determine if crops are healthy or stressed.
            </p>
          </div>

          {/* Soil & Weather Insights */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-green-600">🧪 Soil & Weather Insights</h3>
            <ul className="space-y-2">
              <li><strong>🧪 Soil pH:</strong> {data["Soil pH"] ?? "N/A"}  
                <span className="text-gray-600 text-sm block">
                  A pH of 6-7 is ideal for most crops. Lower pH (less than 6) means acidic soil,  
                  suitable for crops like coffee & tea. Higher pH (greater than 7) means alkaline soil,  
                  good for barley & mustard.
                </span>
              </li>
              <li><strong>🌾 Soil Nitrogen:</strong> {data["Soil Nitrogen"] ?? "N/A"}  
                <span className="text-gray-600 text-sm block">
                  Higher nitrogen levels boost leafy growth. Too much can delay fruit production.  
                  Low nitrogen may require fertilizers like urea or compost.
                </span>
              </li>
              <li><strong>🌡️ Temperature (°C):</strong> {data["Temperature (°C)"] ?? "N/A"}  
                <span className="text-gray-600 text-sm block">
                  The optimal temperature for crops varies:  
                  - Wheat grows best at 10-25°C  
                  - Rice prefers 20-35°C  
                  - Coffee thrives at 18-22°C
                </span>
              </li>
              <li><strong>💧 Humidity (%):</strong> {data["Humidity (%)"] ?? "N/A"}  
                <span className="text-gray-600 text-sm block">
                  Low humidity (less than 40%) can stress plants, while high humidity (greater than 80%)  
                  can promote fungal diseases.  
                </span>
              </li>
              <li><strong>🌧️ Rainfall (mm):</strong> {data["Rainfall (mm)"] ?? "N/A"}  
                <span className="text-gray-600 text-sm block">
                  Different crops require different rainfall levels. Rice needs 1200-2000mm,  
                  while wheat requires only 300-700mm.
                </span>
              </li>
            </ul>
          </div>

          {/* Crop Recommendation */}
          {cropInfo && (
            <div className="mt-6 bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-red-600">🌱 Recommended Crop</h3>
              <p><strong>Crop:</strong> {cropInfo.name}</p>
              {cropInfo.image && (
                <img src={cropInfo.image} alt={cropInfo.name} className="mt-4 w-full max-w-md rounded-lg shadow-md" />
              )}
              <p className="text-gray-600 text-sm mt-2">
                This crop is best suited for the given soil pH, nitrogen, temperature, humidity,  
                and rainfall conditions.
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default Insights;
