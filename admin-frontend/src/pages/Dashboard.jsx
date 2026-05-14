
import { useEffect, useState } from "react";
import API from "../api/api";
import MainLayout from "../layouts/MainLayout";

export default function Dashboard() {
  const [features, setFeatures] = useState([]);
  const [featureKey, setFeatureKey] = useState("");
  const [status, setStatus] = useState("Enabled");
  const [editId, setEditId] = useState(null);

  // GET FEATURES
  const fetchFeatures = async () => {
    try {
      const res = await API.get("/feature/list");
      setFeatures(res.data);
    } catch (error) {
      console.log("Fetch feature error:", error);
    }
  };

  useEffect(() => {
    fetchFeatures();
  }, []);

  // ADD FEATURE
  const addFeature = async () => {
    if (!featureKey) {
      alert("Please enter feature key");
      return;
    }

    try {
      await API.post("/feature/create", {
        feature_key: featureKey,
        enabled: status === "Enabled",
      });

      setFeatureKey("");
      setStatus("Enabled");
      fetchFeatures();
    } catch (error) {
      console.log("Add feature error:", error);
    }
  };

  const totalFeatures = features.length;

  const enabledFeatures = features.filter(
    (item) => item.enabled
  ).length;

  const disabledFeatures = features.filter(
    (item) => !item.enabled
  ).length;

  return (
    <MainLayout>
      <div className="space-y-8">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Organization Admin Dashboard
          </h1>

          <p className="text-gray-500 mt-1">
            Manage feature flags for your organization
          </p>
        </div>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500">
              Total Features
            </p>

            <h2 className="text-3xl font-bold">
              {totalFeatures}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500">
              Enabled Features
            </p>

            <h2 className="text-3xl font-bold text-green-600">
              {enabledFeatures}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500">
              Disabled Features
            </p>

            <h2 className="text-3xl font-bold text-red-600">
              {disabledFeatures}
            </h2>
          </div>

        </div>
      </div>
    </MainLayout>
  );
}
