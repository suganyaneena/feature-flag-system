import { useState, useEffect } from "react";
import API from "../api/api";
import { Building2, Mail, Phone, Search } from "lucide-react";
import { toast } from "react-toastify";

export default function CreateOrganization() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_no, setPhoneNo] = useState("");

  const [organizations, setOrganizations] = useState([]);
  const [search, setSearch] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch organizations
  const fetchOrganizations = async () => {
    try {
      const res = await API.get("/organization/list");
      setOrganizations(res.data);
    } catch (error) {
      toast.error("Failed to fetch organizations.");
    }
  };

  // Create organization
  const handleOrganizationCreate = async () => {

      if (!name || !email || !phone_no) {
        alert("Please fill all fields");
        return;
      }

    try {

      await API.post("/organization/create", {
        name,
        email,
        phone_no,
      });

      // Clear fields
      setName("");
      setEmail("");
      setPhoneNo("");

      // Refresh table
      fetchOrganizations();

      toast.success("Organization created successfully");

    } catch (error) {
      toast.error("Organization creation failed. Please try again.");
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  // Search filter
  const filteredOrganizations = organizations.filter((org) =>
    org.name.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentOrganizations =
    filteredOrganizations.slice(
      indexOfFirstItem,
      indexOfLastItem
    );

  const totalPages = Math.ceil(
    filteredOrganizations.length / itemsPerPage
  );

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">

        <div>
          <h1 className="text-4xl font-bold text-gray-800">
            Create Organization
          </h1>

          <p className="text-gray-500 mt-1">
            Manage and create organizations easily
          </p>
        </div>

      </div>

      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

        {/* Create Form */}
        <div className="lg:col-span-1 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">

          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            New Organization
          </h2>

          <div className="space-y-4">

            <div className="relative">
              <Building2
                size={18}
                className="absolute left-4 top-4 text-gray-400"
              />

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Organization Name"
                className="w-full border border-gray-200 pl-11 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-4 top-4 text-gray-400"
              />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Organization Email"
                className="w-full border border-gray-200 pl-11 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="relative">
              <Phone
                size={18}
                className="absolute left-4 top-4 text-gray-400"
              />

              <input
                type="text"
                value={phone_no}
                onChange={(e) => setPhoneNo(e.target.value)}
                placeholder="Phone Number"
                className="w-full border border-gray-200 pl-11 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={handleOrganizationCreate}
              className="w-full bg-blue-600 hover:bg-blue-700 transition-all text-white py-3 rounded-xl font-medium"
            >
              Create Organization
            </button>

          </div>
        </div>

        {/* Stats Card */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-6 text-white shadow-sm">

            <p className="text-lg opacity-80">
              Total Organizations
            </p>

            <h2 className="text-5xl font-bold mt-4">
              {organizations.length}
            </h2>

          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">

            <p className="text-gray-500 text-lg">
              Active Companies
            </p>

            <h2 className="text-5xl font-bold mt-4 text-gray-800">
              {organizations.length}
            </h2>

          </div>

        </div>

      </div>

      {/* Organization Table */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">

        {/* Table Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

          <h2 className="text-2xl font-semibold text-gray-800">
            Organization List
          </h2>

          {/* Search */}
          <div className="relative w-full md:w-[300px]">

            <Search
              size={18}
              className="absolute left-4 top-4 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search organization..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-200 pl-11 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

        </div>

        {/* Table */}
        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>
              <tr className="bg-gray-100 text-gray-700">

                <th className="text-left p-4 rounded-l-2xl">
                  Name
                </th>

                <th className="text-left p-4">
                  Email
                </th>

                <th className="text-left p-4 rounded-r-2xl">
                  Phone
                </th>

              </tr>
            </thead>

            <tbody>

              {currentOrganizations.map((org) => (
                <tr
                  key={org.id}
                  className="border-b hover:bg-gray-50 transition-all"
                >

                  <td className="p-4 font-medium text-gray-800">
                    {org.name}
                  </td>

                  <td className="p-4 text-gray-600">
                    {org.email}
                  </td>

                  <td className="p-4 text-gray-600">
                    {org.phone_no}
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

        {/* Pagination */}
        <div className="flex justify-end gap-3 mt-6">

          {[...Array(totalPages)].map((_, index) => (

            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`w-10 h-10 rounded-xl font-medium transition-all ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {index + 1}
            </button>

          ))}

        </div>

      </div>

    </div>
  );
}