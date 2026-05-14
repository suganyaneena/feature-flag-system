import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { toast } from "react-toastify";

export default function Signup() {
    const navigate = useNavigate();
    const [organizations, setOrganizations] = useState([]);
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [formData, setFormData] = useState({
        organization_id: "",
    });

    const fetchOrganizations = async () => {
        try {

            const res = await API.get("/organization/list");

            setOrganizations(res.data);

        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
    fetchOrganizations();
    }, []);

    const handleSignup =
      async () => {
      try {
        const res = await API.post(
          "/admin/signup",
          {
            name,
            email,
            password,
            organization_id: formData.organization_id,
          }
        );

        navigate("/");

        toast.success("SignUp successfully.");

      } catch (err) {
        toast.error("Failed to SignUp the admin.");
      }
    };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-md w-96">

        <h1 className="text-2xl font-bold mb-5">
          Admin Signup
        </h1>

        <input
          type="text"
          placeholder="Name"
          className="w-full border p-3 mb-3 rounded"
          onChange={(e) => {setName(e.target.value)}}
        />

        <input
          type="email"
          onChange={(e) => {setEmail(e.target.value)}}
          placeholder="Email"
          className="w-full border p-3 mb-3 rounded"
        />

        <input
          type="password"
          onChange={(e) => {setPassword(e.target.value)}}
          placeholder="Password"
          className="w-full border p-3 mb-3 rounded"
        />

        <select
            name="organization_id"
            value={formData.organization_id}
            onChange={(e) =>
                setFormData({
                ...formData,
                organization_id: e.target.value,
                })
            }
            className="w-full border p-3 mb-3 rounded"
            >
            <option value="">
                Select Organization
            </option>

            {organizations.map((org) => (
                <option
                key={org.id}
                value={org.id}
                >
                {org.name}
                </option>
            ))}

        </select>

        <button
          onClick={handleSignup}
          className="w-full bg-blue-500 text-white p-3 rounded"
        >
          Signup
        </button>
      </div>
    </div>
  );
}