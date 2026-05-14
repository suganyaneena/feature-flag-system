
import { useState, useEffect } from "react";
import API from "../api/api";

import MainLayout from "../layouts/MainLayout";
import { Pencil, Trash2, Power, PowerOff } from "lucide-react";
import { toast } from "react-toastify";

export default function Features() {

  const [featureKey, setFeatureKey] = useState("");
  const [status, setStatus] = useState("Enabled");
  const [features, setFeatures] = useState([])
  const [editId, setEditId] = useState(null);

  // Fetch Features
  const fetchFeatures = async () => {
    try {
      const res = await API.get("/feature/list");
      setFeatures(res.data);
      console.log("features", res.data);
    } catch (error) {
      console.error("Failed to fetch features:", error);
    }
  }
  useEffect(() => {
    fetchFeatures();
  }, []);
  
  // Add the Feature
  const handleAdd = async () => 
  {
    if (!featureKey) {
      toast.error("Please fill all fields");
      return;
    }
    try
    {
      const res = await API.post("/feature/create",{
        feature_key: featureKey,
        enabled: status === "Enabled",
      });

      // Clear fields
      setFeatureKey("");
      setStatus("");

      //Reload Feach API
      fetchFeatures();

      // error update
      toast.success("Feature Added successfully.");
    } catch (error) {
      toast.error("Failed to create feature.");
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
       const res = await API.put(`/feature/toggle/${id}`,
        {
          enabled: !currentStatus,
        }
      );
      fetchFeatures();
      toast.success("Feature update successfully.");
    } catch (error) {
      toast.error("Failed to update feature status.");
    }
  };

  const deleteFeature = async (id) => {
    try{
      const res = await API.delete(`/feature/delete/${id}`);
      fetchFeatures();
      toast.success("Feature deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete feature.");
    } 
  };

  const editFeature = async (feature) => {
    // Implement edit functionality here
    console.log("Editing feature with ID:", feature);
    setEditId(feature.id);
    setFeatureKey(feature.feature_key);
    setStatus(
      feature.enabled
        ? "Enabled"
        : "Disabled"
    );
  }

  const handleUpdate = async () => {
    try {

      const res = await API.put(
        `/feature/update/${editId}`,
        {
          feature_key: featureKey,
          enabled: status === "Enabled",
        }
      );

      setFeatureKey("");
      setStatus("Enabled");
      setEditId(null);

      // Reload pages
      fetchFeatures();

      toast.success("Feature updated successfully.");
    } catch (error) {
      
      toast.error("Failed to update feature.");
    }
  };

  return (
       <MainLayout>
      <div className="min-h-screen bg-gray-100 p-8">

        {/* Header */}
        <div className="mb-8">

          <h1 className="text-3xl font-bold text-gray-800">
            Feature Flags
          </h1>

          <p className="text-gray-500 mt-2">
            Manage organization features dynamically
          </p>

        </div>

        {/* Create Feature */}
        <div className="bg-white rounded-2xl shadow-md p-8">

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

            {/* Input */}
            <div className="md:col-span-8">

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Feature Key
              </label>

              <input
                type="text"
                placeholder="Enter feature key"
                value={featureKey}
                onChange={(e) => setFeatureKey(e.target.value)}
                className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:border-blue-500"
              />

            </div>

            {/* Select */}
            <div className="md:col-span-2">

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:border-blue-500"
              >
                <option>Enabled</option>
                <option>Disabled</option>
              </select>

            </div>

            {/* Button */}
            <div className="md:col-span-2 flex items-end">

             <button
            onClick={ 
              editId
              ? handleUpdate
              : handleAdd
            }
            className={`w-full text-white p-3 rounded-xl font-semibold ${
              editId
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {editId ? "Update" : "Add"}

          </button>

            </div>

          </div>

        </div>

        {/* Table */}
        <div className="mt-8 bg-white rounded-2xl shadow-md overflow-hidden">

          <div className="p-5 border-b">

            <h2 className="text-xl font-semibold">
              Feature List
            </h2>

          </div>

          <table className="w-full">

            <thead className="bg-gray-50">

              <tr>
                 <th className="text-left p-4">
                 Sl.No
                </th>

                <th className="text-left p-4">
                  Feature Key
                </th>

                <th className="text-left p-4">
                  Status
                </th>

                <th className="text-left p-4">
                  Action
                </th>
              </tr>

            </thead>

            <tbody>

            {features.length > 0 ? (

              features.map((feature, index) => (
                // console.log(feature.id)
                <tr
                  key={feature.id}
                  className="border-t"
                >

                  {/* Serial Number */}
                  <td className="px-4 py-3">
                    {index + 1}
                  </td>

                  {/* Feature Key */}
                  <td className="p-4">
                    {feature.feature_key}
                  </td>

                  {/* Status */}
                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        feature.enabled
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {feature.enabled
                        ? "Enabled"
                        : "Disabled"}
                    </span>

                  </td>

                  {/* Action */}
                  <td className="p-4">

                    {/* Enable / Disable */}

                    <button
                      onClick={() =>
                        toggleStatus(
                          feature.id,
                          feature.enabled
                        )
                      }
                      className={`p-2 rounded-lg text-white ${
                        feature.enabled
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                    >
                      {feature.enabled ? (
                        <PowerOff size={18} />
                      ) : (
                        <Power size={18} />
                      )}
                    </button>

                    {/* Edit */}
                    <button
                      onClick={() =>
                        editFeature(feature)
                      }
                      className="p-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white"
                    >
                      <Pencil size={18} />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() =>
                        deleteFeature(feature.id)
                      }
                      className="p-2 rounded-lg bg-gray-700 hover:bg-gray-800 text-white"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>

                  

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="3"
                  className="text-center p-6 text-gray-500"
                >
                  No Features Found
                </td>

              </tr>

            )}

          </tbody>

          </table>

        </div>

      </div>
    </MainLayout>
  );
}