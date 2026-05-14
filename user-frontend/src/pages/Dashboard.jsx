
import { useState, useEffect } from "react";
import { LogOut, User, Mail, Building2, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

import API from "../api/api";

export default function Dashboard() {
  const navigate = useNavigate();

  const [featureKey, setFeatureKey] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const [endUser, setEndUser] = useState({
    name: "",
    email: "",
    organization_name: "",
  });

  useEffect(() => {
    const userData = {
      name: localStorage.getItem("name") || "End User",
      email: localStorage.getItem("email") || "Not available",
      organization_name: localStorage.getItem("organization_name") || "Not available",
    };

    setEndUser(userData);
  }, []);

  const checkFeature = async () => {
    if (!featureKey.trim()) {
      alert("Please enter feature key");
      return;
    }

    try {
      setLoading(true);
      setResult(null);

      const res = await API.post("/user/check", {
        feature_key: featureKey,
        organization_id: localStorage.getItem("organization_id"),
      });

      setResult(res.data.enabled);
    } catch (error) {
      console.error(error);
      alert("Feature check failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("organization_id");
    localStorage.removeItem("name");
    localStorage.removeItem("email");

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navbar */}
      <div className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            End User Dashboard
          </h1>
          <p className="text-sm text-gray-500">
            Check whether a feature is enabled or disabled
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

      <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* End User Details */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-5">
            End User Details
          </h2>

          <div className="space-y-4">
            <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
              <User className="text-blue-600" size={22} />
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-semibold text-gray-800">
                  {endUser.name}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
              <Mail className="text-green-600" size={22} />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-semibold text-gray-800">
                  {endUser.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
              <Building2 className="text-purple-600" size={22} />
              <div>
                <p className="text-sm text-gray-500">Organization Name</p>
                <p className="font-semibold text-gray-800">
                  {endUser.organization_name}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Checker */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Feature Checker
          </h2>

          <p className="text-gray-500 mb-6">
            Enter your feature key to check the current status.
          </p>

          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Enter Feature Key"
              value={featureKey}
              onChange={(e) => setFeatureKey(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={checkFeature}
              disabled={loading}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-6 py-3 rounded-xl"
            >
              <Search size={18} />
              {loading ? "Checking..." : "Check"}
            </button>
          </div>

          {/* Empty State */}
          {result === null && !loading && (
            <div className="mt-8 border border-dashed border-gray-300 rounded-xl p-6 text-center text-gray-500">
              No feature checked yet. Enter a feature key above.
            </div>
          )}

          {/* Result */}
          {result !== null && (
            <div
              className={`mt-8 p-5 rounded-xl text-center text-white font-bold text-lg ${
                result ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {result ? "Feature Enabled ✅" : "Feature Disabled ❌"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}